import axios from 'axios';
import Papa from 'papaparse';

// Function to fetch and parse the CSV data
export type PaginatedTours = {
  tours: TourType[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
};

// Function to fetch and parse the CSV data with pagination
export const fetchTours = async (): Promise<PaginatedTours> => {
  try {
    console.log('Fetching tours from Supabase');
    const response = await axios.get(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/tours`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
      }
    );

    return new Promise((resolve, reject) => {
      Papa.parse(response.data, {
        header: true,
        complete: (results) => {
          // Transform the parsed data into our TourType format
          const tours: TourType[] = results.data
            .filter((item: any) => item.Id && item.Name)
            .map((item: any) => ({
              id: item.Id,
              name: item.Name,
              category: item.Category || 'Uncategorized',
              sku: item.SKU || '',
              status: item.Status || 'active',
              price: parseFloat(item.Price) || 0,
              retailPrice: parseFloat(item['Retail Price']) || 0,
              thumbnail: item.Thumbnail || '',
              commission: parseFloat(item.commission) || 0,
              url: item.URL || '',
              description: item.Description || '',
              image: item.Image || item.Thumbnail || '',
              merchant: item.merchant || '',
              duration: '2-3 hours',
              currency: 'EUR',
              rating: 4.5,
              reviews: 0,
              location: 'Paris, France',
              bookingLink: item.URL || '#',
              highlights: ['Skip the line', 'Expert guide', 'Small group'],
              inclusions: ['Guide', 'Entrance fees'],
              exclusions: ['Hotel pickup', 'Food and drinks']
            }));

          resolve({
            tours,
            total: tours.length,
            page: 1,
            pageSize: tours.length,
            totalPages: 1
          });
        },
        error: (error: Error) => {
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error('Error fetching tour data:', error);
    throw new Error('Failed to fetch tours data');
  } finally {
    console.log('Fetching tours from Supabase completed');
  }
};

// Update TourType to match the new structure
export type TourType = {
  id: string;
  name: string;
  category: string;
  sku: string;
  status: string;
  price: number;
  retailPrice: number;
  thumbnail: string;
  commission: number;
  url: string;
  description: string;
  image: string;
  merchant: string;
  // Additional UI fields
  duration: string;
  currency: string;
  rating: number;
  reviews: number;
  location: string;
  bookingLink: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
};

// Function to get a specific tour by ID
export const getTourById = async (id: string): Promise<TourType | undefined> => {
  const data = await fetchTours(); // Fetch all tours to find the specific one
  return data.tours.find(tour => tour.id === id);
};
