import {
  FaCode,
  FaDatabase,
  FaComments,
  FaBrain
} from "react-icons/fa";

export const tabs = [
  {
    title: "Tech Prep 1",
    color: "from-sky-50 to-indigo-50",
    icon: <FaCode className="text-indigo-500 text-2xl" />,
    content: [
      {
        title: "Data Structures & Algorithms",
        desc: "Solve problems on arrays, stacks, queues, trees, and graphs.",
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
    color: "from-violet-50 to-purple-50",
    icon: <FaDatabase className="text-violet-500 text-2xl" />,
    content: [
      {
        title: "System Design",
        desc: "Understand scalability, caching, load balancing, and APIs.",
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
    color: "from-pink-50 to-rose-50",
    icon: <FaComments className="text-pink-500 text-2xl" />,
    content: [
      {
        title: "Mock Interviews",
        desc: "Improve confidence and communication with interview practice.",
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
    color: "from-emerald-50 to-green-50",
    icon: <FaBrain className="text-emerald-500 text-2xl" />,
    content: [
      {
        title: "Quantitative Ability",
        desc: "Practice percentages, ratios, speed math and DI.",
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
