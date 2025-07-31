const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie.controller');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
// Everyone can view movies (user or admin)
router.get('/', authenticate, movieController.getAllMovies);


// Admin Create a movie
router.post('/', authenticate, authorize('admin'), movieController.createMovie);

// Admin Get all movies
router.get('/', authenticate, authorize('admin'), movieController.getAllMovies);

// Admin Get a specific movie by ID
router.get('/:id', authenticate, authorize('admin'), movieController.getMovieById);

// Admin Update a movie
router.put('/:id', authenticate, authorize('admin'), movieController.updateMovie);

// Admin Delete a movie
router.delete('/:id', authenticate, authorize('admin'), movieController.deleteMovie);

module.exports = router;
