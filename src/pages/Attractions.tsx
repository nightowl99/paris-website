import React from 'react';
import { getAttractions } from '../api/attractionsApi';
import AttractionCard from '../components/AttractionCard';
import HeroSection from '../components/HeroSection';

const Attractions: React.FC = () => {
  const attractions = getAttractions();

  return (
    <>
      <HeroSection 
        backgroundImage="https://images.pexels.com/photos/1850021/pexels-photo-1850021.jpeg?auto=compress&cs=tinysrgb&w=1920"
        title="Paris Attractions"
        subtitle="Discover the iconic landmarks and cultural treasures that make Paris the world's most visited city."
      />
      
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-display font-bold text-paris-blue-900 mb-6">
            Top Paris Attractions
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mb-12">
            Paris is home to some of the world's most iconic landmarks and attractions. 
            From architectural masterpieces to world-renowned museums, there's something 
            for every traveler to discover and enjoy in the City of Light.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {attractions.map((attraction) => (
              <AttractionCard key={attraction.id} attraction={attraction} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Attractions;