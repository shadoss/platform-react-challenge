import type { CatImage } from '../api';

/**
 * Types related to the Favorites page
 */

/**
 * Interface for favorite item from API
 */
export interface FavoriteItem {
  id: number;
  image_id: string;
  image: CatImage;
}
