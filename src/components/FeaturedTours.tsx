import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchTours } from '../api/toursApi';
import { TourType } from '../types';
import TourCard from './TourCard';
import { ChevronRight } from 'lucide-react';

const FeaturedTours: React.FC = () => {
  const [tours, setTours] = useState<TourType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTours = async () => {
      try {
        const allTours = await fetchTours();
        // Get 3 featured tours with highest ratings
        const featuredTours = allTours
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 3);
        
        setTours(featuredTours);
      } catch (error) {
        console.error('Error loading featured tours:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTours();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl font-display font-bold text-paris-blue-900 mb-12 text-center">
            Featured Paris Experiences
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-display font-bold text-paris-blue-900">
            Featured Paris Experiences
          </h2>
          <Link 
            to="/tours" 
            className="flex items-center text-paris-red-500 hover:text-paris-red-600 font-medium transition-colors"
          >
            View all tours <ChevronRight size={20} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTours;