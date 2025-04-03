// controllers/leetcodeController.js
const logger = require("../config/logger");

// Import leetcode models
const { leetcode_activity } = require("../models");
const { leetcode_badges } = require("../models");
const { leetcode_calendar } = require("../models");
const { leetcode_summary } = require("../models");

// Define controller functions

// Function to retrieve leetcode activity data
const getLeetcodeActivity = async (req, res) => {
  try {
    const activities = await leetcode_activity.findAll();
    res.status(200).json(activities);
  } catch (error) {
    logger.error(`Error fetching leetcode activity: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to retrieve leetcode badges data
const getLeetcodeBadges = async (req, res) => {
  try {
    const badges = await leetcode_badges.findAll();
    res.status(200).json(badges);
  } catch (error) {
    logger.error(`Error fetching leetcode badges: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to retrieve leetcode calendar data
const getLeetcodeCalendar = async (req, res) => {
  try {
    const calendars = await leetcode_calendar.findAll();
    res.status(200).json(calendars);
  } catch (error) {
    logger.error(`Error fetching leetcode calendar: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to retrieve leetcode summary data
const getLeetcodeSummary = async (req, res) => {
  try {
    const summaries = await leetcode_summary.findAll();
    res.status(200).json(summaries);
  } catch (error) {
    logger.error(`Error fetching leetcode summary: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Export controller
module.exports = {
  getLeetcodeActivity,
  getLeetcodeBadges,
  getLeetcodeCalendar,
  getLeetcodeSummary,
};
