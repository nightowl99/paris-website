import { useState, useEffect, useMemo } from 'react';
import { fetchTours } from '../api/toursApi';
import { TourType } from '../types';

// Interface defining the optional parameters for the useTours hook
interface UseToursOptions {
  start?: number;          // Current page number for pagination
  end?: number;      // Number of items per page
  category?: string;      // Tour category filter
  sortBy?: string;        // Sorting criteria
  priceRange?: [number, number];  // Min and max price range filter
  searchTerm?: string;    // Search text filter
}

interface ToursData {
  tours: TourType[];
  totalPages: number;
}

// Main hook for fetching and managing tours data with filtering and pagination
export const useTours = (options: UseToursOptions = {}) => {
  // Destructure options with default values
  const {
    start = 0,
    end = 12,
    category,
    sortBy,
    priceRange,
    searchTerm
  } = options;

  // State for storing tours data, loading state, and error handling
  const [toursData, setToursData] = useState<ToursData>({
    tours: [],
    totalPages: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Effect hook to fetch tours when dependencies change
  useEffect(() => {
    const loadTours = async () => {
      try {
        setLoading(true);
        setError(null);
        const {
          tours,
          totalPages
        } = await fetchTours(
          start,
          end,
          category,
          priceRange?.[0],
          priceRange?.[1],
          searchTerm
        );

        console.log('Hook Tours:', tours);
        console.log('Hook Total Pages:', totalPages);
        setToursData({
          tours: tours,
          totalPages: totalPages
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch tours'));
      } finally {
        setLoading(false);
      }
    };

    loadTours();
  }, [start, end, category]);  // Re-fetch when these values change

  // Return all necessary data and state for the component
  return {
    tours: toursData.tours,
    totalPages: toursData.totalPages,
    loading,
    error,
    currentPage: start,
    pageSize: end
  };
};

// Helper hook specifically for fetching featured tours
export const useFeaturedTours = (limit: number = 3) => {
  // Use main tours hook with large page size to get all tours
  const { tours, loading, error } = useTours({ end: 1000 });
  
  // Memoize the featured tours selection
  const featuredTours = useMemo(() => {
    return tours
      .slice(0, limit) || [];
  }, [tours, limit]);

  return {
    tours: featuredTours,
    loading,
    error
  };
}; 