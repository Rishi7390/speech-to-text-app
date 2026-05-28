import sys
import os

# Add backend folder to path
sys.path.append(
    os.path.abspath(
        os.path.join(
            os.path.dirname(__file__),
            ".."
        )
    )
)

from app import app

# ------------------------
# TEST HOME ROUTE
# ------------------------

def test_home():

    client = app.test_client()

    response = client.get("/")

    assert response.status_code == 200

# ------------------------
# TEST TRANSCRIPTS ROUTE
# ------------------------

def test_transcripts():

    client = app.test_client()

    response = client.get(
        "/transcripts"
    )

    assert response.status_code == 200