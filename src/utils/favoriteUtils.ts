/**
 * Utility functions for managing favorites
 */
import { addFavorite as addFavoriteApi, removeFavorite as removeFavoriteApi, getFavorites } from '../api/catService';
import type { CatImage } from '../types';
import { QueryClient } from '@tanstack/react-query';

/**
 * Interface for favorite item
 */
interface FavoriteItem {
  id: string;
  url: string;
  breedId?: string;
  breedName?: string;
}

/**
 * Adds a cat image to favorites
 * @param image - The cat image to add to favorites
 * @param addToStore - Function to add the favorite to the local store
 * @param queryClient - Query client to invalidate queries
 * @returns Promise that resolves when the favorite is added
 */
export const addToFavorites = async (
  image: CatImage,
  addToStore: (favorite: FavoriteItem) => void,
  queryClient: QueryClient
): Promise<void> => {
  try {
    // Call the API to add to favorites
    await addFavoriteApi(image.id);

    // Get the first breed if available
    const breed = image.breeds && image.breeds.length > 0 ? image.breeds[0] : null;

    // Add to local store
    addToStore({
      id: image.id,
      url: image.url,
      breedId: breed?.id,
      breedName: breed?.name,
    });

    // Invalidate the favorites query to ensure fresh data when navigating to Favorites page
    await queryClient.invalidateQueries({ queryKey: ['favorites'] });
  } catch (err) {
    console.error('Error adding to favorites:', err);
    throw err;
  }
};

/**
 * Removes a cat image from favorites
 * @param imageId - The ID of the cat image to remove from favorites
 * @param favoriteId - Optional ID of the favorite entry
 * @param removeFromStore - Function to remove the favorite from the local store
 * @param queryClient - Query client to invalidate queries
 * @returns Promise that resolves when the favorite is removed
 */
export const removeFromFavorites = async (
  imageId: string,
  favoriteId: number | undefined,
  removeFromStore: (imageId: string) => void,
  queryClient: QueryClient
): Promise<void> => {
  try {
    // If we have a favoriteId, call the API to remove from favorites
    if (favoriteId !== undefined) {
      await removeFavoriteApi(favoriteId);
    } else {
      // If we don't have a favoriteId, we need to fetch it from the API
      const favorites = await getFavorites();
      const favorite = favorites.find(fav => fav.image_id === imageId);

      if (favorite) {
        // If we found the favorite, remove it from the API
        await removeFavoriteApi(favorite.id);
      } else {
        console.warn('Could not find favorite ID for image:', imageId);
      }
    }

    // Remove from local store
    removeFromStore(imageId);

    // Invalidate the favorites query to ensure fresh data when navigating to Favorites page
    await queryClient.invalidateQueries({ queryKey: ['favorites'] });
  } catch (err) {
    console.error('Error removing from favorites:', err);
    throw err;
  }
};
