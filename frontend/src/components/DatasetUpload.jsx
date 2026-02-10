import { useState } from "react";

export default function DatasetUpload({ onConfirm }) {
  const [file, setFile] = useState(null);

  return (
    <div
      className="border-2 border-dashed border-indigo-400 rounded-2xl
      p-8 text-center cursor-pointer
      transition-all duration-300
      hover:border-indigo-600 hover:bg-indigo-50"
    >
      <p className="text-lg font-semibold mb-2">
        Upload your dataset
      </p>

      <label className="inline-block mt-2">
        <span className="px-5 py-2 bg-indigo-600 text-white rounded-lg
          cursor-pointer hover:bg-indigo-700 transition">
          Choose CSV File
        </span>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])}
          className="hidden"
        />
      </label>

      {file && (
        <>
          <p className="mt-4 text-sm text-gray-600">
            Selected: <b>{file.name}</b>
          </p>

          <button
            onClick={() => onConfirm(file)}
            className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg
              hover:bg-purple-700 transition"
          >
            OK
          </button>
        </>
      )}
    </div>
  );
}
