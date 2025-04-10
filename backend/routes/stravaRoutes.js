// routes/stravaRoutes.js

const express = require("express");
const router = express.Router();

// Import controllers
const { getStravaActivities } = require("../controllers/stravaController");

// Define endpoints
router.get("/activities", getStravaActivities);

// Export router
module.exports = router;
