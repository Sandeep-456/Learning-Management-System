import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SavePopup from "../codeplayground/SavePopup";

export default function Toolbar({
  language,
  setLanguage,
  onRun,
  onTest,
  onSaveClick,
  onDownload,
  currentFile,
  mode,
  projectFixedLanguage,
  saveFile, // pass saveFile function from Playground
}) {
  const navigate = useNavigate();
  const [showBackPopup, setShowBackPopup] = useState(false);
  const [showSavePopup, setShowSavePopup] = useState(false);

  // -----------------------
  // Back Button Handling
  // -----------------------
  const handleBackClick = () => setShowBackPopup(true);

  const handleBackSave = (fileName) => {
    if (saveFile) saveFile(fileName); // save before leaving
    setShowBackPopup(false);
    navigate("/projects/fullstack");
  };

  const handleBackDiscard = () => {
    setShowBackPopup(false);
    navigate("/projects/fullstack");
  };

  const handleBackCancel = () => setShowBackPopup(false);

  // -----------------------
  // Save Button Handling
  // -----------------------
  const handleSave = (fileName) => {
    if (!fileName?.trim()) return; // prevent empty filename
    if (saveFile) saveFile(fileName);
    setShowSavePopup(false);
  };

  const handleSaveCancel = () => setShowSavePopup(false);

  return (
    <div className="flex items-center gap-3 p-3 bg-gray-800 border-b border-gray-700">
      {/* Back Button */}
      <button
        onClick={handleBackClick}
        className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-white"
      >
        Back
      </button>

      {mode === "practice" && (
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="bg-gray-700 text-white px-3 py-1 rounded"
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
        </select>
      )}

      {mode === "project" && projectFixedLanguage && (
        <div className="text-gray-300 ml-3">
          Language:{" "}
          <span className="font-semibold">
            {projectFixedLanguage === "js" && "JavaScript"}
            {projectFixedLanguage === "py" && "Python"}
            {projectFixedLanguage === "web" && "Web Technologies"}
          </span>
        </div>
      )}

      <button
        onClick={onRun}
        className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded text-white"
      >
        Run
      </button>

      {mode === "practice" && (
        <button
          onClick={onTest}
          className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded text-white"
        >
          Test
        </button>
      )}

      {mode === "project" && (
        <>
          <button
            onClick={() => setShowSavePopup(true)}
            className="bg-yellow-600 hover:bg-yellow-700 px-4 py-1 rounded text-white"
          >
            Save
          </button>

          <button
            onClick={onDownload}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-1 rounded text-white"
          >
            Download
          </button>
        </>
      )}

      {mode === "project" && (
        <div className="text-gray-300 ml-3">
          File:{" "}
          <span className="font-semibold">{currentFile || "Untitled"}</span>
        </div>
      )}

      {/* Back Confirmation Popup */}
      {showBackPopup && (
        <SavePopup
          initialName={currentFile}
          onSave={handleBackSave}
          onDiscard={handleBackDiscard}
          onCancel={handleBackCancel}
          message="Do you want to save your code before leaving?"
        />
      )}

      {/* Save Popup */}
      {showSavePopup && (
        <SavePopup
          initialName={currentFile}
          onSave={handleSave}
          onDiscard={null} // no discard needed here
          onCancel={handleSaveCancel}
          message="Enter a file name to save your code"
        />
      )}
    </div>
  );
}
