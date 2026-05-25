from flask import Flask, request, jsonify
from flask_cors import CORS

from dotenv import load_dotenv

import requests
import os

# Load environment variables
load_dotenv()

# Get API key
DEEPGRAM_API_KEY = os.getenv("Deepgram API Key")

# Create Flask app
app = Flask(__name__)

# Enable CORS
CORS(app)

# Upload folder
UPLOAD_FOLDER = "uploads"

# Create uploads folder automatically
os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)

# Home route
@app.route("/")
def home():

    return {
        "message": "Backend running"
    }

# Transcribe endpoint
@app.route(
    '/transcribe',
    methods=['POST']
)

def transcribe():

    # Get uploaded file
    f = request.files.get('file')

    # If no file found
    if not f:

        return jsonify({
            'error': 'no file'
        }), 400

    # Save file path
    path = os.path.join(
        UPLOAD_FOLDER,
        f.filename
    )

    # Save uploaded file
    f.save(path)

    # Open audio file
    with open(path, 'rb') as audio:

        # Send to Deepgram
        response = requests.post(

            "https://api.deepgram.com/v1/listen",

            headers={
                "Authorization": f"Token {DEEPGRAM_API_KEY}",
                "Content-Type": "audio/webm"
            },

            data=audio
        )

    # Convert response to JSON
    result = response.json()

    try:

        transcript = result["results"]["channels"][0]["alternatives"][0]["transcript"]

    except:

        transcript = "Could not transcribe audio"

    # Return transcript
    return jsonify({

        "transcript": transcript

    })

# Run Flask app
if __name__ == "__main__":

    app.run(debug=True)
