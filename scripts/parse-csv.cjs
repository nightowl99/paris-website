const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
require('dotenv').config();

// Initialize Supabase client
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function fetchAndProcessData() {
  try {
    console.log('Starting data processing...');
    
    // Read local CSV file
    const csvData = fs.readFileSync('./scripts/viator-feed.csv', 'utf8');
    
    // Parse CSV data
    const rows = csvData.split('\n').map(row => {
      // Handle cases where fields might contain commas within quotes
      const values = row.match(/("([^"]*)"|[^,]+)(?=\s*,|\s*$)/g) || [];
      const cleanValues = values.map(val => val.replace(/^"|"$/g, '').trim());

      return {
        id: cleanValues[0],
        name: cleanValues[1],
        afflink: cleanValues[2],
        thumbnail: cleanValues[3],
        image: cleanValues[4],
        price: parseFloat((cleanValues[5] || 0).replace('$', '').replace(',', '')) || 0,
        description: cleanValues[6],
        category: cleanValues[7],
        product_code: cleanValues[9]
      };
    });

    // Remove header row and filter out any invalid rows
    const records = rows.slice(1).filter(row => row.id && row.name);

    console.log(`Found ${records.length} valid records`);
    console.log(records);
    return;

    // Process in chunks of 1000 records
    const chunkSize = 1000;
    for (let i = 0; i < records.length; i += chunkSize) {
      const chunk = records.slice(i, i + chunkSize);
      
      const { error: upsertError } = await supabase
        .from('paris_tours')
        .upsert(chunk, {
          onConflict: 'id',
          ignoreDuplicates: false
        });

      if (upsertError) {
        console.error('Error uploading chunk:', upsertError);
        throw upsertError;
      }

      console.log(`Processed ${i + chunk.length} of ${records.length} records`);
    }

    console.log('Data processing completed successfully');
    return true;

  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Execute the function
fetchAndProcessData().catch(error => {
  console.error('Unhandled error:', error);
  process.exit(1);
});