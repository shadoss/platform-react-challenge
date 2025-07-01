/**
 * Types related to state management
 */

/**
 * Interface for a favorite cat image
 */
export interface FavoriteCat {
  id: string;
  url: string;
  breedId?: string;
  breedName?: string;
}

/**
 * Interface for the favorites store state
 */
export interface FavoritesState {
  favorites: FavoriteCat[];
  addFavorite: (cat: FavoriteCat) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}
