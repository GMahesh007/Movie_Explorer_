const axios = require('axios');

const OMDB_API_URL = process.env.OMDB_API_URL || 'https://www.omdbapi.com/';
const OMDB_API_KEY = process.env.OMDB_API_KEY;

if (!OMDB_API_KEY) {
  console.error('⚠️  WARNING: OMDB_API_KEY is not set in environment variables');
}

/**
 * Make request to OMDB API
 */
const makeRequest = async (params) => {
  try {
    const response = await axios.get(OMDB_API_URL, {
      params: {
        apikey: OMDB_API_KEY,
        ...params
      },
      timeout: 10000
    });

    if (response.data.Response === 'False') {
      const error = new Error(response.data.Error || 'Movie not found');
      error.statusCode = 404;
      throw error;
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      // API responded with error
      const apiError = new Error(error.response.data.Error || 'OMDB API error');
      apiError.statusCode = error.response.status;
      throw apiError;
    } else if (error.request) {
      // Request made but no response
      const timeoutError = new Error('OMDB API timeout or network error');
      timeoutError.statusCode = 503;
      throw timeoutError;
    } else {
      throw error;
    }
  }
};

/**
 * Search movies by title
 */
const searchMovies = async ({ title, page = 1, year, type }) => {
  const params = {
    s: title,
    page
  };

  if (year) params.y = year;
  if (type) params.type = type;

  const data = await makeRequest(params);

  return {
    movies: data.Search || [],
    totalResults: parseInt(data.totalResults) || 0,
    page: parseInt(page),
    totalPages: Math.ceil((parseInt(data.totalResults) || 0) / 10)
  };
};

/**
 * Get movie details by IMDb ID
 */
const getMovieById = async (imdbId, plot = 'full') => {
  const data = await makeRequest({
    i: imdbId,
    plot
  });

  return formatMovieDetails(data);
};

/**
 * Get movie by exact title
 */
const getMovieByTitle = async (title, year, plot = 'full') => {
  const params = {
    t: title,
    plot
  };

  if (year) params.y = year;

  const data = await makeRequest(params);

  return formatMovieDetails(data);
};

/**
 * Format movie details for consistent response
 */
const formatMovieDetails = (data) => {
  return {
    imdbID: data.imdbID,
    title: data.Title,
    year: data.Year,
    rated: data.Rated,
    released: data.Released,
    runtime: data.Runtime,
    genre: data.Genre,
    director: data.Director,
    writer: data.Writer,
    actors: data.Actors,
    plot: data.Plot,
    language: data.Language,
    country: data.Country,
    awards: data.Awards,
    poster: data.Poster !== 'N/A' ? data.Poster : null,
    ratings: data.Ratings || [],
    metascore: data.Metascore !== 'N/A' ? data.Metascore : null,
    imdbRating: data.imdbRating !== 'N/A' ? data.imdbRating : null,
    imdbVotes: data.imdbVotes !== 'N/A' ? data.imdbVotes : null,
    type: data.Type,
    dvd: data.DVD,
    boxOffice: data.BoxOffice !== 'N/A' ? data.BoxOffice : null,
    production: data.Production,
    website: data.Website !== 'N/A' ? data.Website : null
  };
};

module.exports = {
  searchMovies,
  getMovieById,
  getMovieByTitle
};
