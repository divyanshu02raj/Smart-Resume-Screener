const express = require('express');
const router = express.Router();
const { signupUser, loginUser, getMe, googleAuth, googleCallback } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/signup', signupUser);
router.post('/login', loginUser);

router.get('/me', protect, getMe);

router.get('/google', googleAuth);
router.get('/google/callback', googleCallback);

module.exports = router;