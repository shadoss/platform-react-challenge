import type { CatImage } from '../api';

/**
 * Types related to the CatImageModal component
 */

export interface CatImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image?: CatImage;
  favoriteId?: number;
  onFavoriteRemoved?: () => void;
  isLoading?: boolean;
  isError?: boolean;
  errorMessage?: string;
}
