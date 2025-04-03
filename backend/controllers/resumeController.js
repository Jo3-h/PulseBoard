// controllers/resumeController.js

const logger = require("../config/logger");

// Import necessary models
const Education = require("../models/education");
const Experience = require("../models/experience");
const Projects = require("../models/projects");
const References = require("../models/references");

// Function to retrieve education data
const getEducation = async (req, res) => {
  try {
    const education = await Education.findAll();
    res.status(200).json(education);
  } catch (error) {
    logger.error(`Error fetching education data: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to retrieve experience data
const getExperience = async (req, res) => {
  try {
    const experience = await Experience.findAll();
    res.status(200).json(experience);
  } catch (error) {
    logger.error(`Error fetching experience data: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to retrieve projects data
const getProjects = async (req, res) => {
  try {
    const projects = await Projects.findAll();
    res.status(200).json(projects);
  } catch (error) {
    logger.error(`Error fetching projects data: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to retrieve references data
const getReferences = async (req, res) => {
  try {
    const references = await References.findAll();
    res.status(200).json(references);
  } catch (error) {
    logger.error(`Error fetching references data: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getEducation,
  getExperience,
  getProjects,
  getReferences,
};
