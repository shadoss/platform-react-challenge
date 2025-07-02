import React, { useState, useCallback, memo } from 'react';
import { Modal, Button, Error, Loading } from './ui';
import { addFavorite, removeFavorite } from '../api/catService';
import type { CatImage as CatImageType } from '../types';
import useFavoriteStore from '../store/favoriteStore';
import { useQueryClient } from '@tanstack/react-query';

interface CatImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image?: CatImageType;
  favoriteId?: number;
  onFavoriteRemoved?: () => void;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
}

/**
 * CatImageModal component
 * Displays a modal with detailed information about a cat image
 * and allows the user to mark it as a favorite
 */
const CatImageModal: React.FC<CatImageModalProps> = ({
  isOpen,
  onClose,
  image,
  favoriteId,
  onFavoriteRemoved,
  isLoading = false,
  isError = false,
  errorMessage = "We couldn't load the details for this cat. Please try again.",
}) => {
  const [isAddingFavorite, setIsAddingFavorite] = useState(false);
  const [isRemovingFavorite, setIsRemovingFavorite] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  // Access the favorite store
  const { addFavorite: addToStore, removeFavorite: removeFromStore, isFavorite } = useFavoriteStore();

  // Access the query client to invalidate queries
  const queryClient = useQueryClient();

  // Get the first breed if available (only if image exists)
  const breed = image?.breeds && image.breeds.length > 0 ? image.breeds[0] : null;

  // Check if the image is already a favorite (only if image exists)
  const isImageFavorite = favoriteId !== undefined || (image && isFavorite(image.id));

  // Handle adding to favorites - memoized with useCallback
  const handleAddFavorite = useCallback(async () => {
    if (!image) return;

    try {
      setIsAddingFavorite(true);
      setActionError(null);

      // Call the API to add to favorites
      await addFavorite(image.id);

      // Add to local store
      addToStore({
        id: image.id,
        url: image.url,
        breedId: breed?.id,
        breedName: breed?.name,
      });

      // Invalidate the favorites query to ensure fresh data when navigating to Favorites page
      await queryClient.invalidateQueries({ queryKey: ['favorites'] });

      setIsAddingFavorite(false);
    } catch (err) {
      setIsAddingFavorite(false);
      setActionError('Failed to add to favorites. Please try again.');
      console.error('Error adding to favorites:', err);
    }
  }, [image, breed, addToStore, queryClient, setIsAddingFavorite, setActionError]);

  // Handle removing from favorites - memoized with useCallback
  const handleRemoveFavorite = useCallback(async () => {
    if (favoriteId === undefined || !image) return;

    try {
      setIsRemovingFavorite(true);
      setActionError(null);

      // Call the API to remove from favorites
      await removeFavorite(favoriteId);

      // Remove from local store
      removeFromStore(image.id);

      // Invalidate the favorites query to ensure fresh data when navigating to Favorites page
      await queryClient.invalidateQueries({ queryKey: ['favorites'] });

      setIsRemovingFavorite(false);

      // Call the onFavoriteRemoved callback if provided
      if (onFavoriteRemoved) {
        onFavoriteRemoved();
      }
    } catch (err) {
      setIsRemovingFavorite(false);
      setActionError('Failed to remove from favorites. Please try again.');
      console.error('Error removing from favorites:', err);
    }
  }, [favoriteId, image, removeFromStore, queryClient, onFavoriteRemoved, setIsRemovingFavorite, setActionError]);

  // Determine the modal title based on state and data
  const modalTitle = isError ? 'Error Loading Cat' : (breed ? `${breed.name}` : 'Cat Image');

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={modalTitle}
      maxWidth="2xl"
    >
      {/* Loading state */}
      {isLoading && (
        <div className="py-12 text-center">
          <Loading variant="dots" text="Loading cat details..." />
        </div>
      )}

      {/* Error state */}
      {isError && !isLoading && (
        <div className="py-8 text-center">
          <Error
            title="Failed to load cat details"
            message={errorMessage}
            variant="error"
            className="mb-6"
          />
        </div>
      )}

      {/* Content state - only show when we have an image and no errors/loading */}
      {!isLoading && !isError && image && (
        <div className="modal-content-layout">
          {/* Image */}
          <div className="modal-column">
            <div className="image-container">
              <img
                src={image.url}
                alt={breed ? `Cat of breed ${breed.name}` : 'Cat image'}
                className="responsive-image"
              />
            </div>
          </div>

          {/* Details */}
          <div className="modal-column">
            {/* Breed information if available */}
            {breed ? (
              <div className="mb-6">
                <h4 className="section-heading">About {breed.name}</h4>
                <p className="section-description">{breed.description}</p>

                <div className="details-grid">
                  <div>
                    <span className="font-medium">Origin:</span> {breed.origin}
                  </div>
                  <div>
                    <span className="font-medium">Life Span:</span> {breed.life_span} years
                  </div>
                  <div>
                    <span className="font-medium">Temperament:</span> {breed.temperament}
                  </div>
                  <div>
                    <span className="font-medium">Weight:</span> {breed.weight.metric} kg
                  </div>
                </div>

                {breed.wikipedia_url && (
                  <a
                    href={breed.wikipedia_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-with-icon"
                  >
                    Learn more on Wikipedia
                    <svg className="link-icon" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                )}
              </div>
            ) : (
              <p className="empty-state-text">No breed information available for this cat.</p>
            )}

            {/* Favorite actions */}
            <div className="mt-4">
              {actionError && (
                <div className="mb-4">
                  <Error message={actionError} />
                </div>
              )}

              {isImageFavorite ? (
                <Button
                  variant="outline"
                  onClick={handleRemoveFavorite}
                  isLoading={isRemovingFavorite}
                  disabled={isRemovingFavorite || favoriteId === undefined}
                  className="w-full"
                >
                  Remove from Favorites
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleAddFavorite}
                  isLoading={isAddingFavorite}
                  disabled={isAddingFavorite}
                  className="w-full"
                >
                  Add to Favorites
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(CatImageModal);
