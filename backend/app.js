require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const limiter = require("./middleware/rateLimit");
const analysisRoutes = require("./routes/analysisRoutes");

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({ origin: "*", methods: ["GET", "POST"] }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(limiter);

// Routes
app.use("/api", analysisRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("⚽ Football Fake News Detector API is running!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

module.exports = app;
