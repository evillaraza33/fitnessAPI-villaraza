require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');

// Import routes
const userRoutes = require('./routes/userRoutes');
const workoutRoutes = require('./routes/workoutRoutes');

connectDB();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Mount routes ✅ matches screenshot paths exactly
app.use('/users', userRoutes);
app.use('/workouts', workoutRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));