Screen 1 — Recorder + Live Transcript
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

 Screen 2 — Transcript History
 -------------------------------------------------
|             Transcript History                  |
 -------------------------------------------------
| 1. Meeting Notes - Today                        |
| 2. Lecture Recording - Yesterday                |
| 3. Voice Memo                                   |
|                                                 |
 -------------------------------------------------

 # Speech-to-Text Application

## Tech Stack
- Next.js
- Tailwind CSS
- Flask
- Deepgram API

## Features
- Real-time speech recognition
- Live transcript display
- Transcript history
- Audio upload support

## Project Structure

/frontend → Next.js frontend
/backend → Flask backend

## Wireframes

### Recorder Screen
(Add image/sketch)

### History Screen
(Add image/sketch)

## Day 2 Progress

### Completed UI Components
- Header
- Recorder Panel
- Transcript Panel

### Pages Created
- Home Page (/)
- History Page (/history)

### Features Added
- Start button
- Stop button
- Transcript placeholder
- React state setup

### Styling
- Tailwind CSS integrated
- Responsive layout added


---
## Day 3 — Client-side Audio Recording

### Features Implemented
- Microphone permission request using:
  ```javascript
  navigator.mediaDevices.getUserMedia({
    audio: true
  })

  ---

# Day 4 — Flask Backend Upload Endpoint

```md id="readme002"
## Day 4 — Flask Backend Upload Endpoint

### Features Implemented
- Flask backend setup
- CORS enabled using flask-cors
- `/transcribe` POST endpoint created
- Multipart audio upload handling
- Uploaded files saved locally
- JSON response returned successfully

### Tech Used
- Flask
- Flask-CORS
- Python

### API Endpoint
```http
POST /transcribe

# Day 5 & Day 6 Progress

## Day 5 — Speech-to-Text API Integration

### Goal
Integrate a real Speech-to-Text provider and generate transcript text from recorded audio.

---

## Completed Features

### Deepgram API Integration
- Created Deepgram developer account
- Generated API key
- Added API key securely using `.env`

### Backend Improvements
- Updated Flask backend
- Added `/transcribe` API endpoint
- Implemented audio upload handling
- Saved uploaded audio inside `backend/uploads/`

### Speech-to-Text Processing
- Sent audio file to Deepgram API
- Received transcript response
- Extracted transcript text from API response

### Security
- Added `.env` to `.gitignore`
- Protected secret API keys

---

## Backend Technologies Used
- Flask
- Flask-CORS
- Requests
- Python-Dotenv

---

## Backend Flow

Audio File
↓
Flask Backend
↓
Deepgram API
↓
Transcript Response

---

# Day 6 — Frontend & Backend Integration

## Goal
Connect frontend audio recorder with Flask backend and display live transcript.

---

## Completed Features

### Audio Recording
- Recorded voice using MediaRecorder API
- Stored audio chunks
- Generated audio Blob

### Frontend Upload
- Converted Blob into FormData
- Sent audio file using Fetch API

### Transcript Display
- Received transcript from backend
- Displayed transcript dynamically in UI

### Loading State
- Added "Transcribing..." loading message

### UI Features
- Start Recording button
- Stop Recording button
- Timer
- Audio playback
- Download recording button

---

## Frontend Technologies Used
- React
- Vite
- Tailwind CSS
- Fetch API
- MediaRecorder API

---

## End-to-End Application Flow

User Speaks
↓
Frontend Records Audio
↓
Audio Blob Created
↓
Frontend Sends Audio to Flask
↓
Flask Sends Audio to Deepgram
↓
Deepgram Returns Transcript
↓
Frontend Displays Transcript

---

## Current Project Status

✅ Audio Recording Working  
✅ Flask Backend Working  
✅ Frontend ↔ Backend Communication Working  
✅ Deepgram API Integrated  
✅ Real Speech-to-Text Working  
✅ Transcript Display Working

---

## Next Improvements
- Save transcript history
- Real-time live transcription
- Database integration
- User authentication
- Deployment on Vercel & Render
