import React from 'react';
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
  // Get the first breed if available
  const breed = image.breeds && image.breeds.length > 0 ? image.breeds[0] : null;

  return (
    <Card
      className={className}
      hoverable={!!onClick}
      onClick={onClick}
    >
      <Card.Image
        src={image.url}
        alt={breed ? `Cat of breed ${breed.name}` : 'Cat image'}
        aspectRatio={aspectRatio === 'square' ? 'square' : 'auto'}
      />

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
