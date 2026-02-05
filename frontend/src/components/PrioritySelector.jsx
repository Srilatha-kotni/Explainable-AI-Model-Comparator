export default function PrioritySelector({ priority, setPriority }) {
  const options = [
    { key: "accuracy", label: "Highest Accuracy" },
    { key: "fairness", label: "Lowest Bias (Fairness)" },
    { key: "stability", label: "Most Stable Model" },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mt-6">
      <h2 className="text-lg font-semibold mb-4">
        What do you care about?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {options.map((opt) => (
          <button
            key={opt.key}
            onClick={() => setPriority(opt.key)}
            className={`p-4 rounded-lg border text-center font-medium
              ${
                priority === opt.key
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
