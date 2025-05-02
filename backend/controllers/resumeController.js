// controllers/resumeController.js

const logger = require("../config/logger");

// Import necessary models
const { education, experience, projects, references } = require("../models");

// Function to retrieve education data
const getEducation = async (req, res) => {
  try {
    const education_data = await education.findAll({
      order: [["priority", "DESC"]],
    });
    res.status(200).json(education_data);
  } catch (error) {
    logger.error(`Error fetching education data: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to retrieve experience data
const getExperience = async (req, res) => {
  try {
    const experience_data = await experience.findAll({
      order: [["priority", "DESC"]],
    });
    res.status(200).json(experience_data);
  } catch (error) {
    logger.error(`Error fetching experience data: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to retrieve projects data
const getProjects = async (req, res) => {
  try {
    const projects_data = await projects.findAll({
      order: [["priority", "DESC"]],
    });
    res.status(200).json(projects_data);
  } catch (error) {
    logger.error(`Error fetching projects data: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Function to retrieve references data
const getReferences = async (req, res) => {
  try {
    const references_data = await references.findAll();
    res.status(200).json(references_data);
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
