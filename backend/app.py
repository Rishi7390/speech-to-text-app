from flask import Flask, request, jsonify

from flask_cors import CORS

import os

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

# Upload endpoint
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

    # Create save path
    path = os.path.join(
        UPLOAD_FOLDER,
        f.filename
    )

    # Save uploaded file
    f.save(path)

    # Return response
    return jsonify({

        'status': 'ok',

        'message': 'received',

        'filename': f.filename
    })

# Run Flask app
if __name__ == "__main__":

    app.run(debug=True)