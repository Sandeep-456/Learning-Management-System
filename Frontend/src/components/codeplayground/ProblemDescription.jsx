import React from "react";

export default function ProblemDescription({ problem }) {
  return (
    <div className="p-4 bg-gray-800 text-white h-full overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">{problem.title}</h2>
      <div
        className="prose prose-invert"
        dangerouslySetInnerHTML={{ __html: problem.description }}
      />

      <h3 className="text-lg font-semibold mt-6 mb-2">Examples</h3>
      <div className="space-y-4">
        {problem.examples.map((ex, i) => (
          <div key={i} className="bg-gray-700 p-3 rounded">
            <p className="font-mono text-sm">
              <strong>Input:</strong> {ex.input}
            </p>
            <p className="font-mono text-sm">
              <strong>Output:</strong> {ex.output}
            </p>
          </div>
        ))}
      </div>

      <h3 className="text-lg font-semibold mt-6 mb-2">Test Cases</h3>
      <div className="space-y-2">
        {problem.testcases.map((tc, i) => (
          <div key={i} className="bg-gray-700 p-3 rounded">
            <p className="font-mono text-sm">
              <strong>Input:</strong> {tc.input}
            </p>
            <p className="font-mono text-sm">
              <strong>Expected:</strong> {tc.expected}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
