import React from "react";

const MCQInstructions = () => {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h4 className="font-semibold text-indigo-700 mb-2">How the grid works</h4>
      <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-1">
        <li>
          Jump to any question using the grid; right panel scrolls
          independently.
        </li>
        <li>Answered questions show green. Marked items show orange.</li>
        <li>
          Next is enabled only after selecting an option for the current
          question.
        </li>
        <li>
          Use "Mark for review" to revisit later; it does not clear your answer
          unless you clear it.
        </li>
        <li>
          Global Submit is available in the header — confirm before final
          submission.
        </li>
      </ol>
    </div>
  );
};

export default MCQInstructions;
