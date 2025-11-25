const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

/**
 * @route   GET /api/movies/search
 * @desc    Search movies by title
 * @query   title (required), page (optional, default: 1), year (optional)
 * @access  Public
 */
router.get('/search', movieController.searchMovies);

/**
 * @route   GET /api/movies/:id
 * @desc    Get detailed movie information by IMDb ID
 * @param   id - IMDb ID (e.g., tt1285016)
 * @access  Public
 */
router.get('/:id', movieController.getMovieById);

/**
 * @route   GET /api/movies/title/:title
 * @desc    Get movie by exact title
 * @param   title - Movie title
 * @query   year (optional)
 * @access  Public
 */
router.get('/title/:title', movieController.getMovieByTitle);

module.exports = router;
