const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Function to fetch the analysis result from the backend
export const analyzeText = async (text) => {
  try {
    const response = await fetch(`${API_URL}/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

// Function to fetch analysis history
export const fetchHistory = async () => {
  try {
    const response = await fetch(`${API_URL}/history`);

    if (!response.ok) {
      throw new Error("Failed to fetch history");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching history:", error);
    return [];
  }
};
