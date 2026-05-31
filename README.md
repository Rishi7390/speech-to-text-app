# 🎤 Speech-to-Text Application

A production-ready full-stack Speech-to-Text web application that allows users to record audio directly from the browser, upload audio files, convert speech into text using the Deepgram API, save transcript history in Supabase, and download transcripts.

This project was developed through a structured 14-day development roadmap covering frontend, backend, database integration, testing, deployment, documentation, and release management.

---

# 🚀 Features

## Core Features

* 🎙️ Record audio directly from browser
* 📤 Upload audio files
* 📝 Convert speech to text using Deepgram API
* 📂 Transcript history management
* 💾 Store transcripts in Supabase
* 📥 Download transcript as TXT
* 📋 Copy transcript to clipboard
* 🔊 Audio playback support
* ⏱️ Recording timer
* 📱 Responsive UI
* ⚡ Fast Flask backend API
* 🌐 Full frontend-backend integration

## Production Features

* 🔐 Environment variable security
* 🧪 Automated testing using Pytest
* 🚀 Production deployment support
* 📝 Documentation and changelog
* 🏷️ Release versioning
* 📹 Demo video and GIF

---

# 🛠️ Tech Stack

## Frontend

* React
* Vite
* React Router DOM
* Tailwind CSS
* MediaRecorder API
* Fetch API

## Backend

* Flask
* Flask-CORS
* Python
* Requests
* Pydub
* Python-Dotenv
* Gunicorn

## Database

* Supabase

## Speech-to-Text

* Deepgram API

## Testing

* Pytest

## Deployment

* Render / Railway / VPS
* GitHub Actions (Optional)

---

# 📂 Project Structure

```text
speech-to-text-app/
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── History.jsx
│   │   ├── components/
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── uploads/
│   ├── tests/
│   │   └── test_app.py
│   │
│   ├── app.py
│   ├── requirements.txt
│   ├── Procfile
│   └── .env
│
├── README.md
├── CHANGELOG.md
├── TODO.md
└── .gitignore
```

---

# 🏗️ Architecture

```text
User
 │
 ▼
React Frontend
 │
 ▼
Flask API
 │
 ▼
Deepgram API
 │
 ▼
Transcript
 │
 ├── Save to Supabase
 │
 ├── Display on UI
 │
 └── Download TXT
```

---

# ⚙️ Local Installation

## Clone Repository

```bash
git clone https://github.com/Rishi7390/speech-to-text-app.git

cd speech-to-text-app
```

---

# 📦 Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# ⚙️ Backend Setup

```bash
cd backend
```

Create Virtual Environment

```bash
python -m venv venv
```

Activate Environment

Windows

```bash
venv\Scripts\activate
```

Install Requirements

```bash
pip install -r requirements.txt
```

Run Backend

```bash
python app.py
```

Backend:

```text
http://localhost:5000
```

---

# 🔐 Environment Variables

Create a `.env` file inside backend folder.

```env
DEEPGRAM_API_KEY=your_api_key

SUPABASE_URL=your_supabase_url

SUPABASE_KEY=your_supabase_key
```

---

# 🎧 Application Flow

```text
User Records Audio
        │
        ▼
Frontend Creates Audio Blob
        │
        ▼
Upload to Flask Backend
        │
        ▼
Deepgram Transcription API
        │
        ▼
Transcript Generated
        │
 ┌──────┴──────┐
 ▼             ▼
Save        Display
to DB       on UI
 │
 ▼
Download TXT
```

---

# 🌐 API Endpoints

## Health Check

```http
GET /
```

Response

```json
{
  "message": "Backend running successfully"
}
```

---

## Transcribe Audio

```http
POST /transcribe
```

Response

```json
{
  "transcript": "Hello everyone welcome to the project"
}
```

---

## Get Transcripts

```http
GET /transcripts
```

---

## Get Transcript By ID

```http
GET /transcripts/:id
```

---

# 🧪 Testing

Run Backend Tests

```bash
pytest
```

or

```bash
python -m pytest
```

---

# ✅ Tested Features

* Audio Recording
* Audio Upload
* Deepgram Integration
* Transcript Storage
* Transcript History
* Audio Playback
* Download TXT
* Error Handling
* API Testing
* Responsive UI

---

# 🌍 Browser Compatibility

Successfully tested on:

* Google Chrome
* Microsoft Edge
* Mozilla Firefox

---

# 🚀 Deployment

## Backend

Production Command

```bash
gunicorn app:app --bind 0.0.0.0:$PORT
```

## Frontend

Build Application

```bash
npm run build
```

Production Environment Variable

```env
VITE_API_URL=https://your-backend-url.com
```

---

# 📹 Demo

## Demo Flow

```text
Record Audio
    ↓
Upload Audio
    ↓
Generate Transcript
    ↓
View Transcript
    ↓
Download Transcript
```

Files:

```text
demo.mp4
demo.gif
```

---

# 📥 Export Features

* Download transcript as TXT
* Copy transcript to clipboard

---

# 🔒 Security Features

* Environment variables
* Hidden API keys
* Secure backend communication
* Git ignored secrets
* Input validation

---

# 📈 Development Roadmap (Day 1 – Day 14)

### Days 1–3

* Project setup
* Flask backend initialization
* React frontend setup

### Days 4–6

* Audio recording implementation
* MediaRecorder integration

### Days 7–8

* Deepgram API integration
* Audio processing pipeline

### Days 9–10

* Supabase integration
* Transcript storage

### Days 11–12

* Testing
* Error handling
* UI improvements

### Day 13

* Production deployment
* Environment configuration
* Build optimization

### Day 14

* Documentation
* Architecture diagram
* Demo creation
* Changelog
* Release versioning

---

# 📄 Changelog

## Version 1.0.0

### Added

* Audio Recording
* Audio Upload
* Speech-to-Text Conversion
* Transcript History
* Supabase Integration
* Download TXT
* Clipboard Support
* Automated Testing
* Production Deployment

---

# 📌 Future Enhancements

* Speaker Diarization
* AI Summarization
* Translation Support
* Real-time Streaming
* Authentication
* Transcript Search
* Cloud Storage
* PDF/DOCX Export
* Multi-language Support

---

# 👨‍💻 Author

Rohit

GitHub:
https://github.com/Rishi7390

---

# 🏷️ Release

Current Release:

```text
v1.0.0
```

Initial Production Release.

---

# 📜 License

This project is developed for educational, learning, and portfolio purposes.
