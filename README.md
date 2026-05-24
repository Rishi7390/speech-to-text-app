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
