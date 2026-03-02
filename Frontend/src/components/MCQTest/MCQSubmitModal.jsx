import React from "react";

const MCQSubmitModal = ({
  showSubmitModal,
  setShowSubmitModal,
  computeLiveSummary,
  formatTime,
  submitAndComputeReport,
}) => {
  if (!showSubmitModal) return null;

  const { answered, unread, markedCount } = computeLiveSummary();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-lg w-full">
        <h3 className="text-xl font-bold text-indigo-700 mb-3">Submit Test?</h3>

        {/* live summary */}
        <div className="grid grid-cols-2 gap-3 text-sm text-gray-700 mb-4">
          <div className="p-3 bg-indigo-50 rounded">
            <div className="text-xs text-gray-500">Attempted</div>
            <div className="text-lg font-semibold">{answered}</div>
          </div>

          <div className="p-3 bg-indigo-50 rounded">
            <div className="text-xs text-gray-500">Unanswered</div>
            <div className="text-lg font-semibold">{unread}</div>
          </div>

          <div className="p-3 bg-indigo-50 rounded">
            <div className="text-xs text-gray-500">Marked for review</div>
            <div className="text-lg font-semibold">{markedCount}</div>
          </div>

          <div className="p-3 bg-indigo-50 rounded">
            <div className="text-xs text-gray-500">Time left</div>
            <div className="text-lg font-semibold">{formatTime()}</div>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Submitting will finalize your answers. You will receive a detailed
          report with counts of correct, wrong, answered and unanswered
          questions.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setShowSubmitModal(false)}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={submitAndComputeReport}
            className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Yes, Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default MCQSubmitModal;
