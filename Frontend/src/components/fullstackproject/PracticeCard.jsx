import React from "react";
import { useNavigate } from "react-router-dom";
import { projectIcons } from "../../data/projectIcons";
import { FiCheckCircle } from "react-icons/fi";

export default function PracticeCard({ problem, results }) {
  const navigate = useNavigate();
  const iconData = projectIcons[problem.type];

  const handleStart = () => {
    navigate("/code-playground", { state: { problem } });
  };

  const passedCount = results?.filter((r) => r.pass).length;
  const totalCount = results?.length;
  const allPassed = passedCount === totalCount;

  return (
    <div className="bg-white border rounded-lg shadow-md p-4 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{problem.title}</h3>

        <div className="flex space-x-2 mt-2">
          {iconData?.Icon.map((Icon, index) => (
            <Icon
              key={index}
              className="text-2xl"
              style={{ color: iconData.color[index] }}
            />
          ))}
        </div>
      </div>

      {results && (
        <div className="mt-4 text-sm">
          {allPassed ? (
            <p className="flex items-center text-green-600">
              <FiCheckCircle className="mr-1" /> All tests passed!
            </p>
          ) : (
            <p className="text-gray-500">
              {passedCount} / {totalCount} passed
            </p>
          )}
        </div>
      )}

      <button
        onClick={handleStart}
        className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition w-full"
      >
        Start
      </button>
    </div>
  );
}
