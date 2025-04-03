// controllers/leetcodeController.js
const logger = require("../config/logger");

// Import leetcode models
const Leetcode_activity = require("../models/leetcode_activity");
const Leetcode_badges = require("../models/leetcode_badges");
const Leetcode_calendar = require("../models/leetcode_calendar");
const Leetcode_summary = require("../models/leetcode_summary");

// Define controller functions

// Function to retrieve leetcode activity data
const getLeetcodeActivity = async (req, res) => {
  try {
    const activities = await Leetcode_activity.findAll();
    res.status(200).json(activities);
  } catch (error) {
    logger.error(`Error fetching leetcode activity: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to retrieve leetcode badges data
const getLeetcodeBadges = async (req, res) => {
  try {
    const badges = await Leetcode_badges.findAll();
    res.status(200).json(badges);
  } catch (error) {
    logger.error(`Error fetching leetcode badges: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to retrieve leetcode calendar data
const getLeetcodeCalendar = async (req, res) => {
  try {
    const calendars = await Leetcode_calendar.findAll();
    res.status(200).json(calendars);
  } catch (error) {
    logger.error(`Error fetching leetcode calendar: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to retrieve leetcode summary data
const getLeetcodeSummary = async (req, res) => {
  try {
    const summaries = await Leetcode_summary.findAll();
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
