const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/auth.routes');
const movieRoutes = require('./routes/movie.routes'); // <-- 👈 Add this
const theatreRoutes = require('./routes/theatre.routes');
const bookingRoutes = require('./routes/booking.routes');
const userRoutes = require('./routes/user.routes'); // 👈 add this





app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes); // <-- 👈 Add this
app.use('/api/theatres', theatreRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes); // 👈 add this


// Default route
app.get('/', (req, res) => {
  res.send('Movie Ticket Booking API is running...');
});

module.exports = app;
