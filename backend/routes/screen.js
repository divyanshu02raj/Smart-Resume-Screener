const express = require('express');
const router = express.Router();
const multer = require('multer');
const screenController = require('../controllers/screenController');
const { protect } = require('../middleware/authMiddleware'); 

const upload = multer({ storage: multer.memoryStorage() });

router.get('/', protect, screenController.getScreeningHistory);
router.post('/', protect, upload.array('resumes', 10), screenController.screenResume);
router.post('/report', protect, screenController.generateReport);

module.exports = router;