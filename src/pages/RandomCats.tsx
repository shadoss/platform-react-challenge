import React from 'react';

/**
 * RandomCats page component
 * Displays a list of random cat images with load more functionality
 */
const RandomCats: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Random Cats</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Cat images will be displayed here */}
        <p>Cat images will be loaded here</p>
      </div>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Load More
      </button>
    </div>
  );
};

export default RandomCats;
