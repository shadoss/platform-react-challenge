import React, { useState } from 'react';
import { Card } from './ui';
import type { CatImage as CatImageType } from '../types';

interface CatImageProps {
  image: CatImageType;
  onClick?: () => void;
  className?: string;
  aspectRatio?: 'square' | 'auto';
  showBreedName?: boolean;
}

/**
 * CatImage component
 * Displays a cat image with optional breed information
 */
const CatImage: React.FC<CatImageProps> = ({
  image,
  onClick,
  className = '',
  aspectRatio = 'square',
  showBreedName = true,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Get the first breed if available
  const breed = image.breeds && image.breeds.length > 0 ? image.breeds[0] : null;

  // Handle image load
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  // Handle image error
  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Aspect ratio classes
  const aspectRatioClasses = {
    square: 'aspect-square',
    auto: 'aspect-auto',
  };

  return (
    <Card
      className={className}
      hoverable={!!onClick}
      onClick={onClick}
    >
      <div className={`image-container-aspect ${aspectRatioClasses[aspectRatio]}`}>
        {/* Loading state */}
        {isLoading && (
          <div className="image-loading-container">
            <div className="image-loading-spinner"></div>
          </div>
        )}

        {/* Error state */}
        {hasError && (
          <div className="image-loading-container">
            <div className="text-center">
              <svg
                className="image-error-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <p className="image-error-text">Failed to load image</p>
            </div>
          </div>
        )}

        {/* Image */}
        <img
          src={image.url}
          alt={breed ? `Cat of breed ${breed.name}` : 'Cat image'}
          className={`image-responsive ${isLoading || hasError ? 'opacity-0' : 'opacity-100'}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
        />
      </div>

      {/* Breed name if available and requested */}
      {showBreedName && breed && (
        <Card.Content className="p-3">
          <p className="breed-name">{breed.name}</p>
        </Card.Content>
      )}
    </Card>
  );
};

export default CatImage;
