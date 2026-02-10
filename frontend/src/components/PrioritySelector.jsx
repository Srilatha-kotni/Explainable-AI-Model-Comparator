export default function PrioritySelector({ priority, setPriority }) {
  const options = [
    { id: "accuracy", label: "Highest Accuracy" },
    { id: "fairness", label: "Lowest Bias (Fairness)" },
    { id: "stability", label: "Most Stable Model" },
  ];

  return (
    <div className="space-y-2">
      <p className="font-semibold">What do you care about?</p>
      {options.map(opt => (
        <label
          key={opt.id}
          className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer ${
            priority === opt.id
              ? "bg-indigo-100 border-indigo-500"
              : "border-gray-300"
          }`}
        >
          <input
            type="radio"
            checked={priority === opt.id}
            onChange={() => setPriority(opt.id)}
          />
          {opt.label}
        </label>
      ))}
    </div>
  );
}
