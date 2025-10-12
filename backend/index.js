require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const screenRoutes = require('./routes/screen');
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected successfully."))
    .catch(err => console.error("MongoDB connection error:", err));

app.use('/api/screen', screenRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});