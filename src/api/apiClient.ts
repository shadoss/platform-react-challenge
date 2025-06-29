import axios from 'axios';

/**
 * Base URL for TheCatAPI from environment variables
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

/**
 * API key for TheCatAPI from environment variables
 */
const API_KEY = import.meta.env.VITE_API_KEY;

/**
 * Create an Axios instance with base configuration
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'x-api-key': API_KEY,
    'Content-Type': 'application/json',
  },
});

export default apiClient;
