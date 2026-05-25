import { useRef, useState, useEffect } from "react";

function App() {

  // Store MediaRecorder instance
  const mediaRecorderRef = useRef(null);

  // Store audio chunks
  const chunksRef = useRef([]);

  // Recording state
  const [isRecording, setIsRecording] =
    useState(false);

  // Saved audio URL
  const [audioURL, setAudioURL] =
    useState("");

  // Transcript text
  const [transcript, setTranscript] =
    useState("");

  // Loading state
  const [loading, setLoading] =
    useState(false);

  // Timer
  const [seconds, setSeconds] =
    useState(0);

  // Timer effect
  useEffect(() => {

    let interval;

    if (isRecording) {

      interval = setInterval(() => {

        setSeconds((prev) => prev + 1);

      }, 1000);
    }

    return () => clearInterval(interval);

  }, [isRecording]);

  // Send audio to backend
  const sendAudioToBackend =
    async (audioBlob) => {

      try {

        setLoading(true);

        // Create form data
        const form = new FormData();

        form.append(
          "file",
          audioBlob,
          "speech.webm"
        );

        // Send request
        const res = await fetch(

          "http://localhost:5000/transcribe",

          {
            method: "POST",
            body: form,
          }
        );

        // Convert response
        const data = await res.json();

        // Save transcript
        setTranscript(
          data.transcript
        );

      } catch (error) {

        console.error(error);

        alert(
          "Error sending audio"
        );

      } finally {

        setLoading(false);
      }
    };

  // Start Recording
  const startRecording =
    async () => {

      try {

        // Ask microphone permission
        const stream =
          await navigator
            .mediaDevices
            .getUserMedia({
              audio: true,
            });

        // Create MediaRecorder
        const mediaRecorder =
          new MediaRecorder(stream);

        mediaRecorderRef.current =
          mediaRecorder;

        // Clear old chunks
        chunksRef.current = [];

        // Save chunks
        mediaRecorder.ondataavailable =
          (event) => {

            if (
              event.data.size > 0
            ) {

              chunksRef.current.push(
                event.data
              );
            }
          };

        // When recording stops
        mediaRecorder.onstop =
          async () => {

            // Create Blob
            const blob = new Blob(

              chunksRef.current,

              {
                type:
                  "audio/webm",
              }
            );

            // Create local URL
            const url =
              URL.createObjectURL(
                blob
              );

            // Save audio URL
            setAudioURL(url);

            // Send audio to backend
            await sendAudioToBackend(
              blob
            );
          };

        // Start recording
        mediaRecorder.start();

        setIsRecording(true);

        setSeconds(0);

      } catch (error) {

        console.error(error);

        alert(
          "Microphone permission denied"
        );
      }
    };

  // Stop Recording
  const stopRecording =
    () => {

      mediaRecorderRef
        .current
        .stop();

      setIsRecording(false);
    };

  return (

    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-6 p-6">

      <h1 className="text-4xl font-bold">

        Speech To Text App

      </h1>

      {/* Recording State */}
      {
        isRecording && (

          <div className="text-red-500 font-bold text-xl">

            🔴 Recording...

          </div>
        )
      }

      {/* Timer */}
      <div className="text-xl">

        Timer: {seconds}s

      </div>

      {/* Buttons */}
      <div className="flex gap-4">

        <button
          onClick={
            startRecording
          }
          disabled={
            isRecording
          }
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >

          Start Recording

        </button>

        <button
          onClick={
            stopRecording
          }
          disabled={
            !isRecording
          }
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >

          Stop Recording

        </button>

      </div>

      {/* Audio Player */}
      {
        audioURL && (

          <div className="flex flex-col items-center gap-4">

            <audio
              controls
              src={audioURL}
            />

            {/* Download Button */}
            <a
              href={audioURL}
              download="recording.webm"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >

              Download Audio

            </a>

          </div>
        )
      }

      {/* Transcript Panel */}
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-2xl">

        <h2 className="text-2xl font-bold mb-4">

          Transcript

        </h2>

        {
          loading ? (

            <div className="text-blue-500">

              Transcribing audio...

            </div>

          ) : (

            <div className="border rounded p-4 min-h-[120px]">

              {
                transcript
                  ? transcript
                  : "Transcript will appear here..."
              }

            </div>
          )
        }

      </div>

    </div>
  );
}

export default App;