# 🎤 Speech-to-Text Application

A full-stack Speech-to-Text web application that records audio directly from the browser, converts speech into text using the Deepgram API, and stores transcript history using Supabase.

The application provides real-time transcription, audio recording, transcript history management, export features, and a responsive modern UI.

---

# 🚀 Features

* 🎙️ Real-time audio recording
* 📝 Speech-to-text transcription using Deepgram API
* 📂 Transcript history management
* 💾 Save transcripts to Supabase database
* 📥 Download transcript as `.txt`
* 📋 Copy transcript to clipboard
* 🔊 Audio playback support
* ⏱️ Recording timer
* 📱 Responsive UI design
* 🌐 Frontend and backend integration
* 🔐 Environment variable security using `.env`
* ⚡ Fast Flask backend API
* 🎨 Modern React frontend

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

## Database

* Supabase

## Speech-to-Text Provider

* Deepgram API

---

# 📂 Project Structure

```bash
speech-to-text-app/
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── History.jsx
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
│   └── .env
│
├── README.md
└── .gitignore
```

---

# 🖥️ Application Screens

## 🎙️ Recorder Screen

```text
 -------------------------------------------------
|             Speech to Text App                  |
 -------------------------------------------------
|                                                 |
|         [ Start Recording Button ]              |
|                                                 |
|         Live Transcript:                        |
|         --------------------------------        |
|         Hello everyone welcome to...            |
|         --------------------------------        |
|                                                 |
 -------------------------------------------------
```

---

## 📂 Transcript History Screen

```text
 -------------------------------------------------
|             Transcript History                  |
 -------------------------------------------------
| 1. Meeting Notes - Today                        |
| 2. Lecture Recording - Yesterday                |
| 3. Voice Memo                                   |
|                                                 |
 -------------------------------------------------
```

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/Rishi7390/speech-to-text-app.git
```

---

# 📦 Frontend Setup

## Move to frontend

```bash
cd frontend
```

## Install dependencies

```bash
npm install
```

## Run frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# ⚙️ Backend Setup

## Move to backend

```bash
cd backend
```

## Create virtual environment

```bash
py -3.12 -m venv venv
```

## Activate virtual environment

### Windows

```bash
venv\Scripts\activate
```

---

## Install dependencies

```bash
pip install flask flask-cors python-dotenv pydub requests supabase pytest
```

---

## Run backend

```bash
python app.py
```

Backend runs on:

```bash
http://localhost:5000
```

---

# 🔐 Environment Variables

Create a `.env` file inside `backend/`

```env
DEEPGRAM_API_KEY=your_deepgram_api_key

SUPABASE_URL=https://your-project.supabase.co

SUPABASE_KEY=your_supabase_publishable_key
```

---

# 🎧 Audio Processing Flow

```text
User Speaks
↓
Frontend Records Audio
↓
Audio Blob Created
↓
Frontend Sends Audio to Flask
↓
Flask Converts Audio to WAV
↓
Flask Sends Audio to Deepgram
↓
Deepgram Returns Transcript
↓
Transcript Saved to Supabase
↓
Frontend Displays Transcript
```

---

# 🌐 API Endpoints

## Home Route

```http
GET /
```

### Response

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

### Request

Multipart form-data with audio file.

### Response

```json
{
  "transcript": "Hello everyone welcome to the project"
}
```

---

## Get All Transcripts

```http
GET /transcripts
```

---

## Get Single Transcript

```http
GET /transcripts/:id
```

---

# 🧪 Testing & QA

## Backend Testing

Pytest is used for backend API testing.

### Run tests

```bash
pytest
```

or

```bash
python -m pytest
```

---

# ✅ Tested Features

* Audio recording
* Speech transcription
* Transcript saving
* Transcript history
* Audio playback
* File validation
* Large file handling
* Error handling
* API integration
* Responsive UI

---

# 🌍 Browser Testing

Successfully tested on:

* Google Chrome
* Microsoft Edge
* Mozilla Firefox

---

# 🔒 Security Features

* `.env` file protection
* API key hiding
* `.gitignore` configuration
* Secure backend requests

---

# 📥 Export Features

* Copy transcript to clipboard
* Download transcript as `.txt`

---

# 📌 Future Improvements

* Real-time streaming transcription
* Speaker identification
* Transcript timestamps
* Authentication system
* Multi-language transcription
* DOCX/PDF export
* Cloud audio storage

---

# 👨‍💻 Author

## Rohit

GitHub:
https://github.com/Rishi7390

---

# 📄 License

This project is developed for learning and educational purposes.
