import { useLocation, useNavigate } from "react-router-dom";
import { recommendModel } from "../utils/recommendation";

/* ---------- Metric Card with Animated Colored Progress Bars ---------- */
function MetricCard({ title, data, gradient }) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition">
      <h3 className="font-semibold text-lg mb-4 text-center">{title}</h3>

      {Object.entries(data).map(([model, value]) => {
        const percent = Math.round(value * 100);

        return (
          <div key={model} className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">{model}</span>
              <span className="font-semibold">{percent}%</span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${gradient} transition-all duration-700 ease-out`}
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------- Results Page ------------------------- */
export default function ResultsPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Safety check
  if (!state) {
    navigate("/");
    return null;
  }

  const { results, priority, fileName } = state;
  const bestModel = recommendModel(results, priority);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-gray-200 p-8">
      {/* Heading */}
      <h1 className="text-3xl font-extrabold text-center mb-8">
        Analysis Results
      </h1>

      {/* Dataset Info */}
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow mb-8">
        <p className="mb-1">
          <b>Dataset:</b> {fileName}
        </p>
        <p>
          <b>User Priority:</b> {priority}
        </p>
      </div>

      {/* Metrics */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Accuracy"
          data={results.accuracy}
          gradient="bg-gradient-to-r from-green-400 via-emerald-500 to-green-600"
        />

        <MetricCard
          title="Bias"
          data={results.bias}
          gradient="bg-gradient-to-r from-red-400 via-pink-500 to-red-600"
        />

        <MetricCard
          title="Stability"
          data={results.stability}
          gradient="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600"
        />
      </div>

      {/* Recommended Model */}
      <div className="max-w-4xl mx-auto mt-10 bg-green-100 border border-green-300 p-6 rounded-2xl text-center shadow">
        <h2 className="text-2xl font-bold text-green-700 mb-2">
          Recommended Model
        </h2>
        <p className="text-xl font-semibold">{bestModel}</p>
        <p className="text-sm text-green-700 mt-1">
          Selected based on your preference for <b>{priority}</b>
        </p>
      </div>

      {/* Action Button */}
      <div className="text-center mt-8">
        <button
          onClick={() => navigate("/")}
          className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-semibold
            hover:bg-indigo-700 hover:shadow-lg transition"
        >
          Upload Another Dataset
        </button>
      </div>
    </div>
  );
}
