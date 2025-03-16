require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { HfInference } = require("@huggingface/inference"); // Change this line
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");




// Initialize Express app
const app = express();
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY); // This should now work


// Middleware
app.use(cors({ origin: "*", methods: ["GET", "POST"] }));
app.use(bodyParser.json());
app.use(morgan("dev"));

// Rate Limiting - Prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: "Too many requests, please try again later",
});
app.use(limiter);

// Connect to MongoDB
const mongooseURI = process.env.MONGODB_URI || "mongodb://localhost:27017/fakeNewsDB";
mongoose
  .connect(mongooseURI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Define Schema & Model
const AnalysisSchema = new mongoose.Schema({
  text: String,
  prediction: String,
  confidence: Number,
  date: { type: Date, default: Date.now },
});

const Analysis = mongoose.model("Analysis", AnalysisSchema);

// Routes
app.get("/", (req, res) => {
  res.send("⚽ Football Fake News Detector API is running!");
});

// Analyze News Route
// Analyze News Route
// Analyze News Route
app.post("/analyze", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "No text provided" });

    console.log("Analyzing text:", text);

    // Call Hugging Face API using the more flexible 'request' method
    const response = await hf.request({
      model: "facebook/bart-large-mnli",
      inputs: text,
      parameters: {
        candidate_labels: ["real", "fake"]
      }
    });

    console.log("API Response:", JSON.stringify(response, null, 2));

    // Assuming the response contains the classification results
    let prediction, confidence;

    if (response && response.labels && response.scores) {
      prediction = response.labels[0];
      confidence = response.scores[0];
    } else {
      throw new Error("Unexpected API response format");
    }

    const result = new Analysis({
      text,
      prediction,
      confidence,
    });

    await result.save(); // Save to MongoDB

    res.json({ prediction, confidence });
  } catch (error) {
    console.error("Analysis Error:", error);
    res.status(500).json({ error: "An error occurred while analyzing text" });
  }
});

// Get Past Analysis History
app.get("/history", async (req, res) => {
  try {
    const history = await Analysis.find().sort({ _id: -1 }).limit(10);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch history" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

