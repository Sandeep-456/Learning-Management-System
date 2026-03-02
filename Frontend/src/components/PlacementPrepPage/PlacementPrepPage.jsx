import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  FaCode,
  FaDatabase,
  FaComments,
  FaBrain,
  FaCheckCircle,
} from "react-icons/fa";

const tabs = [
  {
    title: "Tech Prep 1",
    icon: <FaCode />,
    content: [
      {
        title: "Data Structures & Algorithms",
        desc: "Arrays, stacks, queues, trees, and graphs.",
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
        desc: "OOPs, DBMS, Operating Systems.",
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
    icon: <FaDatabase />,
    content: [
      {
        title: "System Design",
        desc: "Scalability, caching, APIs, load balancing.",
        steps: [
          { name: "Scalability Basics", done: false },
          { name: "Caching", done: false },
          { name: "API Design", done: false },
        ],
      },
    ],
  },
  {
    title: "Spoken English",
    icon: <FaComments />,
    content: [
      {
        title: "Interview Communication",
        desc: "HR rounds, clarity, and confidence.",
        steps: [
          { name: "HR Practice", done: true },
          { name: "Technical Explanation", done: true },
          { name: "Confidence Building", done: false },
        ],
      },
    ],
  },
  {
    title: "Aptitude",
    icon: <FaBrain />,
    content: [
      {
        title: "Quant & Reasoning",
        desc: "Maths and logical reasoning.",
        steps: [
          { name: "Percentages", done: true },
          { name: "Speed Math", done: false },
          { name: "Logical Puzzles", done: false },
        ],
      },
    ],
  },
];

export default function PlacementPrepPage() {
  const [active, setActive] = React.useState(0);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f7f9fc] p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-semibold text-indigo-900">
            Placement Preparation
          </h1>
          <p className="text-sm text-indigo-700 mt-1">
            Structured academic preparation for placements.
          </p>
        </div>

        <div className="flex gap-8">
          {/* LEFT – ROADMAP STYLE MODULE LIST */}
          {/* LEFT – CLEAN LMS ROADMAP */}
          <div
            className="relative w-[260px] bg-white rounded-2xl p-6
  shadow-[0_8px_24px_rgba(49,46,129,0.14)]"
          >
            {/* MAIN ROADMAP LINE */}
            <div className="absolute left-[45px] top-[50px] h-[300px] bottom-[50px] w-[3px] bg-indigo-200" />

            <div className="space-y-12 relative z-10">
              {tabs.map((t, i) => {
                const completed = i < active;
                const current = i === active;

                return (
                  <div
                    key={i}
                    className="relative flex items-center gap-4 mb-15"
                  >
                    {/* PROGRESS LINE (COLORED PART) */}
                    {completed && (
                      <div className="absolute left-[40px] top-[-48px] h-[30px] w-[2px] bg-indigo-900" />
                    )}

                    {/* ICON */}
                    <div
                      onClick={() => setActive(i)}
                      className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer
            ${
              current || completed ?
                "bg-indigo-900 text-white"
              : "bg-indigo-50 text-indigo-700 border border-indigo-300"
            }
            shadow-[0_4px_12px_rgba(49,46,129,0.25)]`}
                    >
                      {t.icon}
                    </div>

                    {/* TEXT */}
                    <div>
                      <p className="text-sm font-semibold text-indigo-900">
                        {t.title}
                      </p>
                      <p className="text-xs text-indigo-600">
                        Placement module
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT – FIXED SIZE CONTENT CARD */}
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="flex-1 h-[520px] bg-white rounded-3xl p-8
            shadow-[0_20px_50px_rgba(49,46,129,0.2)]
            overflow-hidden"
          >
            <h2 className="text-xl font-semibold text-indigo-900 mb-6">
              {tabs[active].title}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {tabs[active].content.map((c, idx) => (
                <div
                  key={idx}
                  className="h-[380px] border border-indigo-100 rounded-2xl p-6
                  bg-[#fbfcff]
                  shadow-[inset_4px_4px_10px_rgba(49,46,129,0.08)] flex flex-col"
                >
                  <h3 className="text-base font-semibold text-indigo-900">
                    {c.title}
                  </h3>
                  <p className="text-sm text-indigo-700 mt-1">{c.desc}</p>

                  <div className="mt-5 relative pl-10 space-y-4">
                    {/* ROADMAP LINE */}
                    <div className="absolute left-[55px] top-2 bottom-2 w-[3px] bg-indigo-200" />

                    {c.steps.map((s, i) => {
                      const completedIndex = 0; // ONLY first topic completed
                      const currentIndex = 1; // NEXT topic highlighted

                      const isCompleted = i === completedIndex;
                      const isCurrent = i === currentIndex;

                      return (
                        <div
                          key={i}
                          className="relative flex items-center gap-4"
                        >
                          {/* STEP CIRCLE */}
                          <div
                            className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center text-sm
          ${
            isCompleted ?
              "bg-indigo-900 text-white shadow-[0_6px_14px_rgba(49,46,129,0.35)]"
            : isCurrent ?
              "bg-indigo-50 border-2 border-indigo-900 text-indigo-900 shadow-[0_0_0_5px_rgba(49,46,129,0.18)]"
            : "bg-white border border-indigo-300 text-indigo-700"
          }`}
                          >
                            {isCompleted && "✓"}
                          </div>

                          {/* STEP TEXT */}
                          <span
                            className={`text-sm
          ${isCurrent ? "font-semibold text-indigo-900" : "text-indigo-900"}`}
                          >
                            {s.name}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-auto flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      onClick={() => navigate(`/practice/${active}/${idx}`)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg
                      bg-indigo-900 text-white text-sm font-medium
                      shadow-[0_10px_25px_rgba(49,46,129,0.35)]"
                    >
                      <FaCheckCircle />
                      Resume
                    </motion.button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
