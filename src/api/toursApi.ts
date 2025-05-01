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

// Function to fetch tours with proper pagination
export const fetchTours = async (
  page: number = 1,
  pageSize: number = 12,
  category?: string
): Promise<PaginatedTours> => {
  try {
    console.log('Fetching tours from Supabase with pagination');
    
    // Calculate the range for pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    // Build the query
    let query = supabase
      .from('new_tours')
      .select('*', { count: 'exact' });

    // Add category filter if provided
    if (category) {
      query = query.eq('category', category);
    }

    // Add range for pagination
    const { data: tours, error, count } = await query
      .range(from, to)
      .order('name');

    if (error) {
      throw error;
    }

    const formattedTours: TourType[] = (tours || [])
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

    // Calculate total pages
    const totalCount = count || formattedTours.length;
    const totalPages = Math.ceil(totalCount / pageSize);

    console.log('Pagination info:', {
      page,
      pageSize,
      total: totalCount,
      totalPages
    });

    return {
      tours: formattedTours,
      total: totalCount,
      page,
      pageSize,
      totalPages
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

// Add new type for categories
export type CategoryType = {
  id: number;
  name: string;
  slug: string;
};

// Add new function to fetch categories
export const fetchCategories = async (): Promise<CategoryType[]> => {
  try {
    const { data: categories, error } = await supabase
      .from('tour_categories')
      .select('*')
      .order('name');

    if (error) {
      throw error;
    }

    return categories || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories');
  }
};
