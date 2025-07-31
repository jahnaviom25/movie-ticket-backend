const db = require('../config/db');

// Create a new booking
exports.createBooking = (req, res) => {
  const { movie_id, theatre_id, seats } = req.body;
  const user_id = req.user.id;

  if (!movie_id || !theatre_id || !seats) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sql = 'INSERT INTO bookings (user_id, movie_id, theatre_id, seats) VALUES (?, ?, ?, ?)';
  db.query(sql, [user_id, movie_id, theatre_id, seats], (err, result) => {
    if (err) {
      console.error('Error creating booking:', err);
      return res.status(500).json({ message: 'Failed to create booking' });
    }

    res.status(201).json({ message: 'Booking created', bookingId: result.insertId });
  });
};

// Get all bookings of the logged-in user
exports.getUserBookings = (req, res) => {
  const user_id = req.user.id;

  const sql = 'SELECT * FROM bookings WHERE user_id = ?';
  db.query(sql, [user_id], (err, results) => {
    if (err) {
      console.error('Error fetching bookings:', err);
      return res.status(500).json({ message: 'Failed to fetch bookings' });
    }

    res.status(200).json(results);
  });
};

// Update booking
exports.updateBooking = (req, res) => {
  const bookingId = req.params.id;
  const user_id = req.user.id;
  const { seats } = req.body;

  if (!seats) {
    return res.status(400).json({ message: 'Seats are required' });
  }

  const sql = 'UPDATE bookings SET seats = ? WHERE id = ? AND user_id = ?';
  db.query(sql, [seats, bookingId, user_id], (err, result) => {
    if (err) {
      console.error('Error updating booking:', err);
      return res.status(500).json({ message: 'Failed to update booking' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Booking not found or not yours' });
    }

    res.status(200).json({ message: 'Booking updated' });
  });
};

// Delete booking
exports.deleteBooking = (req, res) => {
  const bookingId = req.params.id;
  const user_id = req.user.id;

  const sql = 'DELETE FROM bookings WHERE id = ? AND user_id = ?';
  db.query(sql, [bookingId, user_id], (err, result) => {
    if (err) {
      console.error('Error deleting booking:', err);
      return res.status(500).json({ message: 'Failed to delete booking' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Booking not found or not yours' });
    }

    res.status(200).json({ message: 'Booking deleted' });
  });
};
