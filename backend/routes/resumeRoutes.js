// routes/resumeRoutes.js

const express = require("express");
const router = express.Router();

// Import controllers
const { getResume } = require("../controllers/resumeController");

// Define endpoints
router.get("/", getResume);

// Export router
module.exports = router;
