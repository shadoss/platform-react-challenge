/**
 * Utility functions for fetching and managing cat images
 */
import { getCatsByBreed } from '../api/catService';
import type { CatImage } from '../types';

/**
 * Fetches cat images for a specific breed
 * @param breedId - The ID of the breed
 * @param page - Page number for pagination
 * @param limit - Number of images to fetch
 * @param onLoading - Callback to set loading state
 * @param onSuccess - Callback to set success state
 * @param onError - Callback to set error state
 * @returns Promise with the fetched images
 */
export const fetchBreedImages = async (
  breedId: string,
  page: number = 0,
  limit: number = 8,
  onLoading?: () => void,
  onSuccess?: () => void,
  onError?: () => void
): Promise<CatImage[]> => {
  try {
    if (onLoading) onLoading();

    const images = await getCatsByBreed(breedId, limit, page);

    if (onSuccess) onSuccess();

    return images;
  } catch (err) {
    console.error('Error fetching breed images:', err);

    if (onError) onError();

    throw err;
  }
};

/**
 * Determines if there are more images to load based on the number of images fetched
 * @param fetchedCount - Number of images fetched
 * @param limit - Limit used for fetching
 * @returns Boolean indicating if there are more images
 */
export const hasMoreImages = (fetchedCount: number, limit: number): boolean => {
  return fetchedCount === limit;
};

/**
 * Updates an image collection with new images
 * @param currentImages - Current collection of images
 * @param newImages - New images to add
 * @param append - Whether to append the new images or replace the current ones
 * @returns Updated collection of images
 */
export const updateImageCollection = (
  currentImages: CatImage[],
  newImages: CatImage[],
  append: boolean = false
): CatImage[] => {
  if (append) {
    return [...currentImages, ...newImages];
  } else {
    return newImages;
  }
};
