import type { CatBreed } from '../api';

/**
 * Types related to the BreedModal component
 */

export interface BreedModalProps {
  isOpen: boolean;
  onClose: () => void;
  breed: CatBreed;
}
