# AI Fake News Detector

## Overview
The **AI Fake News Detector** is a full-stack web application designed to analyze and detect fake news articles, specifically in the football (soccer) domain. Using Natural Language Processing (NLP) models from Hugging Face, the system classifies news articles as either **real** or **fake**, providing confidence scores.

This project is built with:
- **Frontend**: React.js with Tailwind CSS
- **Backend**: Node.js with Express
- **Database**: MongoDB (via MongoDB Atlas or local Docker instance)
- **AI Model**: Hugging Face Transformers (BERT/RoBERTa-based models)

## Features
- 📰 **Fake News Detection**: Classifies football-related news articles.
- 📊 **Analysis History**: Stores and retrieves past analyses.
- 🔐 **Secure API**: Includes rate limiting, authentication (planned), and input sanitization.
- 🛠 **Easy Deployment**: Can be containerized using Docker.

---

## Codebase Structure
```plaintext
backend/
├── config/          # Database connection and environment setup
├── controllers/     # Logic for handling API requests
├── middleware/      # Security and rate-limiting functions
├── models/         # MongoDB schemas
├── routes/         # Express API routes
├── app.js          # Main entry point for the backend server
├── package.json    # Backend dependencies
frontend/
├── src/
│   ├── components/  # Reusable UI components
│   ├── pages/       # Page-level components
│   ├── api/         # API calls to the backend
│   ├── App.js       # Main React component
│   ├── index.js     # React entry point
├── public/          # Static assets
├── package.json     # Frontend dependencies
```

---

## Running the Project Locally

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v18 or later)
- **MongoDB** (Local or Atlas instance)
- **Docker** (Optional, for containerized setup)
- **Hugging Face API Key** (Get it from [Hugging Face](https://huggingface.co/))

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Kolexx/AI-FakeNews-Detector
cd AI-FakeNews-Detector
```

### 2️⃣ Backend Setup
Navigate to the `backend` folder:
```bash
cd backend
npm install
```

Create a **.env** file:
```plaintext
PORT=5000
MONGODB_URI=your_db_url
HUGGINGFACE_API_KEY=your_huggingface_api_key
```

Start the backend server:
```bash
npm start
```
Or using **nodemon** (recommended for development):
```bash
npm run dev
```

### 3️⃣ Frontend Setup
Navigate to the `frontend` folder:
```bash
cd ../frontend
npm install
```

Create a **.env** file:
```plaintext
REACT_APP_API_URL=http://localhost:5000/api
```

Start the frontend:
```bash
npm start
```

Your app will be running on: **http://localhost:3000**

---

## API Endpoints
### 🔹 Analyze News Article
**POST** `/api/analyze`
#### Request Body:
```json
{
  "text": "Cristiano Ronaldo joins Manchester United for a world-record fee."
}
```
#### Response:
```json
{
  "prediction": "real",
  "confidence": 0.87
}
```

### 🔹 Get Analysis History
**GET** `/api/history`
#### Response:
```json
[
  {
    "text": "Cristiano Ronaldo joins Manchester United.",
    "prediction": "real",
    "confidence": 0.87,
    "date": "2025-03-22T12:00:00.000Z"
  }
]
```

---

## Contributing
Contributions are welcome! If you find a bug or have a feature request, please open an issue or a pull request.

---

## Getting Help
If you run into any issues:
- Contact the maintainer via **email** (koredesolomon07@gmail.com)


---

⭐ **Star this repo if you found it useful!**

