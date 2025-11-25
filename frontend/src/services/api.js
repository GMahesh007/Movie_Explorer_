import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.error || error.message || 'An error occurred';
    return Promise.reject(new Error(message));
  }
);

/**
 * Search movies by title
 */
export const searchMovies = async (title, page = 1, filters = {}) => {
  try {
    const params = {
      title,
      page,
      ...filters
    };
    
    const response = await apiClient.get('/movies/search', { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Get movie details by IMDb ID
 */
export const getMovieById = async (id) => {
  try {
    const response = await apiClient.get(`/movies/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Get movie by exact title
 */
export const getMovieByTitle = async (title, year = null) => {
  try {
    const params = year ? { year } : {};
    const response = await apiClient.get(`/movies/title/${encodeURIComponent(title)}`, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default apiClient;
