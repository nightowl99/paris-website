import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchTours } from '../api/toursApi';
import { TourType } from '../types';
import TourCard from '../components/TourCard';
import HeroSection from '../components/HeroSection';
import { Filter, ChevronDown } from 'lucide-react';

const Tours: React.FC = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';
  
  const [tours, setTours] = useState<TourType[]>([]);
  const [filteredTours, setFilteredTours] = useState<TourType[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popularity');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const loadTours = async () => {
      try {
        const data = await fetchTours();
        setTours(data);
        setFilteredTours(data);
      } catch (error) {
        console.error('Error loading tours:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTours();
  }, []);

  useEffect(() => {
    let result = [...tours];
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(tour => 
        tour.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by category
    if (activeCategory !== 'all') {
      result = result.filter(tour => tour.category === activeCategory);
    }
    
    // Filter by price range
    result = result.filter(tour => 
      tour.price >= priceRange[0] && tour.price <= priceRange[1]
    );
    
    // Sort tours
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
    
    setFilteredTours(result);
  }, [tours, searchTerm, activeCategory, sortBy, priceRange]);

  // Get unique categories
  const categories = ['all', ...new Set(tours.map(tour => tour.category))];

  return (
    <>
      <HeroSection 
        backgroundImage="https://images.pexels.com/photos/705782/pexels-photo-705782.jpeg?auto=compress&cs=tinysrgb&w=1920"
        title="Paris Tours & Activities"
        subtitle="Discover the best experiences Paris has to offer, from iconic landmarks to hidden gems and local favorites."
      />
      
      <section className="py-16">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between mb-8">
            <h1 className="text-3xl font-display font-bold text-paris-blue-900 mb-4 md:mb-0">
              {searchTerm 
                ? `Search Results for "${searchTerm}"` 
                : "All Paris Tours & Experiences"}
            </h1>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center md:hidden bg-paris-blue-100 px-4 py-2 rounded"
            >
              <Filter size={18} className="mr-2" />
              <span>Filters</span>
              <ChevronDown size={18} className={`ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters */}
            <div className={`md:w-1/4 ${showFilters ? 'block' : 'hidden md:block'}`}>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-paris-blue-900 mb-4">Filters</h3>
                
                {/* Categories */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`block w-full text-left px-3 py-2 rounded transition-colors ${
                          activeCategory === category
                            ? 'bg-paris-blue-100 text-paris-blue-800 font-medium'
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {category === 'all' ? 'All Categories' : category}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Price Range (€)</h4>
                  <div className="flex justify-between mb-2 text-sm">
                    <span>{priceRange[0]}€</span>
                    <span>{priceRange[1]}€</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="10"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
                
                {/* Sort By */}
                <div>
                  <h4 className="font-medium mb-2">Sort By</h4>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-paris-blue-500"
                  >
                    <option value="popularity">Popularity</option>
                    <option value="rating">Rating</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Tour Listings */}
            <div className="md:w-3/4">
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-96 bg-gray-200 rounded-lg animate-pulse"></div>
                  ))}
                </div>
              ) : filteredTours.length > 0 ? (
                <>
                  <p className="mb-6 text-gray-600">
                    Showing {filteredTours.length} tours
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTours.map((tour) => (
                      <TourCard key={tour.id} tour={tour} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-xl font-bold text-paris-blue-900 mb-2">No tours found</h3>
                  <p className="text-gray-600">
                    Try adjusting your filters or search criteria to find tours.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Tours;