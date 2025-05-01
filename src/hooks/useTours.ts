import { useState, useEffect, useMemo } from 'react';
import { fetchTours } from '../api/toursApi';
import { TourType } from '../types';

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

  const [toursData, setToursData] = useState<{
    tours: TourType[];
    total: number;
    totalPages: number;
  }>({
    tours: [],
    total: 0,
    totalPages: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadTours = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchTours(page, pageSize, category);
        setToursData({
          tours: data.tours,
          total: data.total,
          totalPages: data.totalPages
        });
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch tours'));
      } finally {
        setLoading(false);
      }
    };

    loadTours();
  }, [page, pageSize, category]);

  const filteredTours = useMemo(() => {
    let result = [...toursData.tours];

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
        default:
          // No rating or reviews in new schema, so default sorting could be by Id or Name
          result.sort((a, b) => a.name.localeCompare(b.name));
      }
    }

    return result;
  }, [toursData.tours, searchTerm, category, sortBy, priceRange]);

  // Calculate pagination
  const total = filteredTours.length;
  const totalPages = Math.ceil(total / pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedTours = filteredTours.slice(startIndex, endIndex);

  return {
    tours: paginatedTours,
    total: toursData.total,
    totalPages: toursData.totalPages,
    loading,
    error,
    currentPage: page,
    pageSize
  };
};

// Helper hook for featured tours
export const useFeaturedTours = (limit: number = 3) => {
  const { tours, loading, error } = useTours({ pageSize: 1000 });
  
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