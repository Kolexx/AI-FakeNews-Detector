const mongoose = require("mongoose");

const AnalysisSchema = new mongoose.Schema({
  text: { type: String, required: true },
  prediction: { type: String, required: true },
  confidence: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Analysis", AnalysisSchema);
