const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

async function createTourCategories() {
  try {
    // 1. Fetch all tours to get categories
    const { data: tours, error: fetchError } = await supabase
      .from('new_tours')
      .select('category');

    if (fetchError) {
      throw fetchError;
    }

    // 2. Extract unique categories
    const uniqueCategories = [...new Set(tours
      .map(tour => tour.category)
      .filter(category => category) // Remove null/undefined values
    )];

    console.log('Found unique categories:', uniqueCategories);

    // 3. Insert categories into the table
    const categoriesData = uniqueCategories.map((name, index) => ({
      id: index + 1,
      name: name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      created_at: new Date().toISOString()
    }));

    const { error: insertError } = await supabase
      .from('tour_categories')
      .upsert(categoriesData);

    if (insertError) {
      throw insertError;
    }

    console.log('Successfully populated tour_categories table');
    console.log('Inserted categories:', categoriesData);

  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run the script
createTourCategories().catch(console.error);
