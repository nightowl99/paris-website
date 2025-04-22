import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTourById } from '../api/toursApi';
import { TourType } from '../types';
import { Clock, Star, MapPin, CheckCircle, XCircle, Calendar, Users, ChevronLeft } from 'lucide-react';

const TourDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [tour, setTour] = useState<TourType | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [participants, setParticipants] = useState(2);

  useEffect(() => {
    const loadTour = async () => {
      if (!id) return;
      
      try {
        const tourData = await getTourById(id);
        if (tourData) {
          setTour(tourData);
        }
      } catch (error) {
        console.error('Error loading tour details:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTour();
  }, [id]);

  // Generate available dates (next 30 days)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        })
      });
    }
    
    return dates;
  };

  const availableDates = getAvailableDates();

  if (loading) {
    return (
      <div className="pt-32 pb-16">
        <div className="container-custom">
          <div className="h-96 bg-gray-200 rounded-lg animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="pt-32 pb-16">
        <div className="container-custom text-center">
          <h1 className="text-3xl font-display font-bold text-paris-blue-900 mb-4">
            Tour Not Found
          </h1>
          <p className="mb-8">The tour you are looking for does not exist or has been removed.</p>
          <Link to="/tours" className="btn btn-primary">
            Browse All Tours
          </Link>
        </div>
      </div>
    );
  }

  const handleBooking = () => {
    window.open(tour.bookingLink, '_blank');
  };

  return (
    <>
      <div 
        className="h-96 bg-cover bg-center pt-32"
        style={{
          backgroundImage: `linear-gradient(rgba(5, 20, 65, 0.7), rgba(5, 30, 80, 0.5)), url(${tour.image})`,
        }}
      >
        <div className="container-custom h-full flex flex-col justify-end pb-8 text-white">
          <Link to="/tours" className="flex items-center text-white mb-4 hover:text-paris-gold-500 transition-colors">
            <ChevronLeft size={20} className="mr-1" /> Back to all tours
          </Link>
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
            {tour.name}
          </h1>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <div className="flex items-center">
              <Clock size={18} className="mr-2" /> {tour.duration}
            </div>
            <div className="flex items-center">
              <Star size={18} className="mr-2 text-paris-gold-500" fill="#EAB308" /> 
              <span className="font-medium">{tour.rating}</span>
              <span className="text-gray-300 ml-1">({tour.reviews} reviews)</span>
            </div>
            <div className="flex items-center">
              <MapPin size={18} className="mr-2" /> {tour.location}
            </div>
          </div>
        </div>
      </div>
      
      <section className="py-16">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Tour Description and Details */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-display font-bold text-paris-blue-900 mb-4">
                  Tour Overview
                </h2>
                <p className="text-gray-700 mb-8 whitespace-pre-line">
                  {tour.description}
                </p>
                
                <h3 className="text-xl font-display font-bold text-paris-blue-900 mb-4">
                  Highlights
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                  {tour.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle size={18} className="text-paris-gold-500 mr-2 mt-1" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-display font-bold text-paris-blue-900 mb-4">
                      Inclusions
                    </h3>
                    <ul className="space-y-2">
                      {tour.inclusions.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle size={18} className="text-green-500 mr-2 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-display font-bold text-paris-blue-900 mb-4">
                      Exclusions
                    </h3>
                    <ul className="space-y-2">
                      {tour.exclusions.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <XCircle size={18} className="text-paris-red-500 mr-2 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-display font-bold text-paris-blue-900 mb-4">
                  Important Information
                </h2>
                <div className="space-y-4 text-gray-700">
                  <p>
                    <strong>Meeting Point:</strong> Detailed meeting point information will be provided in your confirmation email.
                  </p>
                  <p>
                    <strong>Cancellation Policy:</strong> Free cancellation up to 24 hours before the start time for a full refund.
                  </p>
                  <p>
                    <strong>Accessibility:</strong> Please contact us in advance if you have any specific accessibility requirements.
                  </p>
                  <p>
                    <strong>Weather Conditions:</strong> Tours operate in all weather conditions, so please dress appropriately.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Booking Panel */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-display font-bold text-paris-blue-900">
                    Book this Tour
                  </h3>
                  <div className="text-2xl font-bold text-paris-blue-900">
                    €{tour.price.toFixed(2)}
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      <Calendar size={18} className="inline mr-2" />
                      Select Date
                    </label>
                    <select
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-paris-blue-500"
                      required
                    >
                      <option value="">Select a date</option>
                      {availableDates.map((date) => (
                        <option key={date.value} value={date.value}>
                          {date.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      <Users size={18} className="inline mr-2" />
                      Number of Participants
                    </label>
                    <select
                      value={participants}
                      onChange={(e) => setParticipants(parseInt(e.target.value))}
                      className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-paris-blue-500"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'person' : 'people'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between mb-2">
                    <span>Price per person</span>
                    <span>€{tour.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg text-paris-blue-900">
                    <span>Total Price</span>
                    <span>€{(tour.price * participants).toFixed(2)}</span>
                  </div>
                </div>
                
                <button 
                  onClick={handleBooking}
                  disabled={!selectedDate}
                  className={`w-full py-3 rounded-md font-medium transition-colors ${
                    selectedDate 
                      ? 'bg-paris-gold-500 hover:bg-paris-gold-600 text-paris-blue-900' 
                      : 'bg-gray-300 cursor-not-allowed text-gray-600'
                  }`}
                >
                  Book Now
                </button>
                
                <p className="text-center text-sm text-gray-500 mt-4">
                  You will be redirected to our partner site to complete your booking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TourDetails;