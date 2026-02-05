import { useState } from "react";
import { uploadDataset } from "./api";
import DatasetUpload from "./components/DatasetUpload";
import PrioritySelector from "./components/PrioritySelector";
import { recommendModel } from "./utils/recommendation";

function Card({ title, data }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="font-semibold mb-2">{title}</h3>
      <pre className="text-sm text-gray-700">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}

export default function App() {
  const [results, setResults] = useState(null);
  const [priority, setPriority] = useState("accuracy");
  const [recommended, setRecommended] = useState(null);

  const handleUpload = async (file) => {
    const data = await uploadDataset(file);
    setResults(data);
    setRecommended(recommendModel(data, priority));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Explainable AI Model Comparator
      </h1>

      <div className="max-w-5xl mx-auto space-y-6">
        <DatasetUpload onUpload={handleUpload} />
        <PrioritySelector priority={priority} setPriority={setPriority} />

        {results && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <Card title="Accuracy" data={results.accuracy} />
              <Card title="Bias" data={results.bias} />
              <Card title="Stability" data={results.stability} />
            </div>

            <div className="bg-green-100 border border-green-300 p-6 rounded-xl text-center mt-6">
              <h2 className="text-xl font-bold text-green-700">
                ✅ Recommended Model
              </h2>
              <p className="text-lg mt-2">{recommended}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
