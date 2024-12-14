const express = require("express");
const app = express();

// Logging Middleware
app.use((req, res, next) => {
  const start = Date.now(); // Start time of the request
  const { method, url } = req;
  const timestamp = new Date().toISOString(); // Current timestamp

  // Log incoming request details
  console.log({
    timestamp,
    method,
    url,
    statusCode: null, // Will be set after the response finishes
    duration: null, // Will be set after the response finishes
  });

  // Log the time taken after the response is sent
  res.on("finish", () => {
    const duration = Date.now() - start; // Calculate processing time
    console.log({
      timestamp,
      method,
      url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
    });
  });

  next(); // Pass control to the next middleware or route
});

// Routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/test", (req, res) => {
  res.send("This is a test route.");
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log("Logging middleware by: Praveen");
});
