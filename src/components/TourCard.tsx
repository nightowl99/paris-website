import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Star, MapPin, Euro } from 'lucide-react';
import { TourType } from '../types';

interface TourCardProps {
  tour: TourType;
}

const TourCard: React.FC<TourCardProps> = ({ tour }) => {
  return (
    <Link to={`/tours/${tour.id}`} className="group">
      <div className="card h-full flex flex-col overflow-hidden transform transition-all duration-300 group-hover:translate-y-[-5px]">
        <div className="relative overflow-hidden h-48 sm:h-64">
          <img 
            src={tour.image} 
            alt={tour.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute top-0 right-0 bg-paris-gold-500 text-paris-blue-900 font-bold px-4 py-2 text-sm">
            {tour.category}
          </div>
        </div>
        
        <div className="flex-grow p-5 flex flex-col">
          <div className="flex items-center mb-2 text-sm text-gray-600">
            <Clock size={16} className="mr-1" /> {tour.duration}
            <div className="mx-2 bg-gray-300 w-1 h-1 rounded-full"></div>
            <div className="flex items-center">
              <Star size={16} className="mr-1 text-paris-gold-500" fill="#EAB308" /> 
              <span className="font-medium">{tour.rating}</span>
              <span className="text-gray-500 ml-1">({tour.reviews})</span>
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-paris-blue-900 mb-2 group-hover:text-paris-red-500 transition-colors">
            {tour.name}
          </h3>
          
          <p className="text-gray-600 mb-4 text-sm line-clamp-3">
            {tour.description}
          </p>
          
          <div className="mt-auto flex justify-between items-center">
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin size={16} className="mr-1" /> {tour.location}
            </div>
            <div className="font-bold text-paris-blue-900 flex items-center">
              <Euro size={16} className="mr-1" />
              {tour.price.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TourCard;