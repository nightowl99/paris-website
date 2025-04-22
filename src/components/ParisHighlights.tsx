import React from 'react';

const ParisHighlights: React.FC = () => {
  const highlights = [
    {
      id: 1,
      title: 'Iconic Landmarks',
      description: 'From the Eiffel Tower to Notre-Dame Cathedral, Paris is home to some of the world\'s most recognizable monuments.',
      image: 'https://images.pexels.com/photos/1125212/pexels-photo-1125212.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 2,
      title: 'World-Class Museums',
      description: 'Discover masterpieces at the Louvre, Musée d\'Orsay, and the Centre Pompidou, showcasing art from ancient to contemporary times.',
      image: 'https://images.pexels.com/photos/2363/france-landmark-lights-night.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 3,
      title: 'Culinary Excellence',
      description: 'Indulge in gourmet experiences from Michelin-starred restaurants to charming bistros and delectable pastries.',
      image: 'https://images.pexels.com/photos/2253643/pexels-photo-2253643.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      id: 4,
      title: 'Seine River Cruises',
      description: 'Experience the beauty of Paris from the water with day or evening cruises along the scenic Seine River.',
      image: 'https://images.pexels.com/photos/739407/pexels-photo-739407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ];

  return (
    <section className="py-16">
      <div className="container-custom">
        <h2 className="text-3xl font-display font-bold text-paris-blue-900 mb-6 text-center">
          Why Paris Captivates Millions
        </h2>
        <p className="text-lg text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Discover why the City of Light is the world's most visited destination, 
          drawing travelers with its unmatched blend of history, culture, and charm.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {highlights.map((highlight) => (
            <div key={highlight.id} className="flex flex-col md:flex-row gap-6 group">
              <div className="w-full md:w-1/3 overflow-hidden rounded-lg">
                <img 
                  src={highlight.image} 
                  alt={highlight.title} 
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="w-full md:w-2/3">
                <h3 className="text-xl font-bold text-paris-blue-800 mb-2 group-hover:text-paris-red-500 transition-colors">
                  {highlight.title}
                </h3>
                <p className="text-gray-600">
                  {highlight.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ParisHighlights;