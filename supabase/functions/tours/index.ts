import { Client } from 'npm:basic-ftp@5.0.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const client = new Client();
  client.ftp.verbose = true;

  try {
    console.log('Attempting FTP connection...');
    
    // Test connection first
    await client.access({
      host: "ftp.domesticsurplus.com",
      user: "feeds@paristourist.info",
      password: "f2UUJfevF_cGo",
      port: 21,
      secure: false, // Try without FTPS first
    });

    console.log('FTP connection successful');
    console.log('Current directory:', await client.pwd());
    
    // List directory contents to verify file existence
    const files = await client.list();
    console.log('Directory contents:', files);

    // Create a buffer to store the CSV data
    let csvData = '';
    const decoder = new TextDecoder('utf-8');

    console.log('Attempting to download viator-product-feed.csv...');
    
    await client.downloadTo(
      new WritableStream({
        write(chunk) {
          csvData += decoder.decode(chunk);
        }
      }),
      "viator-product-feed.csv"
    );

    console.log('CSV file downloaded successfully');
    console.log('CSV data length:', csvData.length);

    // Verify we have data before processing
    if (!csvData || csvData.length === 0) {
      throw new Error('No CSV data received from FTP server');
    }

    // Replace YOURUSERID with 268663
    csvData = csvData.replace(/YOURUSERID/g, '268663');

    return new Response(csvData, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/csv',
      },
    });
  } catch (error) {
    console.error('Error in tours function:', {
      message: error.message,
      stack: error.stack,
      type: error.name,
    });
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to fetch tour data',
        details: error.message,
        type: error.name,
        timestamp: new Date().toISOString()
      }), 
      { 
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } finally {
    // Always close the FTP connection
    try {
      await client.close();
      console.log('FTP connection closed successfully');
    } catch (closeError) {
      console.error('Error closing FTP connection:', closeError);
    }
  }
});