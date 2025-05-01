import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import TourCard from '../components/TourCard';
import HeroSection from '../components/HeroSection';
import { Filter, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { useTours } from '../hooks/useTours';
import { useCategories } from '../hooks/useCategories';

const Tours: React.FC = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('search') || '';
  
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popularity');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  const { tours, total: totalTours, totalPages, loading: toursLoading, error: toursError } = useTours({
    page: currentPage,
    pageSize,
    category: activeCategory !== 'all' ? activeCategory : undefined,
    sortBy,
    priceRange,
    searchTerm
  });

  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();

  // Combine all categories with 'all' option
  const allCategories = [
    { id: 0, name: 'All Categories', slug: 'all' },
    ...(categories || [])
  ];

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const resultsSection = document.getElementById('tours-results');
    if (resultsSection) {
      resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (toursError || categoriesError) {
    return (
      <div className="container-custom py-16 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Content</h2>
        <p className="text-gray-600">{toursError?.message || categoriesError?.message}</p>
      </div>
    );
  }

  return (
    <>
      <HeroSection 
        backgroundImage="https://images.pexels.com/photos/705782/pexels-photo-705782.jpeg?auto=compress&cs=tinysrgb&w=1920"
        title="Paris Tours & Activities"
        subtitle="Discover the best experiences Paris has to offer, from iconic landmarks to hidden gems and local favorites."
      />
      
      <section id="tours-results" className="py-16">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between mb-8">
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-paris-blue-900 mb-4 md:mb-0">
              {searchTerm 
                ? `Search Results for "${searchTerm}"` 
                : "All Paris Tours & Experiences"}
            </h1>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center md:hidden bg-paris-blue-100 px-4 py-2 rounded w-full sm:w-auto"
            >
              <Filter size={18} className="mr-2" />
              <span>Filters</span>
              <ChevronDown size={18} className={`ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Filters */}
            <div className={`w-full md:w-1/4 ${showFilters ? 'block' : 'hidden md:block'}`}>
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
                <h3 className="text-lg font-bold text-paris-blue-900 mb-4">Filters</h3>
                
                {/* Categories */}
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Categories</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
                    {categoriesLoading ? (
                      <div className="animate-pulse h-8 bg-gray-200 rounded"></div>
                    ) : (
                      allCategories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => setActiveCategory(category.name)}
                          className={`block w-full text-left px-3 py-2 rounded transition-colors ${
                            activeCategory === category.name
                              ? 'bg-paris-blue-100 text-paris-blue-800 font-medium'
                              : 'hover:bg-gray-100'
                          }`}
                        >
                          {category.name}
                        </button>
                      ))
                    )}
                  </div>
                </div>
                
                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Price Range ($)</h4>
                  <div className="flex justify-between mb-2 text-sm">
                    <span>{priceRange[0]}$</span>
                    <span>{priceRange[1]}$</span>
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
            <div className="w-full md:w-3/4">
              {toursLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-96 bg-gray-200 rounded-lg animate-pulse"></div>
                  ))}
                </div>
              ) : tours?.length ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {tours
                    .filter((tour) => tour.category === activeCategory || activeCategory === 'all')
                    .map((tour) => (
                      <TourCard key={tour.id} tour={tour} />
                    ))}
                  </div>
                  
                  {/* Pagination Controls */}
                  <div className="flex flex-col sm:flex-row justify-center items-center mt-8 gap-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      
                      <span className="text-gray-600">
                        Page {currentPage} of {totalPages}
                      </span>
                      
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </div>
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