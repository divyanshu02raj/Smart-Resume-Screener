//Loading the environment variables
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const screenRoutes = require('./routes/screen');
const app = express();

// Using the PORT from .env or default port:5000
const PORT = process.env.PORT || 5000;

app.use(cors());

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// connecting to mongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected successfully."))
    .catch(err => console.error("MongoDB connection error:", err));


// Use the screen routes for any request to '/api/screen'
app.use('/api/screen', screenRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});