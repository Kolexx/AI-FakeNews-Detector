const { HfInference } = require("@huggingface/inference");
const Analysis = require("../models/analysis");

const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

// Analyze Text
const analyzeText = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "No text provided" });

    console.log("Analyzing text:", text);

    // Call Hugging Face API
    const response = await hf.request({
      model: "facebook/bart-large-mnli",
      inputs: text,
      parameters: {
        candidate_labels: ["real", "fake"],
      },
    });

    console.log("API Response:", JSON.stringify(response, null, 2));

    if (!response.labels || !response.scores) {
      throw new Error("Unexpected API response format");
    }

    const prediction = response.labels[0];
    const confidence = response.scores[0];

    // Save to database
    const result = new Analysis({ text, prediction, confidence });
    await result.save();

    res.json({ prediction, confidence });
  } catch (error) {
    console.error("Analysis Error:", error);
    res.status(500).json({ error: "An error occurred while analyzing text" });
  }
};

// Get Analysis History
const getHistory = async (req, res) => {
  try {
    const history = await Analysis.find().sort({ _id: -1 }).limit(10);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch history" });
  }
};

module.exports = { analyzeText, getHistory };
