import { createClient } from '@supabase/supabase-js';
import { TourType } from '../types';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Function to fetch and parse the CSV data
export type PaginatedTours = {
  tours: TourType[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

// Function to fetch tours with pagination
export const fetchTours = async (): Promise<PaginatedTours> => {
  try {
    console.log('Fetching tours from Supabase');
    const { data: tours, error } = await supabase
      .from('new_tours')
      .select('*')
      .limit(100);

    console.log('Raw tours:', tours);

    if (error) {
      throw error;
    }

    const formattedTours: TourType[] = tours
      .filter((item) => item.id && item.name)
      .map((item) => ({
        id: item.id,
        name: item.name,
        affLink: item.affLink || '',
        thumbnail: item.thumbnail || '',
        image: item.image || item.thumbnail || '',
        price: parseFloat(item.price) || 0,
        description: item.description || '',
        category: item.category || 'Uncategorized',
      }));

    console.log('Formatted tours:', formattedTours);

    return {
      tours: formattedTours,
      total: formattedTours.length,
      page: 1,
      pageSize: formattedTours.length,
      totalPages: 1
    };

  } catch (error) {
    console.error('Error fetching tour data:', error);
    throw new Error('Failed to fetch tours data');
  } finally {
    console.log('Fetching tours from Supabase completed');
  }
};

// Function to get a specific tour by ID
export const getTourById = async (id: string): Promise<TourType | undefined> => {
  try {
    const { data: tours, error } = await supabase
      .from('new_tours')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !tours) {
      return undefined;
    }

    // Transform the response data into TourType format
    const tour: TourType = {
      id: tours.id,
      name: tours.name,
      affLink: tours.affLink || '',
      thumbnail: tours.thumbnail || '',
      image: tours.image || tours.thumbnail || '',
      price: parseFloat(tours.price) || 0,
      description: tours.description || '',
      category: tours.category || 'Uncategorized',
    };

    return tour;

  } catch (error) {
    console.error('Error fetching tour data:', error);
    throw new Error('Failed to fetch tour data');
  }
};
