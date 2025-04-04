// /app.js

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const logger = require("./config/logger");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(
  morgan("combined", { stream: { write: (msg) => logger.info(msg.trim()) } })
);
app.use((err, req, res, next) => {
  logger.error(`Error occurred: ${err.message}`);
  res.status(500).send("Internal Server Error");
});

// Import Routes
const githubRoutes = require("./routes/githubRoutes");
const leetcodeRoutes = require("./routes/leetcodeRoutes");
const stravaRoutes = require("./routes/stravaRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

// Use Routes
app.use("/api/github", githubRoutes);
app.use("/api/leetcode", leetcodeRoutes);
app.use("/api/strava", stravaRoutes);
app.use("/api/resume", resumeRoutes);

// Export the app
module.exports = app;
