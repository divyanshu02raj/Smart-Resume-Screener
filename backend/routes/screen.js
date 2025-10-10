const express = require('express');
const router = express.Router();
const multer = require('multer');
const screenController = require('../controllers/screenController');

// Configure multer to store the uploaded file in memory
const upload = multer({ storage: multer.memoryStorage() });

// Define the POST route. 'resume' is the field name for the uploaded file.
router.post('/', upload.single('resume'), screenController.screenResume);

module.exports = router;