import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedTours from '../components/FeaturedTours';
import FeaturedAttractions from '../components/FeaturedAttractions';
import Testimonials from '../components/Testimonials';
import ParisHighlights from '../components/ParisHighlights';

const Home: React.FC = () => {
  return (
    <>
      <HeroSection 
        title="Discover the Magic of Paris"
        subtitle="Explore the city's iconic landmarks, world-class museums, and hidden gems with our curated selection of tours and experiences."
      />
      <FeaturedTours />
      <ParisHighlights />
      <FeaturedAttractions />
      <Testimonials />
    </>
  );
};

export default Home;