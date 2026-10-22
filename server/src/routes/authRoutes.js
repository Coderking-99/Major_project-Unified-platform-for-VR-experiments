const express = require('express');
const router = express.Router();
const { login, getCurrentUser, changePassword } = require('../controllers/authController');
const { authenticate } = require('../middleware/auth');

router.post('/login', login);
router.get('/me', authenticate, getCurrentUser);
router.post('/change-password', authenticate, changePassword);

module.exports = router;
