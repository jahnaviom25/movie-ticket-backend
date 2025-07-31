const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

// Only users can access booking routes
router.post('/', authenticate, authorize(['user']), bookingController.createBooking);
router.get('/', authenticate, authorize(['user']), bookingController.getUserBookings);
router.put('/:id', authenticate, authorize(['user']), bookingController.updateBooking);
router.delete('/:id', authenticate, authorize(['user']), bookingController.deleteBooking);

module.exports = router;
