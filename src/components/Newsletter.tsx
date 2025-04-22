import React, { useState } from 'react';
import { Mail } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the newsletter signup
    console.log('Email submitted:', email);
    setSubmitted(true);
    setEmail('');
    
    // Reset the success message after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section className="bg-paris-blue-100 py-16">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <Mail className="w-12 h-12 text-paris-blue-800 mx-auto mb-4" />
          <h2 className="text-3xl font-display font-bold text-paris-blue-900 mb-3">
            Stay Updated with Paris Travel Deals
          </h2>
          <p className="text-paris-blue-700 mb-8">
            Subscribe to our newsletter and receive exclusive offers, travel tips, and updates about the latest Paris attractions and experiences.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-paris-blue-500"
              required
            />
            <button 
              type="submit" 
              className="btn btn-primary py-3"
            >
              Subscribe
            </button>
          </form>
          
          {submitted && (
            <p className="mt-4 text-paris-blue-700 animate-fadeIn">
              Thank you for subscribing! We'll keep you updated with the latest Paris travel deals.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;