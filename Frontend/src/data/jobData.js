export const jobData = [
  /* -------------------------------------------------------
     AMAZON — Frontend Developer
  ------------------------------------------------------- */
  {
    _id: "job101",
    companyName: "Amazon",
    logo: "amazon_logo",
    role: "Frontend Developer",
    location: "Remote",
    ctc: "6 - 10 LPA",
    openings: 3,
    applyBy: "2025-11-20",
    status: "open",

    techStack: ["html", "css", "javascript", "react"],

    aboutCompany: {
      website: "https://www.amazon.com",
      linkedin: "https://www.linkedin.com/company/amazon",
      description:
        "Amazon is a global leader in e-commerce, cloud computing (AWS), and AI-driven digital innovation.",
    },

    eligibility: [
      "B.Tech / B.E in any branch",
      "Strong problem-solving ability",
      "Passout years: 2023–2025",
    ],

    skillsRequired: [
      "React.js",
      "JavaScript (ES6+)",
      "REST APIs",
      "Responsive Web Design",
    ],

    hiringProcess: [
      "Online Coding Test",
      "System Design + Frontend Round",
      "Bar Raiser Round",
    ],

    // ⭐ User already applied — 2 stages completed
    jobUpdates: [
      { title: "Online Coding Test", date: "02 Feb 2025" },
      { title: "System Design + Frontend Round", date: "05 Feb 2025" },
    ],
  },

  /* -------------------------------------------------------
     ACCENTURE — Machine Learning Engineer
  ------------------------------------------------------- */
  {
    _id: "job102",
    companyName: "Accenture",
    logo: "accenture_logo",
    role: "Machine Learning Engineer",
    location: "Hyderabad",
    ctc: "12 - 22 LPA",
    openings: 2,
    applyBy: "2025-12-01",
    status: "open",

    techStack: ["python", "tensorflow", "pytorch", "docker"],

    aboutCompany: {
      website: "https://www.accenture.com",
      linkedin: "https://www.linkedin.com/company/accenture",
      description:
        "Accenture is a global technology and consulting company delivering AI-powered enterprise solutions at scale.",
    },

    eligibility: [
      "B.Tech / M.Tech in CS, IT, AI/ML",
      "Knowledge of Statistics & Probability",
      "Strong coding fundamentals",
    ],

    skillsRequired: [
      "TensorFlow / PyTorch",
      "Model Deployment (Docker)",
      "Data Preprocessing",
      "Python Ecosystem (NumPy, Pandas)",
    ],

    hiringProcess: [
      "ML Coding Round",
      "Deep Learning Technical Round",
      "Case Study / Architecture Round",
      "Managerial Round",
      "HR Round",
    ],

    // ⭐ User applied recently — only 1 stage
    jobUpdates: [{ title: "ML Coding Round", date: "25 Jan 2025" }],
  },

  /* -------------------------------------------------------
     TCS — Software Engineer
  ------------------------------------------------------- */
  {
    _id: "job103",
    companyName: "TCS",
    logo: "tcs_logo",
    role: "Software Engineer",
    location: "Bangalore",
    ctc: "5 - 8 LPA",
    openings: 10,
    applyBy: "2025-10-15",
    status: "open",

    techStack: ["java", "spring", "sql", "aws"],

    aboutCompany: {
      website: "https://www.tcs.com",
      linkedin: "https://www.linkedin.com/company/tcs",
      description:
        "TCS is a global IT services and consulting organization known for enterprise-scale engineering.",
    },

    eligibility: [
      "B.Tech / B.E / MCA",
      "60% across 10th, 12th, and graduation",
      "No active backlogs",
    ],

    skillsRequired: [
      "Core Java & OOP",
      "Spring Boot",
      "SQL / RDBMS",
      "Basic AWS",
    ],

    hiringProcess: [
      "National Qualifier Test (NQT)",
      "Technical Interview",
      "Managerial Discussion",
      "HR Interview",
    ],

    // ⭐ This user is far into the process (3 steps done)
    jobUpdates: [
      { title: "National Qualifier Test (NQT)", date: "14 Dec 2024" },
      { title: "Technical Interview", date: "20 Dec 2024" },
      { title: "Managerial Discussion", date: "24 Dec 2024" },
    ],
  },

  /* -------------------------------------------------------
     WIPRO — Cloud Engineer
  ------------------------------------------------------- */
  {
    _id: "job104",
    companyName: "Wipro",
    logo: "wipro_logo",
    role: "Cloud Engineer",
    location: "Pune",
    ctc: "6 - 12 LPA",
    openings: 5,
    applyBy: "2025-09-28",
    status: "open",

    techStack: ["azure", "docker", "kubernetes", "linux"],

    aboutCompany: {
      website: "https://www.wipro.com",
      linkedin: "https://www.linkedin.com/company/wipro",
      description:
        "Wipro is a global leader in cloud modernization, digital transformation, and platform engineering.",
    },

    eligibility: [
      "B.Tech / B.E in CS, IT, ECE",
      "Basic cloud understanding",
      "Good Linux fundamentals",
    ],

    skillsRequired: [
      "Azure Cloud",
      "Kubernetes",
      "Docker",
      "Linux Admin",
      "CI/CD Pipelines",
    ],

    hiringProcess: [
      "Online Test",
      "Cloud Architecture Interview",
      "DevOps Round",
      "HR Discussion",
    ],

    // ⭐ This user has completed the entire process 🎉
    jobUpdates: [
      { title: "Online Test", date: "10 Jan 2025" },
      { title: "Cloud Architecture Interview", date: "12 Jan 2025" },
      { title: "DevOps Round", date: "16 Jan 2025" },
      { title: "HR Discussion", date: "18 Jan 2025" },
      { title: "Selected 🎉", date: "20 Jan 2025" },
    ],
  },
];
