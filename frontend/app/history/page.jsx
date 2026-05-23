import Header from "../../components/Header";

export default function HistoryPage() {
  const transcripts = [
    "Meeting Notes",
    "Lecture Recording",
    "Voice Memo",
  ];

  return (
    <main className="min-h-screen bg-gray-100">
      <Header />

      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">
          Transcript History
        </h1>

        <div className="space-y-4">
          {transcripts.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-xl shadow"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}