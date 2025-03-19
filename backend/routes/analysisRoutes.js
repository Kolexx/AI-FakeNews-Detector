const express = require("express");
const { analyzeText, getHistory } = require("../controllers/analysisController");

const router = express.Router();

router.post("/analyze", analyzeText);
router.get("/history", getHistory);

module.exports = router;
