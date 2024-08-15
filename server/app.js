const express = require("express");
const app = express();
const cors = require("cors");
const createBooking = require("./route/bookingRoute");
// Middleware
app.use(cors("*")); // Allow cross-origin requests
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.use("/api/v1", createBooking);

// Error handler
app.all("*", (req, res) => {
  res.status(404).send("Not Found");
});
app.use(require("./error/errorMiddelware"));

module.exports = app;
