import React from 'react';

/**
 * Breeds page component
 * Displays a list of cat breeds
 */
const Breeds: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cat Breeds</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Breed cards will be displayed here */}
        <p>Breed list will be loaded here</p>
      </div>
    </div>
  );
};

export default Breeds;
