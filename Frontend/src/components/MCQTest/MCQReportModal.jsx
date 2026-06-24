import React from "react";
// RUNE Learning MCQ Report Modal

const MCQReportModal = ({
  showReportModal,
  setShowReportModal,
  report,
  topicName,
  TOTAL_QUESTIONS,
  navigate,
}) => {
  if (!showReportModal || !report) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/gpt-image-2_A_minimalist_flat_vector_logo_for_Rune_Learning_showing_a_stylized_R_letter_desi-0.jpg" alt="RUNE Learning" className="h-10" />
            <div>
              <h2 className="text-2xl font-bold text-indigo-700">
                Practice Test Report
              </h2>
              <p className="text-sm text-gray-500">RUNE Learning — {topicName}</p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-sm text-gray-500">Time Taken</div>
            <div className="font-semibold">
              {Math.floor(report.timeTaken / 60)}m {report.timeTaken % 60}s
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="p-4 bg-indigo-50 rounded">
            <div className="text-sm text-gray-500">Score</div>
            <div className="text-2xl font-bold text-indigo-700">
              {report.score} / {TOTAL_QUESTIONS}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              ({report.percentage.toFixed(1)}%)
            </div>
          </div>

          <div className="p-4 bg-indigo-50 rounded">
            <div className="text-sm text-gray-500">Correct</div>
            <div className="text-2xl font-bold text-green-600">
              {report.correct}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Wrong:{" "}
              <span className="font-semibold text-red-600">{report.wrong}</span>
            </div>
          </div>

          <div className="p-4 bg-indigo-50 rounded">
            <div className="text-sm text-gray-500">Attempted</div>
            <div className="text-2xl font-bold text-gray-800">
              {report.attempted}
            </div>
            <div className="text-sm text-gray-500 mt-1">
              Unread: <span className="font-semibold">{report.unread}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-white rounded border">
          <p className="text-indigo-800 font-semibold">
            {report.percentage >= 70 ?
              "Great work — keep it up!"
            : "Keep practicing — progress comes with consistency."}
          </p>
          <p className="text-sm text-gray-700 mt-2">
            Tip: Review the questions you marked for review and the ones you
            answered incorrectly. Use focused sessions and revise weak topics.
          </p>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => {
              setShowReportModal(false);
              navigate(-1);
            }}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
          >
            Back
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
          >
            Retry
          </button>
          <button
            onClick={() => setShowReportModal(false)}
            className="px-4 py-2 rounded-md bg-white border text-indigo-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MCQReportModal;
