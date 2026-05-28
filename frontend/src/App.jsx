import {
  useEffect,
  useRef,
  useState
} from "react";

import { Link } from "react-router-dom";

import { saveAs } from "file-saver";

function App() {

  const [recording, setRecording] =
    useState(false);

  const [transcript, setTranscript] =
    useState("");

  const [audioURL, setAudioURL] =
    useState("");

  const [seconds, setSeconds] =
    useState(0);

  const mediaRecorderRef =
    useRef(null);

  const audioChunksRef =
    useRef([]);

  const timerRef =
    useRef(null);

  useEffect(() => {

    if (recording) {

      timerRef.current =
        setInterval(() => {

          setSeconds(
            (prev) => prev + 1
          );

        }, 1000);

    } else {

      clearInterval(
        timerRef.current
      );
    }

    return () =>
      clearInterval(
        timerRef.current
      );

  }, [recording]);

  // -----------------------
  // START RECORDING
  // -----------------------

  const startRecording =
    async () => {

      try {

        const stream =
          await navigator
            .mediaDevices
            .getUserMedia({
              audio: true
            });

        const mediaRecorder =
          new MediaRecorder(stream);

        audioChunksRef.current = [];

        setTranscript("");

        setSeconds(0);

        mediaRecorder.ondataavailable =
          (event) => {

            if (
              event.data.size > 0
            ) {

              audioChunksRef.current
                .push(event.data);
            }
          };

        mediaRecorder.onstop =
          async () => {

            const audioBlob =
              new Blob(
                audioChunksRef.current,
                {
                  type:
                    "audio/webm"
                }
              );

            const audioUrl =
              URL.createObjectURL(
                audioBlob
              );

            setAudioURL(audioUrl);

            const formData =
              new FormData();

            formData.append(
              "file",
              audioBlob,
              "recording.webm"
            );

            try {

              setTranscript(
                "Transcribing..."
              );

              const response =
                await fetch(
                  "http://localhost:5000/transcribe",
                  {
                    method: "POST",
                    body: formData
                  }
                );

              const data =
                await response.json();

              if (
                data.transcript
              ) {

                setTranscript(
                  data.transcript
                );

              } else {

                setTranscript(
                  data.error ||
                  "Transcription failed"
                );
              }

            } catch (error) {

              console.error(error);

              setTranscript(
                "Server error"
              );
            }
          };

        mediaRecorderRef.current =
          mediaRecorder;

        mediaRecorder.start();

        setRecording(true);

      } catch (error) {

        console.error(error);

        alert(
          "Microphone access denied"
        );
      }
    };

  // -----------------------
  // STOP RECORDING
  // -----------------------

  const stopRecording = () => {

    mediaRecorderRef.current.stop();

    setRecording(false);
  };

  // -----------------------
  // COPY TRANSCRIPT
  // -----------------------

  const copyTranscript = () => {

    navigator.clipboard.writeText(
      transcript
    );

    alert(
      "Transcript copied!"
    );
  };

  // -----------------------
  // DOWNLOAD TXT
  // -----------------------

  const downloadTranscript = () => {

    const blob = new Blob(
      [transcript],
      {
        type: "text/plain;charset=utf-8"
      }
    );

    saveAs(
      blob,
      "transcript.txt"
    );
  };

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#020c2b",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 20px",
        fontFamily: "Arial"
      }}
    >

      <h1
        style={{
          fontSize: "50px",
          marginBottom: "10px"
        }}
      >
        Speech To Text App
      </h1>

      <Link
        to="/history"
        style={{
          color: "#38bdf8",
          textDecoration: "none",
          marginBottom: "30px",
          fontSize: "22px"
        }}
      >
        View Transcript History →
      </Link>

      {/* Timer */}

      <div
        style={{
          marginBottom: "20px",
          fontSize: "28px"
        }}
      >
        Timer: {seconds}s
      </div>

      {/* Buttons */}

      {!recording ? (

        <button
          onClick={startRecording}
          aria-label="Start Recording"
          style={{
            padding:
              "14px 28px",
            fontSize: "22px",
            border: "none",
            borderRadius: "12px",
            background:
              "#22c55e",
            color: "white",
            cursor: "pointer"
          }}
        >
          Start Recording
        </button>

      ) : (

        <button
          onClick={stopRecording}
          aria-label="Stop Recording"
          style={{
            padding:
              "14px 28px",
            fontSize: "22px",
            border: "none",
            borderRadius: "12px",
            background:
              "#ef4444",
            color: "white",
            cursor: "pointer"
          }}
        >
          Stop Recording
        </button>
      )}

      {/* Audio */}

      {audioURL && (

        <audio
          controls
          src={audioURL}
          style={{
            marginTop: "30px",
            width: "90%",
            maxWidth: "500px"
          }}
        />
      )}

      {/* Transcript */}

      <div
        style={{
          marginTop: "40px",
          width: "90%",
          maxWidth: "700px",
          background: "#1e293b",
          padding: "30px",
          borderRadius: "20px"
        }}
      >

        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px"
          }}
        >
          Transcript
        </h2>

        <p
          style={{
            lineHeight: "1.8",
            textAlign: "center",
            fontSize: "18px"
          }}
        >
          {transcript}
        </p>

        {/* Action Buttons */}

        {transcript &&
         transcript !== "Transcribing..." && (

          <div
            style={{
              display: "flex",
              gap: "20px",
              justifyContent: "center",
              marginTop: "25px",
              flexWrap: "wrap"
            }}
          >

            <button
              onClick={
                copyTranscript
              }
              style={{
                padding:
                  "10px 20px",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "16px"
              }}
            >
              Copy
            </button>

            <button
              onClick={
                downloadTranscript
              }
              style={{
                padding:
                  "10px 20px",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "16px"
              }}
            >
              Download TXT
            </button>

          </div>
        )}

      </div>

    </div>
  );
}

export default App;