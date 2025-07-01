import type { CatImage as CatImageType } from '../api';

/**
 * Types related to the CatImage component
 */

export interface CatImageProps {
  image: CatImageType;
  onClick?: () => void;
  className?: string;
  aspectRatio?: 'square' | 'auto';
  showBreedName?: boolean;
}
