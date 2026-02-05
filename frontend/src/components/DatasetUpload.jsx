export default function DatasetUpload({ onUpload }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-semibold mb-2">Upload Dataset</h2>
      <input
        type="file"
        accept=".csv"
        className="block w-full border p-2 rounded"
        onChange={(e) => onUpload(e.target.files[0])}
      />
    </div>
  );
}
