import apiClient from './apiClient';
import type { AxiosResponse } from 'axios';

/**
 * Interface for a cat image from the API
 */
export interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
  breeds: CatBreed[];
}

/**
 * Interface for a cat breed from the API
 */
export interface CatBreed {
  id: string;
  name: string;
  description: string;
  temperament: string;
  origin: string;
  life_span: string;
  weight: {
    imperial: string;
    metric: string;
  };
  wikipedia_url?: string;
}

/**
 * Fetch random cat images
 * @param limit Number of images to fetch (default: 10)
 * @param page Page number for pagination (default: 0)
 * @returns Promise with array of cat images
 */
export const getRandomCats = async (limit = 10, page = 0): Promise<CatImage[]> => {
  const response: AxiosResponse<CatImage[]> = await apiClient.get('/images/search', {
    params: {
      limit,
      page,
      has_breeds: 1,
    },
  });
  return response.data;
};

/**
 * Fetch a specific cat image by ID
 * @param imageId The ID of the cat image
 * @returns Promise with cat image data
 */
export const getCatImage = async (imageId: string): Promise<CatImage> => {
  const response: AxiosResponse<CatImage> = await apiClient.get(`/images/${imageId}`);
  return response.data;
};

/**
 * Fetch all cat breeds
 * @returns Promise with array of cat breeds
 */
export const getBreeds = async (): Promise<CatBreed[]> => {
  const response: AxiosResponse<CatBreed[]> = await apiClient.get('/breeds');
  return response.data;
};

/**
 * Fetch cat images by breed
 * @param breedId The ID of the breed
 * @param limit Number of images to fetch (default: 10)
 * @param page Page number for pagination (default: 0)
 * @returns Promise with array of cat images
 */
export const getCatsByBreed = async (breedId: string, limit = 10, page = 0): Promise<CatImage[]> => {
  const response: AxiosResponse<CatImage[]> = await apiClient.get('/images/search', {
    params: {
      breed_ids: breedId,
      limit,
      page,
    },
  });
  return response.data;
};

/**
 * Add a cat image to favorites
 * @param imageId The ID of the cat image
 * @returns Promise with the response data
 */
export const addFavorite = async (imageId: string): Promise<{ id: number; message: string }> => {
  const response: AxiosResponse<{ id: number; message: string }> = await apiClient.post('/favourites', {
    image_id: imageId,
  });
  return response.data;
};

/**
 * Remove a cat image from favorites
 * @param favoriteId The ID of the favorite entry
 * @returns Promise with the response data
 */
export const removeFavorite = async (favoriteId: number): Promise<{ message: string }> => {
  const response: AxiosResponse<{ message: string }> = await apiClient.delete(`/favourites/${favoriteId}`);
  return response.data;
};

/**
 * Get user's favorite cat images
 * @returns Promise with array of favorite entries
 */
export const getFavorites = async (): Promise<{ id: number; image_id: string; image: CatImage }[]> => {
  const response: AxiosResponse<{ id: number; image_id: string; image: CatImage }[]> = await apiClient.get('/favourites');
  return response.data;
};
