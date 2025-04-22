import React from 'react';
import HeroSection from '../components/HeroSection';
import { Calendar, Plane, Euro, Umbrella, Map, UtensilsCrossed, Bed, Bus } from 'lucide-react';

const TravelGuide: React.FC = () => {
  return (
    <>
      <HeroSection 
        backgroundImage="https://images.pexels.com/photos/1308940/pexels-photo-1308940.jpeg?auto=compress&cs=tinysrgb&w=1920"
        title="Paris Travel Guide"
        subtitle="Everything you need to know for a memorable trip to the City of Light."
      />
      
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <div className="flex items-center mb-6">
                <Calendar className="w-8 h-8 text-paris-red-500 mr-3" />
                <h2 className="text-3xl font-display font-bold text-paris-blue-900">
                  Best Time to Visit
                </h2>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <p className="text-gray-700 mb-4">
                  Paris is beautiful year-round, but each season offers a unique experience:
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-paris-blue-800">Spring (April to June)</h3>
                    <p className="text-gray-700">
                      Arguably the most romantic time to visit Paris. Enjoy mild temperatures, blooming gardens,
                      and fewer crowds than summer. Perfect for outdoor cafés and strolling along the Seine.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-paris-blue-800">Summer (July to August)</h3>
                    <p className="text-gray-700">
                      The peak tourist season brings warm weather, longer days, and outdoor events like Paris Plages
                      (temporary beaches along the Seine). Expect larger crowds and higher prices.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-paris-blue-800">Fall (September to November)</h3>
                    <p className="text-gray-700">
                      A magical time as the city's parks transform with autumn colors. Fewer tourists, 
                      comfortable temperatures, and cultural events make this a fantastic time to visit.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-paris-blue-800">Winter (December to March)</h3>
                    <p className="text-gray-700">
                      Experience a quieter Paris with festive Christmas markets and decorations in December.
                      January and February are the coldest months but offer the lowest prices and shortest lines at attractions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-16">
              <div className="flex items-center mb-6">
                <Plane className="w-8 h-8 text-paris-red-500 mr-3" />
                <h2 className="text-3xl font-display font-bold text-paris-blue-900">
                  Getting to Paris
                </h2>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-paris-blue-800 mb-2">By Air</h3>
                    <p className="text-gray-700">
                      Paris is served by two main airports:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-2 text-gray-700">
                      <li>
                        <strong>Charles de Gaulle Airport (CDG)</strong> - The largest international airport, 
                        located 23 km northeast of Paris.
                      </li>
                      <li>
                        <strong>Orly Airport (ORY)</strong> - Located 13 km south of Paris, handling both 
                        domestic and international flights.
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-paris-blue-800 mb-2">By Train</h3>
                    <p className="text-gray-700">
                      High-speed trains connect Paris to major European cities:
                    </p>
                    <ul className="list-disc pl-5 mt-2 space-y-2 text-gray-700">
                      <li>Eurostar from London (2.5 hours)</li>
                      <li>Thalys from Brussels (1.5 hours) and Amsterdam (3.5 hours)</li>
                      <li>TGV from cities throughout France and connections to other European countries</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-16">
              <div className="flex items-center mb-6">
                <Bus className="w-8 h-8 text-paris-red-500 mr-3" />
                <h2 className="text-3xl font-display font-bold text-paris-blue-900">
                  Getting Around Paris
                </h2>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-paris-blue-800 mb-2">Metro and RER</h3>
                    <p className="text-gray-700">
                      The Paris Metro is one of the most efficient ways to get around the city, with 16 lines and over 300 stations.
                      The RER trains connect central Paris to the suburbs, including Versailles and both airports.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-paris-blue-800 mb-2">Buses</h3>
                    <p className="text-gray-700">
                      Buses complement the metro network and offer scenic routes through the city.
                      Night buses (Noctilien) operate when the metro is closed.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-paris-blue-800 mb-2">Walking</h3>
                    <p className="text-gray-700">
                      Paris is a compact city ideal for walking. Many major attractions are within walking distance of each other,
                      and strolling through the neighborhoods is one of the best ways to experience the city.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-paris-blue-800 mb-2">Vélib' Bike Share</h3>
                    <p className="text-gray-700">
                      Paris has an extensive bike-sharing system with thousands of bikes available at hundreds of stations
                      throughout the city. Short-term passes are available for tourists.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-16">
              <div className="flex items-center mb-6">
                <Bed className="w-8 h-8 text-paris-red-500 mr-3" />
                <h2 className="text-3xl font-display font-bold text-paris-blue-900">
                  Where to Stay
                </h2>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-700 mb-4">
                  Paris is divided into 20 arrondissements (districts), each with its own character and charm:
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-paris-blue-800">1st - 4th Arrondissements (The Heart of Paris)</h3>
                    <p className="text-gray-700">
                      The historic center, including Louvre, Notre-Dame, and Île de la Cité. Centrally located but more expensive.
                      Ideal for first-time visitors who want to be close to major attractions.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-paris-blue-800">5th - 6th Arrondissements (Latin Quarter & Saint-Germain)</h3>
                    <p className="text-gray-700">
                      Charming, historic neighborhoods with excellent cafés, restaurants, and bookshops.
                      Popular with academics and intellectuals. Great for those who enjoy a lively atmosphere.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-paris-blue-800">7th Arrondissement (Eiffel Tower)</h3>
                    <p className="text-gray-700">
                      Upscale residential area with the Eiffel Tower, Invalides, and Musée d'Orsay.
                      Quieter and more spacious than the center, with excellent dining options.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-paris-blue-800">18th Arrondissement (Montmartre)</h3>
                    <p className="text-gray-700">
                      Bohemian neighborhood on a hill with artistic heritage, Sacré-Cœur Basilica, and village-like atmosphere.
                      More affordable accommodation options but be aware of steeper streets.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-16">
              <div className="flex items-center mb-6">
                <UtensilsCrossed className="w-8 h-8 text-paris-red-500 mr-3" />
                <h2 className="text-3xl font-display font-bold text-paris-blue-900">
                  Culinary Experiences
                </h2>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-700 mb-4">
                  No visit to Paris is complete without experiencing its renowned culinary scene:
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-paris-blue-800">Must-Try Parisian Foods</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      <li>Croissants and pain au chocolat from local bakeries</li>
                      <li>French onion soup (soupe à l'oignon)</li>
                      <li>Steak frites (steak with French fries)</li>
                      <li>Coq au vin (chicken braised with wine)</li>
                      <li>Escargots (snails) with garlic butter</li>
                      <li>Crêpes (both sweet and savory)</li>
                      <li>Macarons from famous patisseries like Ladurée or Pierre Hermé</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-paris-blue-800">Dining Tips</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      <li>Lunch is typically served from 12:00-2:00 PM</li>
                      <li>Dinner is served from 7:30-10:30 PM (earlier dining times may indicate tourist-oriented restaurants)</li>
                      <li>Make reservations for popular restaurants several days in advance</li>
                      <li>A "formule" or "menu" offers a set meal at a fixed price, usually good value</li>
                      <li>Service (tip) is typically included in the bill ("service compris")</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-16">
              <div className="flex items-center mb-6">
                <Euro className="w-8 h-8 text-paris-red-500 mr-3" />
                <h2 className="text-3xl font-display font-bold text-paris-blue-900">
                  Money-Saving Tips
                </h2>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="font-bold mr-2">•</span>
                    <span>Purchase a <strong>Paris Museum Pass</strong> if you plan to visit multiple museums and monuments.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">•</span>
                    <span>Consider a <strong>Navigo Découverte</strong> weekly transport pass if staying from Monday to Sunday.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">•</span>
                    <span>Take advantage of <strong>free museum days</strong> - many museums are free on the first Sunday of each month.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">•</span>
                    <span>Students under 26 from EU countries get <strong>free entry</strong> to many attractions (bring ID).</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">•</span>
                    <span>Enjoy <strong>picnics</strong> in Paris's beautiful parks with food from local markets and bakeries.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">•</span>
                    <span>Look for <strong>"menu du jour"</strong> (menu of the day) at restaurants for better value than à la carte.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold mr-2">•</span>
                    <span>Take advantage of <strong>happy hour</strong> specials at cafés and bars (typically 5-7 PM).</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mb-16">
              <div className="flex items-center mb-6">
                <Map className="w-8 h-8 text-paris-red-500 mr-3" />
                <h2 className="text-3xl font-display font-bold text-paris-blue-900">
                  Day Trips from Paris
                </h2>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <p className="text-gray-700 mb-4">
                  If you have extra time, consider these popular day trips from Paris:
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-paris-blue-800">Versailles</h3>
                    <p className="text-gray-700">
                      Visit the magnificent Palace of Versailles, former residence of French kings and queens.
                      Just 45 minutes by RER C train from central Paris.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-paris-blue-800">Giverny</h3>
                    <p className="text-gray-700">
                      Explore Claude Monet's house and gardens, the inspiration for his famous Water Lilies series.
                      About 75 minutes by train from Paris.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-paris-blue-800">Chartres</h3>
                    <p className="text-gray-700">
                      Visit the UNESCO-listed Chartres Cathedral, one of the finest examples of French Gothic architecture.
                      About 1 hour by train from Paris.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-paris-blue-800">Champagne Region</h3>
                    <p className="text-gray-700">
                      Tour the famous champagne houses in Reims and Epernay.
                      About 45 minutes by high-speed train to Reims.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center mb-6">
                <Umbrella className="w-8 h-8 text-paris-red-500 mr-3" />
                <h2 className="text-3xl font-display font-bold text-paris-blue-900">
                  Practical Information
                </h2>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-bold text-paris-blue-800 mb-2">Language</h3>
                    <p className="text-gray-700">
                      While French is the official language, many people in tourist areas speak English.
                      Learning a few basic French phrases is appreciated by locals.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-paris-blue-800 mb-2">Electricity</h3>
                    <p className="text-gray-700">
                      France uses Type E sockets (220V, 50Hz). Travelers from the US and UK will need adapters.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-paris-blue-800 mb-2">Emergency Numbers</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      <li>European Emergency Number: 112</li>
                      <li>Police: 17</li>
                      <li>Fire Department/Ambulance: 18</li>
                      <li>Medical Emergency: 15</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-bold text-paris-blue-800 mb-2">Tourist Offices</h3>
                    <p className="text-gray-700">
                      The main Paris Tourist Office is located at 29 rue de Rivoli, 75004 Paris.
                      Smaller information points are located throughout the city, including at major train stations and airports.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TravelGuide;