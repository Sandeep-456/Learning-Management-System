import React from "react";
// RUNE Learning MCQ Header

const MCQTestHeader = ({
  topicName,
  progressCount,
  formatTime,
  setShowSubmitModal,
  timeLeft,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img src="/gpt-image-2_A_minimalist_flat_vector_logo_for_Rune_Learning_showing_a_stylized_R_letter_desi-0.jpg" alt="RUNE Learning" className="h-10" />
          <div>
            <div className="text-base font-semibold text-indigo-700">
              Practice Test — {topicName}
            </div>
            <div className="text-xs text-gray-500">
              {progressCount} • Use the grid to jump between questions
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm text-gray-500">Time Remaining</div>
            <div className="font-bold text-indigo-700">
              {formatTime(timeLeft)}
            </div>
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-4 py-2 rounded-md bg-rose-600 text-white hover:bg-rose-700 shadow"
            title="Submit test"
          >
            Submit
          </button>
        </div>
      </div>
    </header>
  );
};

export default MCQTestHeader;
