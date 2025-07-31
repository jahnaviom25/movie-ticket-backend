// controllers/user.controller.js
const db = require('../config/db');

exports.getAllUsers = (req, res) => {
  const sql = 'SELECT id, name, email, role FROM users';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ message: 'Failed to fetch users' });
    }
    res.status(200).json(results);
  });
};
