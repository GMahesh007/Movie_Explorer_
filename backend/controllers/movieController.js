const omdbService = require('../services/omdbService');
const cacheService = require('../services/cacheService');

/**
 * Search movies by title
 */
const searchMovies = async (req, res, next) => {
  try {
    const { title, page = 1, year, type } = req.query;

    if (!title) {
      return res.status(400).json({
        success: false,
        error: 'Title parameter is required'
      });
    }

    // Create cache key
    const cacheKey = `search:${title}:${page}:${year || ''}:${type || ''}`;
    
    // Check cache
    const cachedData = await cacheService.get(cacheKey);
    if (cachedData) {
      return res.json({
        success: true,
        data: cachedData,
        cached: true
      });
    }

    // Fetch from OMDB API
    const data = await omdbService.searchMovies({ title, page, year, type });

    // Cache the response
    await cacheService.set(cacheKey, data);

    res.json({
      success: true,
      data,
      cached: false
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get movie by IMDb ID
 */
const getMovieById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { plot = 'full' } = req.query;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'Movie ID is required'
      });
    }

    // Create cache key
    const cacheKey = `movie:${id}:${plot}`;
    
    // Check cache
    const cachedData = await cacheService.get(cacheKey);
    if (cachedData) {
      return res.json({
        success: true,
        data: cachedData,
        cached: true
      });
    }

    // Fetch from OMDB API
    const data = await omdbService.getMovieById(id, plot);

    // Cache the response
    await cacheService.set(cacheKey, data);

    res.json({
      success: true,
      data,
      cached: false
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get movie by exact title
 */
const getMovieByTitle = async (req, res, next) => {
  try {
    const { title } = req.params;
    const { year, plot = 'full' } = req.query;

    if (!title) {
      return res.status(400).json({
        success: false,
        error: 'Movie title is required'
      });
    }

    // Create cache key
    const cacheKey = `title:${title}:${year || ''}:${plot}`;
    
    // Check cache
    const cachedData = await cacheService.get(cacheKey);
    if (cachedData) {
      return res.json({
        success: true,
        data: cachedData,
        cached: true
      });
    }

    // Fetch from OMDB API
    const data = await omdbService.getMovieByTitle(title, year, plot);

    // Cache the response
    await cacheService.set(cacheKey, data);

    res.json({
      success: true,
      data,
      cached: false
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  searchMovies,
  getMovieById,
  getMovieByTitle
};
