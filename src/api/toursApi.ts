import { TourType } from "../types";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export type PaginatedTours = {
  tours: TourType[];
  totalPages: number;
};

export const fetchTours = async (
  start: number = 0,
  end: number = 12,
  category?: string,
  minPrice?: number,
  maxPrice?: number,
  searchTerm?: string
): Promise<PaginatedTours> => {
  try {
    console.log('Fetching tours from Supabase with pagination');

    const params = new URLSearchParams({
      start: String(start),
      end: String(end),
    });

    if (category) params.append('category', category);
    if (minPrice !== undefined) params.append('minPrice', String(minPrice));
    if (maxPrice !== undefined) params.append('maxPrice', String(maxPrice));
    if (searchTerm) params.append('searchTerm', searchTerm);

    const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/paginate-tours?${params.toString()}`;

    console.log('Params:', params.toString());

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) throw new Error(`Request failed: ${response.status}`);

    const result = await response.json();

    const formattedTours: TourType[] = (result.data || [])
      .filter((item: any) => item.id && item.name)
      .map((item: any) => ({
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
      totalPages: result.totalPages || 1
    };

  } catch (error) {
    console.error('Error fetching tour data:', error);
    throw new Error('Failed to fetch tours data');
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