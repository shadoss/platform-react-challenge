import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getBreeds } from '../api/catService';
import type { CatBreed } from '../api/catService';
import { Loading, Error, Card, Button } from '../components/ui';
import { BreedModal } from '../components';

/**
 * Breeds page component
 * Displays a list of cat breeds
 */
const Breeds: React.FC = () => {
  const [selectedBreed, setSelectedBreed] = useState<CatBreed | null>(null);

  // Fetch all breeds
  const {
    data: breeds,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['breeds'],
    queryFn: getBreeds,
  });

  // Handle breed card click
  const handleBreedClick = (breed: CatBreed) => {
    setSelectedBreed(breed);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setSelectedBreed(null);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Cat Breeds</h1>
        <p className="page-subtitle">Explore different cat breeds and learn about their characteristics</p>
      </div>

      {/* Error state */}
      {isError && (
        <Error
          title="Failed to load breeds"
          message={`Error: ${error instanceof Error ? error.message : 'Unknown error'}`}
          onRetry={() => refetch()}
          variant="error"
          className="mb-6"
        />
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="py-12">
          <Loading.Section text="Loading breeds..." variant="dots" />
        </div>
      )}

      {/* Breeds grid */}
      {breeds && breeds.length > 0 && (
        <div className="grid-container">
          {breeds.map((breed) => (
            <Card
              key={breed.id}
              hoverable
              variant="elevated"
              className="card-full-height"
              onClick={() => handleBreedClick(breed)}
            >
              <Card.Content>
                <Card.Title>{breed.name}</Card.Title>
                <Card.Badge color="primary" className="mb-3">{breed.origin}</Card.Badge>
                <Card.Description>
                  {breed.description && breed.description.length > 150
                    ? `${breed.description.substring(0, 150)}...`
                    : breed.description}
                </Card.Description>
              </Card.Content>
              <Card.Footer>
                <div className="badge-container">
                  <span className="text-sm text-gray-500">Temperament: {breed.temperament?.split(', ')[0]}</span>
                  <span className="detail-view-label">View details</span>
                </div>
              </Card.Footer>
            </Card>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && (!breeds || breeds.length === 0) && !isError && (
        <div className="empty-state">
          <div className="empty-state-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
            </svg>
          </div>
          <h3 className="empty-state-title">No breeds found</h3>
          <p className="empty-state-message">Try refreshing the page or check back later.</p>
          <div className="empty-state-actions">
            <Button
              variant="primary"
              onClick={() => refetch()}
            >
              Refresh
            </Button>
          </div>
        </div>
      )}

      {/* Breed modal */}
      {selectedBreed && (
        <BreedModal
          isOpen={!!selectedBreed}
          onClose={handleCloseModal}
          breed={selectedBreed}
        />
      )}
    </div>
  );
};

export default Breeds;
