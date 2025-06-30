import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getFavorites, getCatImage } from '../api/catService';
import type { CatImage as CatImageType } from '../api/catService';
import { Button, Loading, Error, Card } from '../components/ui';
import { CatImageModal } from '../components';
import { HeartIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

/**
 * Interface for favorite item from API
 */
interface FavoriteItem {
  id: number;
  image_id: string;
  image: CatImageType;
}

/**
 * Favorites page component
 * Displays a list of the user's favorite cat images
 */
const Favorites: React.FC = () => {
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
  const [selectedFavoriteId, setSelectedFavoriteId] = useState<number | null>(null);

  // Fetch favorites from API
  const {
    data: favorites,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['favorites'],
    queryFn: getFavorites,
  });

  // Fetch selected cat image if imageId is set
  const {
    data: selectedImage,
    isLoading: isLoadingSelectedImage,
    isError: isErrorSelectedImage,
  } = useQuery({
    queryKey: ['catImage', selectedImageId],
    queryFn: () => (selectedImageId ? getCatImage(selectedImageId) : null),
    enabled: !!selectedImageId,
  });

  // Handle cat image click
  const handleCatClick = (image: CatImageType, favoriteId: number) => {
    setSelectedImageId(image.id);
    setSelectedFavoriteId(favoriteId);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setSelectedImageId(null);
    setSelectedFavoriteId(null);
  };

  // Handle successful removal of a favorite
  const handleFavoriteRemoved = () => {
    refetch();
    handleCloseModal();
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Your Favorite Cats</h1>
        <p className="page-subtitle">A collection of cat images you've saved as favorites</p>
      </div>

      {/* Error state */}
      {isError && (
        <Error
          title="Failed to load favorites"
          message={`Error: ${error instanceof Error ? error.message : 'Unknown error'}`}
          onRetry={() => refetch()}
          variant="error"
          className="mb-6"
        />
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="loading-section-container">
          <Loading.Section text="Loading your favorites..." variant="dots" />
        </div>
      )}

      {/* Favorites grid */}
      {favorites && favorites.length > 0 && (
        <div className="grid-container">
          {favorites.map((favorite: FavoriteItem) => (
            <Card
              key={favorite.id}
              hoverable
              variant="elevated"
              className="card-full-height"
              onClick={() => handleCatClick(favorite.image, favorite.id)}
            >
              <Card.Image
                src={favorite.image.url}
                alt="Favorite Cat"
                aspectRatio="square"
                className="card-image-fixed-height"
              />
              <Card.Footer>
                <div className="badge-container">
                  <div className="favorite-icon-container">
                    <HeartIcon className="favorite-icon" />
                    <span className="favorite-text">Favorite</span>
                  </div>
                  <span className="detail-view-label">View details</span>
                </div>
              </Card.Footer>
            </Card>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && (!favorites || favorites.length === 0) && !isError && (
        <div className="empty-state">
          <div className="empty-state-icon">
            <HeartIcon className="h-full w-full" />
          </div>
          <h3 className="empty-state-title">No favorites yet</h3>
          <p className="empty-state-message">You haven't added any cats to your favorites yet.</p>
          <div className="empty-state-actions">
            <Button
              variant="primary"
              onClick={() => window.location.href = '/'}
              icon={<ArrowRightIcon className="icon-small" />}
            >
              Explore Cats
            </Button>
          </div>
        </div>
      )}

      {/* Cat image modal with favorite ID for removal */}
      {selectedImage && (
        <CatImageModal
          isOpen={!!selectedImage}
          onClose={handleCloseModal}
          image={selectedImage}
          favoriteId={selectedFavoriteId || undefined}
          onFavoriteRemoved={handleFavoriteRemoved}
        />
      )}

      {/* Loading state for selected image */}
      {isLoadingSelectedImage && selectedImageId && (
        <Loading.Overlay text="Loading cat details..." blur={true} />
      )}

      {/* Error state for selected image */}
      {isErrorSelectedImage && selectedImageId && (
        <Error.FullPage
          title="Failed to load cat details"
          message="We couldn't load the details for this cat. Please try again."
          onRetry={() => setSelectedImageId(selectedImageId)}
          variant="error"
        />
      )}
    </div>
  );
};

export default Favorites;
