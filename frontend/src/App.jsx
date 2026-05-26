import { useEffect, useRef, useState } from "react";

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

      timerRef.current = setInterval(() => {

        setSeconds((prev) => prev + 1);

      }, 1000);

    } else {

      clearInterval(timerRef.current);
    }

    return () =>
      clearInterval(timerRef.current);

  }, [recording]);

  const startRecording = async () => {

    try {

      const stream =
        await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

      const mediaRecorder =
        new MediaRecorder(stream);

      audioChunksRef.current = [];

      setTranscript("");

      setSeconds(0);

      mediaRecorder.ondataavailable =
        (event) => {

          if (event.data.size > 0) {

            audioChunksRef.current.push(
              event.data
            );
          }
        };

      mediaRecorder.onstop =
        async () => {

          const audioBlob = new Blob(
            audioChunksRef.current,
            {
              type: "audio/webm",
            }
          );

          const audioUrl =
            URL.createObjectURL(audioBlob);

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
                  body: formData,
                }
              );

            const data =
              await response.json();

            if (data.transcript) {

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

  const stopRecording = () => {

    mediaRecorderRef.current.stop();

    setRecording(false);
  };

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

      <h1>Speech To Text App</h1>

      {/* Recording Status */}

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
          fontSize: "18px",
        }}
      >
        Timer: {seconds}s
      </div>

      {/* Buttons */}

      {!recording ? (

        <button
          onClick={startRecording}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Start Recording
        </button>

      ) : (

        <button
          onClick={stopRecording}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Stop Recording
        </button>
      )}

      {/* Audio Player */}

      {audioURL && (

        <audio
          controls
          src={audioURL}
          style={{
            marginTop: "25px",
          }}
        />
      )}

      {/* Transcript */}

      <h2
        style={{
          marginTop: "30px",
        }}
      >
        Transcript
      </h2>

      <p
        style={{
          width: "70%",
          textAlign: "center",
          lineHeight: "1.7",
        }}
      >
        {transcript}
      </p>

    </div>
  );
}

export default App;