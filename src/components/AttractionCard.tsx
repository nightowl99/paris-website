import React from 'react';
import { AttractionType } from '../types';
import { MapPin, Clock, ExternalLink, Star } from 'lucide-react';

interface AttractionCardProps {
  attraction: AttractionType;
}

const AttractionCard: React.FC<AttractionCardProps> = ({ attraction }) => {
  return (
    <div className="card h-full flex flex-col overflow-hidden">
      <div className="relative overflow-hidden h-48 sm:h-64">
        <img 
          src={attraction.image} 
          alt={attraction.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      
      <div className="flex-grow p-5 flex flex-col">
        <div className="flex items-center mb-2">
          <Star size={16} className="mr-1 text-paris-gold-500" fill="#EAB308" /> 
          <span className="font-medium">{attraction.rating}</span>
        </div>
        
        <h3 className="text-xl font-bold text-paris-blue-900 mb-2">
          {attraction.name}
        </h3>
        
        <p className="text-gray-600 mb-4 text-sm line-clamp-3">
          {attraction.description}
        </p>
        
        <div className="space-y-2 text-sm text-gray-600 mt-auto">
          <div className="flex items-start">
            <MapPin size={16} className="mr-2 mt-1 flex-shrink-0" /> 
            <span>{attraction.location}</span>
          </div>
          <div className="flex items-start">
            <Clock size={16} className="mr-2 mt-1 flex-shrink-0" /> 
            <span>{attraction.hours}</span>
          </div>
          <div className="flex justify-between mt-4 pt-4 border-t border-gray-100">
            <span className="font-medium text-paris-blue-900">{attraction.price}</span>
            <a 
              href={attraction.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-paris-blue-600 hover:text-paris-red-500 transition-colors"
            >
              <span className="mr-1">Website</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttractionCard;