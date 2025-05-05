// server.js

require("dotenv").config();
const app = require("./app");
const https = require("https");
const fs = require("fs");
const PORT = process.env.APP_PORT || 5000;

// try building the server with https otherwise run with http
try {
  // Read SSL certificate files
  const privateKey = fs.readFileSync(
    "/etc/letsencrypt/live/pulseboardapp.com/privkey.pem",
    "utf8"
  );
  const certificate = fs.readFileSync(
    "/etc/letsencrypt/live/pulseboardapp.com/cert.pem",
    "utf8"
  );
  const ca = fs.readFileSync(
    "/etc/letsencrypt/live/pulseboardapp.com/chain.pem",
    "utf8"
  );

  // create HTTPS server
  const credentials = { key: privateKey, cert: certificate, ca: ca };

  const server = https.createServer(credentials, app);

  // Start the app
  server.listen(PORT, () => {
    console.log(`PulseBoard HTTPs API Server running on port ${PORT}`);
  });
} catch (error) {
  console.warn("\x1b[31m%s\x1b[0m", "Failed to read SSL certificate");
  app.listen(PORT, () => {
    console.log(`PulseBoard HTTP API Server running on port ${PORT}`);
  });
}
