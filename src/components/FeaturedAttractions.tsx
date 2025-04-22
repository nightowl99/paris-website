import React from 'react';
import { Link } from 'react-router-dom';
import { getAttractions } from '../api/attractionsApi';
import AttractionCard from './AttractionCard';
import { ChevronRight } from 'lucide-react';

const FeaturedAttractions: React.FC = () => {
  const attractions = getAttractions().slice(0, 3);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-display font-bold text-paris-blue-900">
            Must-See Paris Attractions
          </h2>
          <Link 
            to="/attractions" 
            className="flex items-center text-paris-red-500 hover:text-paris-red-600 font-medium transition-colors"
          >
            View all attractions <ChevronRight size={20} />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {attractions.map((attraction) => (
            <AttractionCard key={attraction.id} attraction={attraction} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedAttractions;