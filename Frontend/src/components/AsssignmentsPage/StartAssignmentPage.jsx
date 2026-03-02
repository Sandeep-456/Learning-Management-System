import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaClock, FaStar } from "react-icons/fa";

export default function StartAssignmentPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Only PENDING assignments here
  const pendingAssignments = [
    {
      id: 1,
      title: "JavaScript Functions Assignment",
      course: "JavaScript Fundamentals Course",
      desc: "Create a calculator application using JavaScript functions. Include basic arithmetic operations and error handling.",
      due: "Dec 15, 2024",
      est: "2 hours",
      points: 100,
      instructions: [
        "Create HTML, CSS, JS files",
        "Build a calculator UI",
        "Add + - * / operations",
        "Add error handling (divide by zero)",
        "Push to GitHub and submit link"
      ]
    },
    {
      id: 2,
      title: "User Interface Mockup",
      course: "UI/UX Design Principles Course",
      desc: "Design a mobile UI for a food delivery app. Include wireframes and high-fidelity screens.",
      due: "Dec 20, 2024",
      est: "4 hours",
      points: 150,
      instructions: [
        "Create 5 mobile wireframes",
        "Design UI screens in Figma",
        "Use consistent colors & typography",
        "Export design assets",
        "Submit Figma link"
      ]
    }
  ];

  const assignment = pendingAssignments.find((a) => a.id === Number(id));

  if (!assignment) {
    return <div className="p-10 text-red-600 text-xl">Assignment Not Found</div>;
  }

  return (
    <div className="p-6 sm:p-10">
      <button onClick={() => navigate(-1)} className="text-purple-700 mb-4 hover:underline">
        ← Back
      </button>

      <h1 className="text-3xl font-bold">{assignment.title}</h1>
      <p className="text-gray-600 mt-1">{assignment.course}</p>

      {/* DETAILS */}
      <div className="mt-4 flex flex-wrap gap-6 text-gray-700 text-sm">
        <div className="flex items-center gap-2">
          <FaCalendarAlt />
          Due: {assignment.due}
        </div>

        <div className="flex items-center gap-2">
          <FaClock />
          Estimated: {assignment.est}
        </div>

        <div className="flex items-center gap-2">
          <FaStar className="text-yellow-500" />
          Points: {assignment.points}
        </div>
      </div>

      {/* DESCRIPTION */}
      <h2 className="mt-8 text-xl font-semibold">Description</h2>
      <p className="text-gray-700 mt-2">{assignment.desc}</p>

      {/* INSTRUCTIONS */}
      <h2 className="mt-8 text-xl font-semibold">Instructions</h2>
      <ul className="list-disc ml-6 mt-3 text-gray-700">
        {assignment.instructions.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ul>

      {/* BUTTON */}
      <button
        onClick={() => navigate(`/assignment/${assignment.id}/workspace`)}
        className="mt-10 px-6 py-3 bg-purple-700 text-white rounded-lg shadow-lg"
      >
        Start Working
      </button>
    </div>
  );
}
