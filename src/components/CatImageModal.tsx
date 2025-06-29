import React, { useState } from 'react';
import { Modal, Button, Error } from './ui';
import { addFavorite, removeFavorite } from '../api/catService';
import type { CatImage as CatImageType } from '../api/catService';
import useFavoriteStore from '../store/favoriteStore';

interface CatImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: CatImageType;
  favoriteId?: number;
  onFavoriteRemoved?: () => void;
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
}) => {
  const [isAddingFavorite, setIsAddingFavorite] = useState(false);
  const [isRemovingFavorite, setIsRemovingFavorite] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get the first breed if available
  const breed = image.breeds && image.breeds.length > 0 ? image.breeds[0] : null;

  // Access the favorite store
  const { addFavorite: addToStore, removeFavorite: removeFromStore, isFavorite } = useFavoriteStore();

  // Check if the image is already a favorite
  const isImageFavorite = favoriteId !== undefined || isFavorite(image.id);

  // Handle adding to favorites
  const handleAddFavorite = async () => {
    try {
      setIsAddingFavorite(true);
      setError(null);

      // Call the API to add to favorites
      await addFavorite(image.id);

      // Add to local store
      addToStore({
        id: image.id,
        url: image.url,
        breedId: breed?.id,
        breedName: breed?.name,
      });

      setIsAddingFavorite(false);
    } catch (err) {
      setIsAddingFavorite(false);
      setError('Failed to add to favorites. Please try again.');
      console.error('Error adding to favorites:', err);
    }
  };

  // Handle removing from favorites
  const handleRemoveFavorite = async () => {
    if (favoriteId === undefined) return;

    try {
      setIsRemovingFavorite(true);
      setError(null);

      // Call the API to remove from favorites
      await removeFavorite(favoriteId);

      // Remove from local store
      removeFromStore(image.id);

      setIsRemovingFavorite(false);

      // Call the onFavoriteRemoved callback if provided
      if (onFavoriteRemoved) {
        onFavoriteRemoved();
      }
    } catch (err) {
      setIsRemovingFavorite(false);
      setError('Failed to remove from favorites. Please try again.');
      console.error('Error removing from favorites:', err);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={breed ? `${breed.name}` : 'Cat Image'}
      maxWidth="2xl"
    >
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

            {error && (
              <div className="mb-4">
                <Error message={error} />
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
    </Modal>
  );
};

export default CatImageModal;
