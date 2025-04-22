import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="pt-32 pb-16 min-h-screen flex items-center justify-center">
      <div className="container-custom text-center">
        <h1 className="text-6xl md:text-8xl font-display font-bold text-paris-blue-900 mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-medium mb-6">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 max-w-md mx-auto mb-8">
          The page you are looking for might have been removed, had its name changed, 
          or is temporarily unavailable.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center btn btn-primary py-3 px-8"
        >
          <Home className="mr-2" size={20} />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;