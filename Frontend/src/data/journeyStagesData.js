export const stagesData = [
  {
    stage: "Stage 1 – Basics",
    progress: 70,
    description:
      "Build a strong foundation in HTML, CSS, and JavaScript — the core of web development.",
    startDate: "Started: Oct 5, 2025",
    endDate: "Target: Nov 10, 2025",
    topics: [
      { id: 1, name: "HTML & CSS Fundamentals", status: "Completed" },
      { id: 2, name: "JavaScript Essentials", status: "In Progress" },
      { id: 3, name: "Git & GitHub Basics", status: "Pending" },
    ],
    icon: null, // React icons will be passed as props if needed
  },
  {
    stage: "Stage 2 – Intermediate",
    progress: 45,
    description:
      "Advance your React and Node.js skills to create complete MERN stack applications.",
    startDate: "Started: Nov 12, 2025",
    endDate: "Target: Dec 20, 2025",
    topics: [
      { id: 4, name: "React Components & Hooks", status: "In Progress" },
      { id: 5, name: "Node.js & Express Basics", status: "Pending" },
      { id: 6, name: "RESTful API Integration", status: "Pending" },
    ],
    icon: null,
  },
  {
    stage: "Stage 3 – Advanced",
    progress: 20,
    description:
      "Work with databases, authentication, and deployment strategies for production-level projects.",
    startDate: "Started: Dec 22, 2025",
    endDate: "Target: Jan 30, 2026",
    topics: [
      { id: 7, name: "MongoDB & Mongoose ORM", status: "Pending" },
      { id: 8, name: "JWT Authentication & Middleware", status: "Pending" },
      { id: 9, name: "Deployment & CI/CD Basics", status: "Pending" },
    ],
    icon: null,
  },
];
