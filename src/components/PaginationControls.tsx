'use client'

import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalPages: number;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  hasNextPage,
  hasPreviousPage,
  totalPages
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Get current page from URL params, default to 1
  const currentPage = parseInt(searchParams.get('page') || '1');

  const handlePageChange = (newPage: number) => {
    // Create new URLSearchParams to preserve other query parameters
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', newPage.toString());
    
    // Navigate to the new URL with updated page parameter
    navigate(`?${newSearchParams.toString()}`);
  };

  return (
    <div className="flex justify-center items-center gap-4 mt-8">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={!hasPreviousPage}
        className="px-4 py-2 bg-paris-blue-500 text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-paris-blue-600 transition-colors"
      >
        Previous
      </button>
      
      <span className="text-gray-700">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={!hasNextPage}
        className="px-4 py-2 bg-paris-blue-500 text-white rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-paris-blue-600 transition-colors"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
