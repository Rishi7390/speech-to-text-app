from flask import Flask, request, jsonify
from flask_cors import CORS

from dotenv import load_dotenv

from pydub import AudioSegment

import requests
import os

# Load environment variables
load_dotenv()

<<<<<<< HEAD
# Get API key
DEEPGRAM_API_KEY = os.getenv("Deepgram API Key")
=======
# API Key
DEEPGRAM_API_KEY = os.getenv(
    "DEEPGRAM_API_KEY"
)
>>>>>>> 6de4d89 (Completed stable speech-to-text recording and transcription system)

# Create Flask app
app = Flask(__name__)

# Enable CORS
CORS(app)

# Upload folder
UPLOAD_FOLDER = "uploads"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)

# Max file size
MAX_FILE_SIZE = (
    10 * 1024 * 1024
)

@app.route("/")
def home():

    return {
        "message":
        "Backend running"
    }

@app.route(
    "/transcribe",
    methods=["POST"]
)

def transcribe():

    try:

        if "file" not in request.files:

            return jsonify({
                "error":
                "No audio uploaded"
            }), 400

        f = request.files["file"]

        if f.filename == "":

            return jsonify({
                "error":
                "Empty filename"
            }), 400

        # Save uploaded file
        original_path = os.path.join(
            UPLOAD_FOLDER,
            "recording.webm"
        )

        wav_path = os.path.join(
            UPLOAD_FOLDER,
            "converted.wav"
        )

        f.save(original_path)

        # Validate file size
        if (
            os.path.getsize(
                original_path
            ) == 0
        ):

            return jsonify({
                "error":
                "Empty audio file"
            }), 400

        # Convert audio
        audio = AudioSegment.from_file(
            original_path
        )

        audio = (
            audio
            .set_frame_rate(16000)
            .set_channels(1)
        )

        audio.export(
            wav_path,
            format="wav"
        )

        # Send to Deepgram
        with open(
            wav_path,
            "rb"
        ) as audio_file:

            response = requests.post(

                "https://api.deepgram.com/v1/listen",

                headers={

                    "Authorization":
                    f"Token {DEEPGRAM_API_KEY}",

                    "Content-Type":
                    "audio/wav"
                },

                data=audio_file
            )

        result = response.json()

        transcript = (
            result["results"]["channels"][0]
            ["alternatives"][0]
            ["transcript"]
        )

        return jsonify({
            "transcript":
            transcript
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500

if __name__ == "__main__":

<<<<<<< HEAD
    app.run(debug=True)
=======
    app.run(
        debug=True
    )
>>>>>>> 6de4d89 (Completed stable speech-to-text recording and transcription system)
