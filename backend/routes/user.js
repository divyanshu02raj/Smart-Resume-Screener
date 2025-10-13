const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware'); 

router.post('/signup', userController.signupUser);
router.post('/login', userController.loginUser);

router.get('/me', protect, userController.getMe);

module.exports = router;