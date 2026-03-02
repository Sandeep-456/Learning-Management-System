import { useState, useEffect } from "react";

export default function SavePopup({
  initialName,
  onSave,
  onDiscard,
  onCancel,
  message,
}) {
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    setFileName(initialName || "");
  }, [initialName]);

  const handleSave = () => {
    if (!fileName.trim()) return;
    onSave(fileName.trim());
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-96">
        <p className="text-white mb-4">{message || "Save changes?"}</p>

        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          className="w-full mb-4 px-3 py-2 rounded bg-gray-700 text-white"
          placeholder="Enter file name"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="bg-gray-600 hover:bg-gray-700 px-4 py-1 rounded text-white"
          >
            Cancel
          </button>

          {onDiscard && (
            <button
              onClick={onDiscard}
              className="bg-red-600 hover:bg-red-700 px-4 py-1 rounded text-white"
            >
              Discard
            </button>
          )}

          {onSave && (
            <button
              onClick={handleSave}
              className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded text-white"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
