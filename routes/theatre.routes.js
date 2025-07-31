const express = require('express');
const router = express.Router();
const theatreController = require('../controllers/theatre.controller');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

// Admin-only routes
router.post('/', authenticate, authorize('admin'), theatreController.createTheatre);
// Everyone can view theatres
router.get('/', authenticate, theatreController.getAllTheatres);

router.get('/', authenticate, authorize('admin'), theatreController.getAllTheatres);
router.put('/:id', authenticate, authorize('admin'), theatreController.updateTheatre);
router.delete('/:id', authenticate, authorize('admin'), theatreController.deleteTheatre);

module.exports = router;
