// controllers/eventController.js

const { sequelize } = require("../models");
const logger = require("../config/logger");
const { eachDayOfInterval, format, parseISO } = require("date-fns");

const getEventSummary = async (req, res) => {
  try {
    const query = `
      SELECT activity_date, leetcode, github, strava, total
      FROM activity_calendar_view
      ORDER BY activity_date ASC;
    `;
    const [results] = await sequelize.query(query);

    if (!results.length) {
      return res.json([]); // No events, return empty array
    }

    // Find the first activity date
    const firstDate = parseISO(results[0].activity_date);
    const today = new Date();

    // Generate all dates between first event and today
    const allDates = eachDayOfInterval({ start: firstDate, end: today });

    // Turn existing data into a map for fast lookup
    const dataMap = new Map(
      results.map((event) => [
        format(parseISO(event.activity_date), "yyyy-MM-dd"),
        {
          activity_date: format(parseISO(event.activity_date), "yyyy-MM-dd"),
          leetcode: parseInt(event.leetcode, 10),
          github: parseInt(event.github, 10),
          strava: parseInt(event.strava, 10),
          total: parseInt(event.total, 10),
        },
      ])
    );

    // Fill in missing dates with 0s
    const fullData = allDates.map((date) => {
      const dateString = format(date, "yyyy-MM-dd");
      if (dataMap.has(dateString)) {
        return dataMap.get(dateString);
      } else {
        return {
          activity_date: dateString,
          leetcode: 0,
          github: 0,
          strava: 0,
          total: 0,
        };
      }
    });

    res.json(fullData);
  } catch (error) {
    logger.error(`Error fetching event summary: ${error.message}`);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getEventSummary,
};
