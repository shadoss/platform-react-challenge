import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getFavorites, getCatImage } from '../api/catService';
import type { CatImage as CatImageType } from '../types';
import { Button, Loading, Error, Card } from '../components/ui';
import { CatImageModal, SEO } from '../components';
import { HeartIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import { createCollectionPageJsonLd } from '../utils/seoUtils';

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
    queryFn: () => (selectedImageId ? getCatImage(selectedImageId) : undefined),
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

  // Create JSON-LD structured data for the page
  const jsonLd = createCollectionPageJsonLd({
    title: 'Your Favorite Cats | Cat Lovers App',
    description: 'A collection of cat images you\'ve saved as favorites.',
    url: window.location.href,
    items: favorites ? favorites.slice(0, 10).map((favorite: FavoriteItem, index) => ({
      position: index + 1,
      url: `${window.location.origin}/favorites?imageId=${favorite.image_id}`,
      name: favorite.image.breeds && favorite.image.breeds.length > 0
        ? `${favorite.image.breeds[0].name} Cat`
        : 'Favorite Cat Image',
      image: favorite.image.url
    })) : []
  });

  return (
    <div className="page-container">
      <SEO
        title="Your Favorite Cats"
        description="A collection of cat images you've saved as favorites."
        canonicalUrl={window.location.href.split('?')[0]}
        ogImage={favorites && favorites.length > 0 ? favorites[0].image.url : undefined}
        jsonLd={jsonLd}
      />
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
                  <span className="detail-view-label">View details</span>
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

      {/* Cat image modal - show whenever selectedImageId is set */}
      {selectedImageId && (
        <CatImageModal
          isOpen={!!selectedImageId}
          onClose={handleCloseModal}
          image={selectedImage}
          favoriteId={selectedFavoriteId || undefined}
          onFavoriteRemoved={handleFavoriteRemoved}
          isLoading={isLoadingSelectedImage}
          isError={isErrorSelectedImage}
          errorMessage={`We couldn't load the details for this cat. The image ID "${selectedImageId}" might be invalid or the server is unavailable.`}
        />
      )}
    </div>
  );
};

export default Favorites;
