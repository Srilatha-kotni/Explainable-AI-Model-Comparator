import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatasetUpload from "../components/DatasetUpload";
import PrioritySelector from "../components/PrioritySelector";
import { uploadDataset } from "../api";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [priority, setPriority] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const analyze = async () => {
    try {
      setLoading(true);
      const results = await uploadDataset(file);
      navigate("/results", {
        state: { results, priority, fileName: file.name },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden
      bg-gradient-to-br from-indigo-700 via-purple-700 to-fuchsia-700
      flex items-center justify-center px-4">

      {/* Animated background blobs */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px]
        bg-pink-500 opacity-30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px]
        bg-blue-400 opacity-30 rounded-full blur-3xl animate-pulse" />

      {/* Main container */}
      <div className="relative bg-white/90 backdrop-blur-xl
        rounded-3xl shadow-2xl max-w-3xl w-full
        px-10 py-12 text-center
        animate-fadeInUp">

        {/* Hero Title */}
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
          Explainable AI
          <span className="block text-indigo-600 mt-2">
            Model Comparator
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-gray-700 text-lg leading-relaxed mb-10">
          Upload any dataset and compare machine learning models using
          <b> accuracy</b>, <b>fairness</b>, and <b>stability</b>.
          <br />
          Get a transparent and explainable recommendation in seconds.
        </p>

        {/* Upload section */}
        <DatasetUpload onConfirm={setFile} />

        {/* Priority + Analyze */}
        {file && (
          <div className="mt-8 space-y-6 animate-fadeIn">
            <PrioritySelector
              priority={priority}
              setPriority={setPriority}
            />

            <button
              onClick={analyze}
              disabled={!priority || loading}
              className={`w-full py-3 rounded-xl text-lg font-semibold text-white
                transition-all duration-300
                ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-green-500 to-emerald-600 hover:shadow-lg hover:scale-[1.02]"
                }`}
            >
              {loading ? "Analyzing…" : "Analyze Dataset"}
            </button>
          </div>
        )}

        {/* How it works */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-4 rounded-xl bg-indigo-50">
            <h3 className="font-bold mb-1">1. Upload Dataset</h3>
            <p className="text-sm text-gray-600">
              Provide any CSV dataset to begin analysis.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-purple-50">
            <h3 className="font-bold mb-1">2. Choose Priority</h3>
            <p className="text-sm text-gray-600">
              Select what matters most: accuracy, fairness, or stability.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-green-50">
            <h3 className="font-bold mb-1">3. Get Recommendation</h3>
            <p className="text-sm text-gray-600">
              The system explains and recommends the best model.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
