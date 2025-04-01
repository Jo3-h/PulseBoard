// /app.js

const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Import Routes
const githubRoutes = require('routes/githubRoutes');
const leetcodeRoutes = require('routes/leetcodeRoutes');
const stravaRoutes = require('routes/stravaRoutes');

// Use Routes
app.use('/api/github', githubRoutes);
app.use('/api/leetcode', leetcodeRoutes);
app.use('/api/strava', stravaRoutes);

// Export the app
module.exports = app;