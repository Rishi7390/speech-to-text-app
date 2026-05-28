import {
  useEffect,
  useRef,
  useState
} from "react";

import {
  Link
} from "react-router-dom";

function App() {

  // Recording state
  const [recording,
    setRecording] =
    useState(false);

  // Transcript text
  const [transcript,
    setTranscript] =
    useState("");

  // Audio player URL
  const [audioURL,
    setAudioURL] =
    useState("");

  // Loading state
  const [loading,
    setLoading] =
    useState(false);

  // Timer
  const [seconds,
    setSeconds] =
    useState(0);

  // MediaRecorder reference
  const mediaRecorderRef =
    useRef(null);

  // Audio chunks
  const audioChunksRef =
    useRef([]);

  // Timer reference
  const timerRef =
    useRef(null);

  // Timer effect
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

  // ------------------------------
  // START RECORDING
  // ------------------------------

  const startRecording =
    async () => {

      try {

        const stream =
          await navigator
            .mediaDevices
            .getUserMedia({
              audio: true,
            });

        const mediaRecorder =
          new MediaRecorder(stream);

        // Reset old data
        audioChunksRef.current = [];

        setTranscript("");

        setAudioURL("");

        setSeconds(0);

        // Save chunks
        mediaRecorder.ondataavailable =
          (event) => {

            if (
              event.data.size > 0
            ) {

              audioChunksRef.current.push(
                event.data
              );
            }
          };

        // When recording stops
        mediaRecorder.onstop =
          async () => {

            const audioBlob =
              new Blob(

                audioChunksRef.current,

                {
                  type:
                  "audio/webm",
                }
              );

            // Audio preview
            const audioUrl =
              URL.createObjectURL(
                audioBlob
              );

            setAudioURL(audioUrl);

            // Create form data
            const formData =
              new FormData();

            formData.append(
              "file",
              audioBlob,
              "recording.webm"
            );

            try {

              setLoading(true);

              setTranscript(
                "Transcribing..."
              );

              // Send to backend
              const response =
                await fetch(

                  "http://localhost:5000/transcribe",

                  {
                    method: "POST",
                    body: formData,
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

              console.log(error);

              setTranscript(
                "Server error"
              );

            } finally {

              setLoading(false);
            }
          };

        // Save recorder
        mediaRecorderRef.current =
          mediaRecorder;

        // Start recording
        mediaRecorder.start();

        setRecording(true);

      } catch (error) {

        console.log(error);

        alert(
          "Microphone permission denied"
        );
      }
    };

  // ------------------------------
  // STOP RECORDING
  // ------------------------------

  const stopRecording =
    () => {

      mediaRecorderRef.current
        .stop();

      setRecording(false);
    };

  // ------------------------------
  // UI
  // ------------------------------

  return (

    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "50px",
        fontFamily: "Arial",
      }}
    >

      {/* Heading */}

      <h1
        style={{
          fontSize: "40px",
          marginBottom: "20px"
        }}
      >

        Speech To Text App

      </h1>

      {/* History Link */}

      <Link
        to="/history"
        style={{
          color: "#38bdf8",
          marginBottom: "30px",
          textDecoration: "none",
          fontSize: "18px"
        }}
      >

        View Transcript History →

      </Link>

      {/* Recording State */}

      {recording && (

        <div
          style={{
            marginBottom: "15px",
            color: "#f43f5e",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >

          🔴 Recording...

        </div>
      )}

      {/* Timer */}

      <div
        style={{
          marginBottom: "20px",
          fontSize: "20px",
        }}
      >

        Timer: {seconds}s

      </div>

      {/* Buttons */}

      {!recording ? (

        <button
          onClick={startRecording}
          style={{
            padding: "12px 25px",
            fontSize: "16px",
            cursor: "pointer",
            borderRadius: "10px",
            border: "none",
            background: "#22c55e",
            color: "white"
          }}
        >

          Start Recording

        </button>

      ) : (

        <button
          onClick={stopRecording}
          style={{
            padding: "12px 25px",
            fontSize: "16px",
            cursor: "pointer",
            borderRadius: "10px",
            border: "none",
            background: "#ef4444",
            color: "white"
          }}
        >

          Stop Recording

        </button>
      )}

      {/* Loading */}

      {loading && (

        <p
          style={{
            marginTop: "20px"
          }}
        >

          Processing audio...

        </p>
      )}

      {/* Audio Player */}

      {audioURL && (

        <audio
          controls
          src={audioURL}
          style={{
            marginTop: "30px",
            width: "400px"
          }}
        />
      )}

      {/* Transcript */}

      <div
        style={{
          marginTop: "40px",
          width: "70%",
          background: "#1e293b",
          padding: "25px",
          borderRadius: "12px"
        }}
      >

        <h2
          style={{
            marginBottom: "20px"
          }}
        >

          Transcript

        </h2>

        <p
          style={{
            lineHeight: "1.8",
            fontSize: "18px"
          }}
        >

          {transcript ||
            "Your transcript will appear here..."}

        </p>

      </div>

    </div>
  );
}

export default App;