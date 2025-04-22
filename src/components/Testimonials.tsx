import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sophie Laurent',
    location: 'London, UK',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    quote: 'My Seine River dinner cruise was magical! The food was delicious, and watching the Eiffel Tower sparkle at night while sailing past is a memory I\'ll cherish forever.',
    tour: 'Seine River Dinner Cruise',
  },
  {
    id: 2,
    name: 'Michael Torres',
    location: 'New York, USA',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    quote: 'The skip-the-line tour of the Louvre was worth every penny. Our guide was knowledgeable and passionate, making art history come alive even for our teenagers!',
    tour: 'Louvre Museum Guided Tour',
  },
  {
    id: 3,
    name: 'Aiko Tanaka',
    location: 'Tokyo, Japan',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    quote: 'The Montmartre walking tour showed us a side of Paris we would have never discovered on our own. The small group size made it feel like exploring with friends.',
    tour: 'Montmartre Walking Tour',
  },
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-16 bg-paris-blue-900 text-white">
      <div className="container-custom">
        <h2 className="text-3xl font-display font-bold mb-12 text-center">
          What Our Travelers Say
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative py-10">
            <Quote className="absolute top-0 left-0 w-16 h-16 text-paris-gold-500 opacity-25" />
            
            <div className="text-center">
              <div className="mb-6">
                <img 
                  src={current.image} 
                  alt={current.name} 
                  className="w-20 h-20 rounded-full object-cover mx-auto border-4 border-paris-gold-500"
                />
              </div>
              
              <blockquote className="text-xl md:text-2xl italic mb-6">
                "{current.quote}"
              </blockquote>
              
              <div className="mb-2">
                <p className="font-bold text-lg">{current.name}</p>
                <p className="text-gray-400">{current.location}</p>
              </div>
              
              <p className="text-paris-gold-500">{current.tour}</p>
            </div>
            
            <div className="flex justify-center mt-8 space-x-4">
              <button 
                onClick={goToPrevious}
                className="p-2 rounded-full bg-paris-blue-800 hover:bg-paris-blue-700 transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={goToNext}
                className="p-2 rounded-full bg-paris-blue-800 hover:bg-paris-blue-700 transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;