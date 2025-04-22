const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');
const csv = require('csv-parse/sync');
require('dotenv').config();

// Initialize Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY; // Use service role key for admin operations

if (!supabaseUrl) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL is not set in your .env file');
  process.exit(1);
}

if (!supabaseKey) {
  console.error('Error: SUPABASE_SERVICE_ROLE_KEY is not set in your .env file');
  process.exit(1);
}

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseKey ? '***' : 'not set');

const supabase = createClient(supabaseUrl, supabaseKey);

// Function to chunk array into smaller pieces
function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

async function fetchAndUploadCsv() {
  try {
    // Fetch CSV data with streaming
    console.log('Fetching CSV data...');
    const response = await axios.get("https://paristourist.info/feeds/viator-product-feed.csv", {
      responseType: 'text',
      // Add timeout and max size settings
      timeout: 30000, // 30 seconds
      maxContentLength: 50 * 1024 * 1024 // 50MB limit
    });
    const csvString = response.data;

    // Parse CSV data
    console.log('Parsing CSV data...');
    const records = csv.parse(csvString, {
      columns: true,
      skip_empty_lines: true,
      relax_quotes: true,
      relax_column_count: true,
      trim: true,
      skip_records_with_error: true
    });

    console.log(`Parsed ${records.length} total records`);

    // Filter records containing "paris" and clean the data
    console.log('Filtering and cleaning records...');
    const cleanedRecords = records
      .filter(record => {
        const name = (record["Name"] || "").toLowerCase();
        const description = (record["Description"] || "").toLowerCase();
        return name.includes("paris") || description.includes("paris");
      })
      .map(record => ({
        ...record,
        "Price": parseFloat(record["Price"]) || 0,
        "Retail Price": parseFloat(record["Retail Price"]) || 0,
        "commission": parseFloat(record["commission"]) || 0
      }));

    console.log(`Found ${cleanedRecords.length} records containing "paris"`);
    
    if (cleanedRecords.length === 0) {
      console.log('No records containing "paris" found. Exiting...');
      return;
    }

    // Process in chunks of 1000 records
    const chunks = chunkArray(cleanedRecords, 1000);
    console.log(`Split data into ${chunks.length} chunks for processing`);

    let totalUploaded = 0;
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      console.log(`Processing chunk ${i + 1}/${chunks.length} (${chunk.length} records)...`);

      const { data, error } = await supabase
        .from('parisTours')
        .upsert(chunk, {
          onConflict: 'Id',
          ignoreDuplicates: false
        });

      if (error) {
        console.error(`Error in chunk ${i + 1}:`, error);
        throw error;
      }

      totalUploaded += chunk.length;
      console.log(`Progress: ${totalUploaded}/${cleanedRecords.length} records uploaded`);
    }

    console.log(`Successfully uploaded all ${totalUploaded} Paris-related records`);
    return totalUploaded;

  } catch (error) {
    console.error('Detailed error:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code
    });
    throw error;
  }
}

// Execute the function
fetchAndUploadCsv().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});
