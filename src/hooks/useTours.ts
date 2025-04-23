import { useState, useEffect, useMemo } from 'react';
import { fetchTours, PaginatedTours, TourType } from '../api/toursApi';

interface UseToursOptions {
  page?: number;
  pageSize?: number;
  category?: string;
  sortBy?: string;
  priceRange?: [number, number];
  searchTerm?: string;
}

export const useTours = (options: UseToursOptions = {}) => {
  const {
    page = 1,
    pageSize = 12,
    category,
    sortBy,
    priceRange,
    searchTerm
  } = options;

  const [allTours, setAllTours] = useState<TourType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadTours = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchTours();
        setAllTours(data.tours);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch tours'));
        setAllTours([]);
      } finally {
        setLoading(false);
      }
    };

    loadTours();
  }, []);

  const filteredTours = useMemo(() => {
    let result = [...allTours];

    // Filter by search term
    if (searchTerm) {
      result = result.filter(tour => 
        tour.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (category && category !== 'all') {
      result = result.filter(tour => tour.category === category);
    }

    // Filter by price range
    if (priceRange) {
      result = result.filter(tour => 
        tour.price >= priceRange[0] && tour.price <= priceRange[1]
      );
    }

    // Sort tours
    if (sortBy) {
      switch (sortBy) {
        case 'price-low':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          result.sort((a, b) => b.rating - a.rating);
          break;
        default: // popularity (reviews)
          result.sort((a, b) => b.reviews - a.reviews);
      }
    }

    return result;
  }, [allTours, searchTerm, category, sortBy, priceRange]);

  // Calculate pagination
  const total = filteredTours.length;
  const totalPages = Math.ceil(total / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedTours = filteredTours.slice(startIndex, endIndex);

  return {
    toursData: {
      tours: paginatedTours,
      total,
      page,
      pageSize,
      totalPages
    },
    loading,
    error,
    currentPage: page,
    pageSize
  };
};

// Helper hook for featured tours
export const useFeaturedTours = (limit: number = 3) => {
  const { toursData, loading, error } = useTours({ pageSize: 1000 });
  
  const featuredTours = useMemo(() => {
    return toursData?.tours
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit) || [];
  }, [toursData?.tours, limit]);

  return {
    tours: featuredTours,
    loading,
    error
  };
}; 