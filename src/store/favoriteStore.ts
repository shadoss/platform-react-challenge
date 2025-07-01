import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FavoritesState } from '../types';

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
