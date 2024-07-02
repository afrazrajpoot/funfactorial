const express = require("express");
const app = express();
const cors = require("cors");

// middeleware

app.use(cors("*")); // allow cross-origin requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/v1", require("./route/bookingRoute"));
// error handler
app.all("*", (req, res) => {
  res.status(404).send("Not Found");
});
app.use(require("./error/errorMiddelware"));
module.exports = app;
