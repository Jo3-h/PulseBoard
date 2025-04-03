// routes/leetcodeRoutes.js

const express = require("express");
const router = express.Router();

// Import controllers
const {
  getLeetcodeActivity,
  getLeetcodeBadges,
  getLeetcodeCalendar,
  getLeetcodeSummary,
} = require("../controllers/leetcodeController");

// Define endpoints
router.get("/activity", getLeetcodeActivity);
router.get("/badges", getLeetcodeBadges);
router.get("/calendar", getLeetcodeCalendar);
router.get("/summary", getLeetcodeSummary);

// Export router
module.exports = router;
