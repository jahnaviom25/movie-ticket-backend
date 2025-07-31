// routes/user.routes.js
const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');

// Admin-only: Get all users
router.get('/', authenticate, authorize(['admin']), userController.getAllUsers);

module.exports = router;
