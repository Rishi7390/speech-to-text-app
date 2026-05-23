export default function RecorderPanel() {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-xl">
      <h2 className="text-xl font-semibold mb-4">
        Recorder
      </h2>

      <div className="flex gap-4">
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition duration-200">
          Start
        </button>

        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200">
          Stop
        </button>
      </div>
    </div>
  );
}