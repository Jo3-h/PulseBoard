// routes/eventRoutes.js

const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventController");

router.get("/event-calendar", eventController.getEventSummary);

module.exports = router;
