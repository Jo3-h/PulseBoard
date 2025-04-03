// routes/githubRoutes.js

const express = require("express");
const router = express.Router();

// Import controllers
const { getGithubActivity } = require("../controllers/githubController");

// Define endpoints
router.get("/activity", getGithubActivity);

// Export router
module.exports = router;
