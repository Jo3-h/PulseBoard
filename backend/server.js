// server.js

require("dotenv").config();
const app = require("./app");
const PORT = process.env.API_PORT || 5000;

// Start the app
app.listen(PORT, () => {
  console.log(`PulseBoard API Server running on port ${PORT}`);
});
