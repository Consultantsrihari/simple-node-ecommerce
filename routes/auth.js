const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

// GET /auth/login
router.get('/login', authController.getLogin);

// POST /auth/login
router.post('/login', authController.postLogin);

// GET /auth/signup
router.get('/signup', authController.getSignup);

// POST /auth/signup
router.post('/signup', authController.postSignup);

// POST /auth/logout
router.post('/logout', authController.postLogout); // Use POST for logout for CSRF protection

module.exports = router;
