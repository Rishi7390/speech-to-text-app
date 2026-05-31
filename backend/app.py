from flask import Flask, request, jsonify
from flask_cors import CORS

from dotenv import load_dotenv
from supabase import create_client

import requests
import os

# ------------------------------
# LOAD ENV VARIABLES
# ------------------------------

load_dotenv()

# Deepgram API Key
DEEPGRAM_API_KEY = os.getenv(
    "DEEPGRAM_API_KEY"
)

# Supabase URL
SUPABASE_URL = os.getenv(
    "SUPABASE_URL"
)

# Supabase Key
SUPABASE_KEY = os.getenv(
    "SUPABASE_KEY"
)

# Debug print
print("SUPABASE URL:", SUPABASE_URL)
print("SUPABASE KEY FOUND:", bool(SUPABASE_KEY))

# ------------------------------
# CREATE SUPABASE CLIENT
# ------------------------------

supabase = create_client(
    SUPABASE_URL,
    SUPABASE_KEY
)

# ------------------------------
# CREATE FLASK APP
# ------------------------------

app = Flask(__name__)

# Enable CORS
CORS(app)

# Upload folder
UPLOAD_FOLDER = "uploads"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)

# Max upload size = 10MB
MAX_FILE_SIZE = (
    10 * 1024 * 1024
)

# ------------------------------
# HOME ROUTE
# ------------------------------

@app.route("/")
def home():

    return {
        "message":
        "Backend running successfully"
    }

# ------------------------------
# TRANSCRIBE ROUTE
# ------------------------------

@app.route(
    "/transcribe",
    methods=["POST"]
)

def transcribe():

    try:

        print("\n===== NEW TRANSCRIPTION =====")

        # Validate upload
        if "file" not in request.files:

            return jsonify({
                "error":
                "No audio file uploaded"
            }), 400

        # Get uploaded file
        f = request.files["file"]

        # Empty filename
        if f.filename == "":

            return jsonify({
                "error":
                "Empty filename"
            }), 400

        print("Audio file received")

        # File paths
        original_path = os.path.join(
            UPLOAD_FOLDER,
            "recording.webm"
        )

        # Save uploaded audio
        f.save(original_path)   

        print("Audio saved")

        # Empty file validation
        if (
            os.path.getsize(
                original_path
            ) == 0
        ):

            return jsonify({
                "error":
                "Empty audio file"
            }), 400

        # Large file validation
        if (
            os.path.getsize(
                original_path
            ) > MAX_FILE_SIZE
        ):

            return jsonify({
                "error":
                "File too large"
            }), 400

         # ------------------------------
        # SEND TO DEEPGRAM
        # ------------------------------

        print("Sending to Deepgram...")

        with open(
            original_path,
            "rb"
        ) as audio_file:

            response = requests.post(

                "https://api.deepgram.com/v1/listen",

                headers={

                    "Authorization":
                    f"Token {DEEPGRAM_API_KEY}",

                    "Content-Type":
                    "audio/webm"
                },

                data=audio_file
            )
        print(
            "Deepgram status:",
            response.status_code
        )

        # Check Deepgram response

        if response.status_code != 200:

            return jsonify({
                "error": response.text
            }), 500

        deepgram_data = response.json()

        transcript = (
            deepgram_data["results"]
            ["channels"][0]
            ["alternatives"][0]
            ["transcript"]
        )

        print(
            "Transcript:",
            transcript
        )
  # ------------------------------
        # SAVE TO SUPABASE
        # ------------------------------

        print("Saving to Supabase...")

        supabase.table(
            "transcripts"
        ).insert({

            "text":
            transcript,

            "duration_seconds":
            0,

            "filename":
            f.filename,

            "language":
            "en"

        }).execute()

        print("Transcript saved successfully")

        # ------------------------------
        # RETURN RESPONSE
        # ------------------------------

        return jsonify({

            "transcript":
            transcript

        })

    except Exception as e:

        print("ERROR:", str(e))

        return jsonify({

            "error":
            str(e)

        }), 500

# ------------------------------
# GET ALL TRANSCRIPTS
# ------------------------------

@app.route(
    "/transcripts",
    methods=["GET"]
)

def get_transcripts():

    try:

        response = (
            supabase
            .table("transcripts")
            .select("*")
            .order(
                "id",
                desc=True
            )
            .execute()
        )

        return jsonify(
            response.data
        )

    except Exception as e:

        return jsonify({

            "error":
            str(e)

        }), 500

# ------------------------------
# GET SINGLE TRANSCRIPT
# ------------------------------

@app.route(
    "/transcripts/<int:id>",
    methods=["GET"]
)

def get_single_transcript(id):

    try:

        response = (
            supabase
            .table("transcripts")
            .select("*")
            .eq("id", id)
            .execute()
        )

        return jsonify(
            response.data
        )

    except Exception as e:

        return jsonify({

            "error":
            str(e)

        }), 500

# ------------------------------
# RUN FLASK APP
# ------------------------------
if __name__ == "__main__":

    port = int(
        os.environ.get(
            "PORT",
            5000
        )
    )

    app.run(
        host="0.0.0.0",
        port=port,
        debug=False
    )