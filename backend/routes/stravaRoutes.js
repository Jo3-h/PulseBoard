// routes/stravaRoutes.js

const express = require("express");
const router = express.Router();

// Import controllers
const { getStravaActivities } = require("../controllers/stravaController");

// Define endpoints
router.get("/activity", getStravaActivities);

// Export router
module.exports = router;
