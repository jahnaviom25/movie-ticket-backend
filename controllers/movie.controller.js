const db = require('../config/db');


// Create a new movie
exports.createMovie = (req, res) => {
  const { title, description, duration } = req.body;

  if (!title || !description || !duration) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sql = 'INSERT INTO movies (title, description, duration) VALUES (?, ?, ?)';
  db.query(sql, [title, description, duration], (err, result) => {
    if (err) {
      console.error('Error adding movie:', err);
      return res.status(500).json({ message: 'Failed to add movie' });
    }

    res.status(201).json({
      message: 'Movie added successfully',
      movieId: result.insertId
    });
  });
};
// List all movies
exports.getAllMovies = async (req, res) => {
  try {
    const [movies] = await db.promise().query('SELECT * FROM movies');
    res.status(200).json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch movies' });
  }
};


// Get all movies
exports.getAllMovies = (req, res) => {
  const sql = 'SELECT * FROM movies';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching movies:', err);
      return res.status(500).json({ message: 'Failed to fetch movies' });
    }

    res.status(200).json(results);
  });
};

// Get a single movie by ID
exports.getMovieById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM movies WHERE id = ?';

  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error fetching movie:', err);
      return res.status(500).json({ message: 'Failed to fetch movie' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.status(200).json(results[0]);
  });
};

// Update a movie
exports.updateMovie = (req, res) => {
  const { id } = req.params;
  const { title, description, duration } = req.body;

  if (!title || !description || !duration) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const sql = 'UPDATE movies SET title = ?, description = ?, duration = ? WHERE id = ?';
  db.query(sql, [title, description, duration, id], (err, result) => {
    if (err) {
      console.error('Error updating movie:', err);
      return res.status(500).json({ message: 'Failed to update movie' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.status(200).json({ message: 'Movie updated successfully' });
  });
};

// Delete a movie
exports.deleteMovie = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM movies WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting movie:', err);
      return res.status(500).json({ message: 'Failed to delete movie' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.status(200).json({ message: 'Movie deleted successfully' });
  });
};
