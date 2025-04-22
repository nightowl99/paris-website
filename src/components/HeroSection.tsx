import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

interface HeroSectionProps {
  backgroundImage?: string;
  title: string;
  subtitle: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  backgroundImage = 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=1920',
  title,
  subtitle
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/tours?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center text-white py-40 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(5, 20, 65, 0.7), rgba(5, 30, 80, 0.5)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-30"></div>
      
      <div className="container-custom relative z-10 text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-4 animate-fadeIn">
          {title}
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 animate-slideUp">
          {subtitle}
        </p>
        
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4 animate-slideUp">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search tours, attractions, activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-4 rounded-lg text-paris-blue-900 focus:outline-none focus:ring-2 focus:ring-paris-gold-500"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <button 
            type="submit" 
            className="btn btn-secondary px-8 py-4 text-lg font-medium"
          >
            Explore
          </button>
        </form>
      </div>
    </section>
  );
};

export default HeroSection;