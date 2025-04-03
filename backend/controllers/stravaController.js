// controllers/stravaController.js

const logger = require("../config/logger");

// Import strava models
const Strava_activity = require("../models/strava_activity");

// Define controller functions

// Function to retrieve strava activity data
const getStravaActivity = async (req, res) => {
  try {
    const activities = await Strava_activity.findAll();
    res.status(200).json(activities);
  } catch (error) {
    logger.error(`Error fetching strava activity: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Export controller
module.exports = {
  getStravaActivity,
};
