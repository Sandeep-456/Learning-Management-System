import React from "react";
import { motion } from "framer-motion"; // Assuming framer-motion is used for animations, if not, remove.

const MCQQuestionArea = ({
  current,
  mcqData,
  selected,
  handleSelect,
  prev,
  next,
  toggleMark,
  marked,
  clearAnswer,
  TOTAL_QUESTIONS,
  progressPct,
  progressColorClass,
  setShowSubmitModal,
  answers,
}) => {
  return (
    <section className="col-span-2 bg-white rounded-xl shadow p-6">
      {/* progress (time) bar */}
      <div className="mb-5">
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all ${progressColorClass}`}
            style={{ width: `${progressPct}%` }}
            aria-hidden
          />
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <div>{Math.floor(progressPct)}% time left</div>
          <div>
            {/* formatTime() needs to be passed down or recalculated */}
          </div>
        </div>
      </div>

      {/* Question */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          {current + 1}. {mcqData[current].question}
        </h2>

        {/* Options — aligned & visually balanced */}
        <div className="space-y-4">
          {mcqData[current].options.map((opt, idx) => {
            const isSelected = selected === idx || answers[current] === idx;
            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`w-full text-left p-4 rounded-lg border transition flex items-center justify-between
                      ${
                        isSelected ?
                          "bg-indigo-100 border-indigo-400 text-indigo-900 shadow-sm"
                        : "bg-white border-gray-200 hover:bg-gray-50"
                      }`}
                aria-pressed={isSelected}
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 flex-shrink-0 text-center font-bold text-sm text-gray-700">
                    {String.fromCharCode(65 + idx)}.
                  </div>
                  <div className="text-gray-700">{opt}</div>
                </div>
                {isSelected && (
                  <div className="text-indigo-700 font-medium">Selected</div>
                )}
              </button>
            );
          })}
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              disabled={current === 0}
              className={`px-4 py-2 rounded-md font-semibold ${
                current === 0 ?
                  "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Previous
            </button>

            <button
              onClick={() => toggleMark(current)}
              className={`px-4 py-2 rounded-md font-semibold border ${
                marked[current] ?
                  "bg-orange-200 border-orange-400 text-orange-800"
                : "bg-white border-gray-300 text-gray-700 hover:bg-orange-50"
              }`}
            >
              {marked[current] ? "Marked for review" : "Mark for review"}
            </button>

            <button
              onClick={() => clearAnswer(current)}
              className="px-3 py-2 rounded-md text-sm bg-white border text-gray-700 hover:bg-gray-50"
              title="Clear your selected answer for this question"
            >
              Clear Answer
            </button>
          </div>

          <div>
            {current === TOTAL_QUESTIONS - 1 ?
              <button
                onClick={() => setShowSubmitModal(true)}
                disabled={selected === null && answers[current] === undefined}
                className={`px-5 py-2 rounded-md font-semibold ${
                  selected === null && answers[current] === undefined ?
                    "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
                }`}
              >
                Submit & View Report
              </button>
            : <button
                onClick={next}
                disabled={selected === null}
                className={`px-5 py-2 rounded-md font-semibold ${
                  selected === null ?
                    "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Next
              </button>
            }
          </div>
        </div>
      </div>
    </section>
  );
};

export default MCQQuestionArea;
