// Get backend URL from environment variables
const API_URL = import.meta.env.VITE_API_URL;

// Function to fetch data from backend
export const detectFakeNews = async (text) => {
    try {
        const response = await fetch(`${API_URL}/api/detect`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text }),
        });
        return await response.json();
    } catch (error) {
        console.error("Error detecting fake news:", error);
        return null;
    }
};

