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

  // Start Recording
  const startRecording = async () => {

    try {

      // Ask microphone permission
      const stream =
        await navigator.mediaDevices
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

          if (event.data.size > 0) {

            chunksRef.current.push(
              event.data
            );
          }
        };

      // When recording stops
      mediaRecorder.onstop = () => {

        // Create Blob
        const blob = new Blob(
          chunksRef.current,
          {
            type: "audio/webm",
          }
        );

        // Create local URL
        const url =
          URL.createObjectURL(blob);

        // Save audio URL
        setAudioURL(url);
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
  const stopRecording = () => {

    mediaRecorderRef.current.stop();

    setIsRecording(false);
  };

  return (

    <div className="h-screen flex flex-col items-center justify-center gap-4">

      <h1 className="text-3xl font-bold">

        Audio Recorder

      </h1>

      {/* Recording State */}
      {
        isRecording && (

          <div className="text-red-500 font-bold">

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
          onClick={startRecording}
          disabled={isRecording}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >

          Start Recording

        </button>

        <button
          onClick={stopRecording}
          disabled={!isRecording}
          className="bg-red-500 text-white px-4 py-2 rounded"
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

    </div>
  );
}

export default App;