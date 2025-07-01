/**
 * Types related to API responses and requests
 */

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
 * Interface for a favorite entry from the API
 */
export interface FavoriteEntry {
  id: number;
  image_id: string;
  image: CatImage;
}
