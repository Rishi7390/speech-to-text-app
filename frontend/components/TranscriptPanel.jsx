export default function TranscriptPanel({ transcript }) {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-xl mt-6">
      <h2 className="text-xl font-semibold mb-4">
        Live Transcript
      </h2>

      <div className="border p-4 rounded-lg min-h-[150px]">
        {transcript || "Transcript will appear here..."}
      </div>
    </div>
  );
}