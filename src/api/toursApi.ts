import axios from 'axios';
import Papa from 'papaparse';
import { TourType } from '../types';

// Function to fetch and parse the CSV data
export const fetchTours = async (): Promise<TourType[]> => {
  try {
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
            .filter((item: any) => item.name && item.id)
            .map((item: any, index: number) => ({
              id: item.id || `tour-${index}`,
              name: item.name || 'Paris Tour',
              description: item.description || 'Experience the beauty of Paris with this amazing tour.',
              duration: item.duration || '3 hours',
              price: parseFloat(item.price) || 99.99,
              currency: item.currency || 'EUR',
              image: item.image || `https://source.unsplash.com/random/800x600/?paris,${index}`,
              rating: parseFloat(item.rating) || 4.5,
              reviews: parseInt(item.reviews) || 87,
              category: item.category || 'Sightseeing',
              location: item.location || 'Paris, France',
              bookingLink: item.booking_link || '#',
              highlights: (item.highlights || 'Skip the line;Expert guide;Small group').split(';'),
              inclusions: (item.inclusions || 'Guide;Entrance fees').split(';'),
              exclusions: (item.exclusions || 'Hotel pickup;Food and drinks').split(';'),
            }));
          
          resolve(tours);
        },
        error: (error: Error) => {
          reject(error);
        }
      });
    });
  } catch (error) {
    console.error('Error fetching tour data:', error);
    
    // Return mock data if the CSV fetch fails
    return getMockTours();
  }
};

// Mock data as fallback
const getMockTours = (): TourType[] => {
  return [
    {
      id: 'tour-1',
      name: 'Skip-the-Line: Eiffel Tower Tour',
      description: 'Enjoy priority access to the Eiffel Tower with an expert guide. Learn about the history of this iconic landmark and take in breathtaking views of Paris from the second floor.',
      duration: '2 hours',
      price: 59.99,
      currency: 'EUR',
      image: 'https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      rating: 4.8,
      reviews: 1243,
      category: 'Landmarks',
      location: 'Eiffel Tower, Paris',
      bookingLink: '#',
      highlights: ['Skip the line access', 'Expert guide', 'Small group tour', 'Second floor access'],
      inclusions: ['Professional guide', 'Entrance tickets', 'Small group tour'],
      exclusions: ['Summit access', 'Hotel pickup and drop-off', 'Food and drinks'],
    },
    {
      id: 'tour-2',
      name: 'Louvre Museum Guided Tour',
      description: 'Skip the line and discover the Louvre\'s top attractions and hidden gems with an expert guide, including the Mona Lisa, Venus de Milo, and more.',
      duration: '2.5 hours',
      price: 65.00,
      currency: 'EUR',
      image: 'https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      rating: 4.7,
      reviews: 956,
      category: 'Museums',
      location: 'Louvre Museum, Paris',
      bookingLink: '#',
      highlights: ['Skip the line access', 'See the Mona Lisa', 'Expert art historian guide', 'Small group size'],
      inclusions: ['Museum entrance fees', 'Professional guide', 'Headsets to hear the guide'],
      exclusions: ['Hotel pickup and drop-off', 'Food and drinks', 'Gratuities'],
    },
    {
      id: 'tour-3',
      name: 'Seine River Dinner Cruise',
      description: 'Enjoy a romantic dinner cruise along the Seine River with views of illuminated landmarks and a delicious 3-course meal with wine.',
      duration: '2 hours',
      price: 89.00,
      currency: 'EUR',
      image: 'https://images.pexels.com/photos/739407/pexels-photo-739407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      rating: 4.6,
      reviews: 782,
      category: 'Cruises',
      location: 'Seine River, Paris',
      bookingLink: '#',
      highlights: ['Scenic river cruise', '3-course dinner', 'Live music', 'Views of illuminated landmarks'],
      inclusions: ['2-hour Seine cruise', '3-course dinner', 'Wine and coffee', 'Live entertainment'],
      exclusions: ['Hotel pickup and drop-off', 'Additional drinks', 'Gratuities'],
    },
    {
      id: 'tour-4',
      name: 'Montmartre Walking Tour',
      description: 'Discover the artistic neighborhood of Montmartre with a local guide. Visit Sacré-Cœur Basilica, Place du Tertre, and hear stories about famous artists who lived here.',
      duration: '2 hours',
      price: 39.99,
      currency: 'EUR',
      image: 'https://images.pexels.com/photos/705764/pexels-photo-705764.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      rating: 4.9,
      reviews: 452,
      category: 'Walking Tours',
      location: 'Montmartre, Paris',
      bookingLink: '#',
      highlights: ['Sacré-Cœur Basilica', 'Place du Tertre', 'Moulin Rouge', 'Artists\' studios'],
      inclusions: ['Local guide', 'Small group tour'],
      exclusions: ['Food and drinks', 'Transportation to Montmartre', 'Gratuities'],
    },
    {
      id: 'tour-5',
      name: 'Versailles Palace Skip-the-Line Tour',
      description: 'Explore the magnificent Palace of Versailles with a skip-the-line ticket and expert guide. Visit the State Apartments, Hall of Mirrors, and beautiful gardens.',
      duration: '6 hours',
      price: 89.99,
      currency: 'EUR',
      image: 'https://images.pexels.com/photos/1125212/pexels-photo-1125212.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      rating: 4.7,
      reviews: 987,
      category: 'Day Trips',
      location: 'Versailles, France',
      bookingLink: '#',
      highlights: ['Skip-the-line access', 'Hall of Mirrors', 'Royal Apartments', 'Gardens of Versailles'],
      inclusions: ['Round-trip transportation', 'Professional guide', 'Entrance fees', 'Audio guide'],
      exclusions: ['Food and drinks', 'Gratuities', 'Hotel pickup and drop-off'],
    },
    {
      id: 'tour-6',
      name: 'Catacombs Skip-the-Line Tour',
      description: 'Explore the eerie Catacombs of Paris with priority access and an expert guide. Learn about the history of this underground ossuary holding the remains of more than six million people.',
      duration: '1.5 hours',
      price: 49.99,
      currency: 'EUR',
      image: 'https://images.pexels.com/photos/3610752/pexels-photo-3610752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      rating: 4.5,
      reviews: 623,
      category: 'Underground',
      location: 'Paris Catacombs, Paris',
      bookingLink: '#',
      highlights: ['Skip-the-line access', 'Expert guide', 'Small group size', 'Explore restricted areas'],
      inclusions: ['Professional guide', 'Entrance fees', 'Small group tour'],
      exclusions: ['Hotel pickup and drop-off', 'Gratuities', 'Photography permit'],
    },
  ];
};

// Function to get a specific tour by ID
export const getTourById = async (id: string): Promise<TourType | undefined> => {
  const tours = await fetchTours();
  return tours.find(tour => tour.id === id);
};

// Function to get tours by category
export const getToursByCategory = async (category: string): Promise<TourType[]> => {
  const tours = await fetchTours();
  return tours.filter(tour => tour.category === category);
};