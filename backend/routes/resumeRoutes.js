// routes/resumeRoutes.js

const express = require("express");
const router = express.Router();

// Import controllers
const {
  getEducation,
  getExperience,
  getProjects,
  getReferences,
} = require("../controllers/resumeController");

// Define endpoints
router.get("/education", getEducation);
router.get("/experience", getExperience);
router.get("/projects", getProjects);
router.get("/references", getReferences);

// Export router
module.exports = router;
