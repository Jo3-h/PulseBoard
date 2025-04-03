// controllers/githubController.js

const logger = require("../config/logger");

// Import github models
const Github_activity = require("../models/github_activity");

// Define Controller Functions

// Function to retrieve github activity data
const getGithubActivity = async (req, res) => {
  try {
    const activities = await Github_activity.findAll();
    res.status(200).json(activities);
  } catch (error) {
    logger.error(`Error fetching github activity: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getGithubActivity,
};
