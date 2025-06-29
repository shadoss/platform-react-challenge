import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Interface for a favorite cat image
 */
interface FavoriteCat {
  id: string;
  url: string;
  breedId?: string;
  breedName?: string;
}

/**
 * Interface for the favorites store state
 */
interface FavoritesState {
  favorites: FavoriteCat[];
  addFavorite: (cat: FavoriteCat) => void;
  removeFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
}

/**
 * Create a Zustand store for managing favorite cats
 * Uses the persist middleware to save favorites to localStorage
 */
const useFavoriteStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (cat) => {
        set((state) => ({
          favorites: [...state.favorites, cat],
        }));
      },

      removeFavorite: (id) => {
        set((state) => ({
          favorites: state.favorites.filter((cat) => cat.id !== id),
        }));
      },

      isFavorite: (id) => {
        return get().favorites.some((cat) => cat.id === id);
      },
    }),
    {
      name: 'cat-favorites-storage',
    }
  )
);

export default useFavoriteStore;
