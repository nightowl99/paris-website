import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-paris-blue-900 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
            <Link to="/" className="flex items-center">
              <MapPin className="w-6 h-6 text-paris-red-500" />
              <span className="ml-2 text-xl font-display font-bold">Paris Tourism</span>
            </Link>
            <p className="mt-4 text-gray-300">
              Discover the magic of Paris with our curated collection of tours and experiences. 
              From iconic landmarks to hidden gems, we help you explore the City of Light.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-display font-bold mb-4 border-b border-paris-gold-500 pb-2">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-paris-gold-500 transition-colors">Home</Link></li>
              <li><Link to="/tours" className="hover:text-paris-gold-500 transition-colors">Tours</Link></li>
              <li><Link to="/attractions" className="hover:text-paris-gold-500 transition-colors">Attractions</Link></li>
              <li><Link to="/travel-guide" className="hover:text-paris-gold-500 transition-colors">Travel Guide</Link></li>
              <li><a href="#" className="hover:text-paris-gold-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-paris-gold-500 transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Popular Tours */}
          <div>
            <h4 className="text-lg font-display font-bold mb-4 border-b border-paris-gold-500 pb-2">Popular Tours</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-paris-gold-500 transition-colors">Eiffel Tower Skip-the-Line</a></li>
              <li><a href="#" className="hover:text-paris-gold-500 transition-colors">Seine River Cruise</a></li>
              <li><a href="#" className="hover:text-paris-gold-500 transition-colors">Louvre Museum Guided Tour</a></li>
              <li><a href="#" className="hover:text-paris-gold-500 transition-colors">Montmartre Walking Tour</a></li>
              <li><a href="#" className="hover:text-paris-gold-500 transition-colors">Versailles Palace Day Trip</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-display font-bold mb-4 border-b border-paris-gold-500 pb-2">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-paris-gold-500 mr-2 mt-1" />
                <span>123 Tourism Street, Paris, France</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-paris-gold-500 mr-2" />
                <span>+33 123 456 789</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-paris-gold-500 mr-2" />
                <span>info@paristourism.com</span>
              </li>
            </ul>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-white hover:text-paris-gold-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white hover:text-paris-gold-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white hover:text-paris-gold-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-white hover:text-paris-gold-500 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Paris Tourism. All rights reserved.</p>
          <p className="mt-2 text-sm">This site contains affiliate links. We may earn a commission when you book through our partners.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;