const db = require('../config/db');

// Create a theatre
exports.createTheatre = async (req, res) => {
  const { name, location } = req.body;

  if (!name || !location) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    await db.promise().query(
      'INSERT INTO theatres (name, location) VALUES (?, ?)',
      [name, location]
    );
    res.status(201).json({ message: 'Theatre created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
// List all theatres
exports.getAllTheatres = async (req, res) => {
  try {
    const [theatres] = await db.promise().query('SELECT * FROM theatres');
    res.status(200).json(theatres);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch theatres' });
  }
};

// Get all theatres
exports.getAllTheatres = async (req, res) => {
  try {
    const [rows] = await db.promise().query('SELECT * FROM theatres');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a theatre
exports.updateTheatre = async (req, res) => {
  const { id } = req.params;
  const { name, location } = req.body;

  if (!name || !location) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const [result] = await db.promise().query(
      'UPDATE theatres SET name = ?, location = ? WHERE id = ?',
      [name, location, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Theatre not found' });
    }

    res.status(200).json({ message: 'Theatre updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a theatre
exports.deleteTheatre = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.promise().query(
      'DELETE FROM theatres WHERE id = ?',
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Theatre not found' });
    }

    res.status(200).json({ message: 'Theatre deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
