// server.js

require("dotenv").config();
const app = require("./app");
const PORT = process.env.APP_PORT || 5000;

// Simple HTTP server (no HTTPS needed)
app.listen(PORT, () => {
  console.log(`PulseBoard API Server running on port ${PORT}`);
});
