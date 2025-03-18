import { useState, useEffect } from "react";
import { analyzeText, fetchHistory } from "./api";

export default function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      const pastResults = await fetchHistory();
      setHistory(pastResults);
    };
    loadHistory();
  }, []);

  const handleAnalyze = async () => {
    if (!text.trim()) return;

    setResult("Analyzing...");
    const response = await analyzeText(text);

    if (response) {
      setResult(`Prediction: ${response.prediction} (Confidence: ${response.confidence.toFixed(2)})`);
      setHistory((prev) => [response, ...prev]);
    } else {
      setResult("Error analyzing text.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Fake News Detector</h1>
        
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Enter news text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        <button 
          className="w-full bg-blue-500 text-white py-2 rounded mt-2 hover:bg-blue-600"
          onClick={handleAnalyze}
        >
          Analyze
        </button>

        {result && <p className="mt-4 text-center font-semibold">{result}</p>}

        <h2 className="mt-6 text-lg font-semibold">Past Analyses</h2>
        <ul className="mt-2 space-y-2">
          {history.map((item, index) => (
            <li key={index} className="bg-gray-200 p-2 rounded">
              {item.text} - <strong>{item.prediction}</strong> ({item.confidence.toFixed(2)})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
