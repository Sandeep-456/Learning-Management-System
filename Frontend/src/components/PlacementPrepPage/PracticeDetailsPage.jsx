import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

export default function PracticeDetailsPage() {
  const { tabIndex, contentIndex } = useParams();
  const navigate = useNavigate();

  // SAME DATA FROM PlacementPrepPage (no import required)
  const tabs = [
    {
      title: "Tech Prep 1",
      content: [
        {
          title: "Data Structures & Algorithms",
          desc: "Solve problems on arrays, stacks, queues, trees, and graphs.",
          details: `Data Structures help store and manage data efficiently.
Algorithms tell us how to solve a problem step by step.

💡 Topics you will learn:
• Arrays  
• Stacks  
• Queues  
• Trees  
• Graphs  

These are highly important for interviews.`,
          steps: [
            { name: "Arrays", done: true },
            { name: "Stacks", done: false },
            { name: "Queues", done: false },
            { name: "Trees", done: false },
            { name: "Graphs", done: false },
          ],
        },
        {
          title: "Core Concepts",
          desc: "Revise OOPs, DBMS, and Operating Systems.",
          details: `Core concepts required for any development job:

• OOPs – inheritance, polymorphism, abstractions  
• DBMS – indexing, joins, SQL queries  
• OS – processes, threads, memory allocation  
`,
          steps: [
            { name: "OOPs", done: true },
            { name: "DBMS", done: true },
            { name: "Operating Systems", done: false },
          ],
        },
      ],
    },

    {
      title: "Tech Prep 2",
      content: [
        {
          title: "System Design",
          desc: "Understand scalability, caching, load balancing, and APIs.",
          details: `System Design teaches scalable app development.

• Load balancing  
• Caching  
• Database sharding  
• API architecture  
`,
          steps: [
            { name: "Scalability Basics", done: false },
            { name: "Caching", done: false },
            { name: "Load Balancing", done: false },
            { name: "Database Sharding", done: false },
            { name: "API Design", done: false },
          ],
        },
        {
          title: "Project Architecture",
          desc: "Learn how to structure a production-ready application.",
          details: `Software architecture includes:

• Folder structure  
• Modules  
• Reusable components  
• Controller-service-repository patterns  
`,
          steps: [
            { name: "Folder Structure", done: false },
            { name: "Layered Architecture", done: false },
            { name: "Reusable Components", done: false },
          ],
        },
      ],
    },

    {
      title: "Spoken English",
      content: [
        {
          title: "Mock Interviews",
          desc: "Improve confidence and communication with interview practice.",
          details: `Mock interviews build confidence & fluency.

• HR round  
• Technical Q&A  
• Confidence building  
`,
          steps: [
            { name: "HR Round Practice", done: true },
            { name: "Technical Q&A", done: true },
            { name: "Fluency Improvement", done: false },
            { name: "Confidence Building", done: false },
          ],
        },
        {
          title: "Group Discussions",
          desc: "Participate in GDs to improve communication skills.",
          details: `Group Discussions help improve:

• Logical speaking  
• Communication  
• Team behavior  
`,
          steps: [
            { name: "Speaking Order", done: true },
            { name: "Logical Arguments", done: false },
            { name: "Conclusion Skills", done: false },
          ],
        },
      ],
    },

    {
      title: "Aptitude",
      content: [
        {
          title: "Quantitative Ability",
          desc: "Practice percentages, ratios, speed math and DI.",
          details: `Quantitative aptitude improves problem solving.

• Percentages  
• Profit & Loss  
• Data Interpretation  
`,
          steps: [
            { name: "Speed Math", done: true },
            { name: "Percentages", done: true },
            { name: "Profit & Loss", done: false },
            { name: "Data Interpretation", done: false },
          ],
        },
        {
          title: "Logical Reasoning",
          desc: "Puzzles, seating arrangements, analytical reasoning.",
          details: `Logical reasoning improves analytical thinking.

• Puzzles  
• Seating arrangement  
• Blood relations  
`,
          steps: [
            { name: "Puzzles", done: false },
            { name: "Seating Arrangements", done: false },
            { name: "Blood Relations", done: false },
            { name: "Logic Sets", done: false },
          ],
        },
      ],
    },
  ];

  // PICK CORRECT CONTENT
  const content = tabs[tabIndex].content[contentIndex];

  return (
    <div className="p-6 sm:p-10">

      <button
        onClick={() => navigate(-1)}
        className="text-purple-700 hover:underline mb-4"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold text-slate-900">{content.title}</h1>
      <p className="text-slate-600 mt-2">{content.desc}</p>

      {/* DETAILS SECTION */}
      <h2 className="mt-8 text-xl font-semibold">Detailed Explanation</h2>
      <p className="mt-3 bg-gray-100 p-4 rounded-xl whitespace-pre-wrap text-slate-700">
        {content.details}
      </p>

      {/* STEPS */}
      <h2 className="mt-8 text-xl font-semibold">Steps</h2>

      <div className="mt-4 space-y-4">
        {content.steps.map((step, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-4 bg-white border rounded-xl shadow-sm"
          >
            {step.done ? (
              <FaCheckCircle className="text-green-600 text-xl" />
            ) : (
              <div className="w-5 h-5 border-2 border-gray-400 rounded-full"></div>
            )}

            <span className="text-lg">{step.name}</span>
          </div>
        ))}
      </div>

      <button className="mt-10 px-6 py-3 bg-violet-700 text-white rounded-xl shadow-md">
        Continue Practicing
      </button>
    </div>
  );
}
