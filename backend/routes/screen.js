const express = require('express');
const router = express.Router();
const multer = require('multer');
const screenController = require('../controllers/screenController');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/', upload.array('resumes', 10), screenController.screenResume); 
router.post('/report', screenController.generateReport);

module.exports = router;