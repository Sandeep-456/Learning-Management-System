import React from "react";
import mcqData from "../../data/mcqData";

const MCQQuestionGrid = ({
  TOTAL_QUESTIONS,
  current,
  answers,
  marked,
  setCurrent,
  setSelected,
}) => {
  return (
    <div
      className="bg-white rounded-xl shadow p-4 mb-4 max-h-[70vh] overflow-y-auto"
      aria-live="polite"
    >
      <h3 className="font-semibold text-indigo-700 mb-2">Question Grid</h3>
      <p className="text-sm text-gray-600 mb-3">
        Click a number to jump. Colors show status.
      </p>

      {/* Auto-fit compact grid - use grid-cols-5 for compactness; it's scrollable for many items */}
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: TOTAL_QUESTIONS }).map((_, i) => {
          const isCurrent = i === current;
          const isAnswered = answers[i] !== undefined;
          const isMarked = marked[i];

          let cls = "bg-gray-200 text-gray-800";
          if (isCurrent) cls = "bg-indigo-600 text-white";
          else if (isAnswered) cls = "bg-green-500 text-white";
          else if (isMarked) cls = "bg-orange-300 text-black";

          return (
            <button
              key={i}
              onClick={() => {
                setCurrent(i);
                setSelected(answers[i] ?? null);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`p-2 rounded-md font-bold text-sm ${cls} flex items-center justify-center`}
              aria-label={`Question ${i + 1} ${
                isAnswered ? "answered"
                : isMarked ? "marked"
                : "unanswered"
              }`}
            >
              {i + 1}
            </button>
          );
        })}
      </div>

      {/* Legend — two per row */}
      <div className="grid grid-cols-2 gap-2 mt-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-indigo-600" /> Current
        </div>

        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-green-500" /> Answered
        </div>

        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-orange-300" /> Marked
        </div>

        <div className="flex items-center gap-2">
          <span className="w-4 h-4 rounded bg-gray-300" /> Unanswered
        </div>
      </div>
    </div>
  );
};

export default MCQQuestionGrid;
