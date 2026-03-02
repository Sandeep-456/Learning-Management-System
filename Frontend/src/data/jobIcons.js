// ----------------------------
// FULL STACK ICONS
// ----------------------------
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiGit,
  SiGithub,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiReact,
  SiRedux,
  SiDocker,
  SiKubernetes,
  SiAmazon,
  SiFirebase,
  SiGooglecloud,
  SiAwslambda,
  SiPython,
  SiNumpy,
  SiPandas,
  SiScikitlearn,
  SiTensorflow,
  SiPytorch,
  SiMysql,
  SiFastapi,
  SiFlask,
  SiStreamlit,
  SiOpencv,
  SiLinux,
  SiSpring,
} from "react-icons/si";

import { FaMicrosoft, FaJava } from "react-icons/fa";

// ----------------------------
// FULL STACK TOOLS
// ----------------------------
const fullStackTools = {
  html: {
    name: "HTML",
    Icon: SiHtml5,
    color: "#E34F26",
    desc: "Markup language for building web pages",
  },
  css: {
    name: "CSS",
    Icon: SiCss3,
    color: "#1572B6",
    desc: "Stylesheet language for UI design",
  },
  javascript: {
    name: "JavaScript",
    Icon: SiJavascript,
    color: "#F7DF1E",
    desc: "Core language for web development",
  },
  git: {
    name: "Git",
    Icon: SiGit,
    color: "#F05032",
    desc: "Version control system",
  },
  github: {
    name: "GitHub",
    Icon: SiGithub,
    color: "#181717",
    desc: "Code hosting & collaboration",
  },
  node: {
    name: "Node.js",
    Icon: SiNodedotjs,
    color: "#3C873A",
    desc: "Backend JavaScript runtime",
  },
  express: {
    name: "Express.js",
    Icon: SiExpress,
    color: "#000000",
    desc: "Backend framework",
  },
  mongo: {
    name: "MongoDB",
    Icon: SiMongodb,
    color: "#47A248",
    desc: "NoSQL Database",
  },
  postgres: {
    name: "PostgreSQL",
    Icon: SiPostgresql,
    color: "#336791",
    desc: "SQL Database",
  },
  react: {
    name: "React.js",
    Icon: SiReact,
    color: "#61DAFB",
    desc: "Frontend JS library",
  },
  redux: {
    name: "Redux",
    Icon: SiRedux,
    color: "#764ABC",
    desc: "State management",
  },
  docker: {
    name: "Docker",
    Icon: SiDocker,
    color: "#0db7ed",
    desc: "Containerization & DevOps",
  },
  k8s: {
    name: "Kubernetes",
    Icon: SiKubernetes,
    color: "#326CE5",
    desc: "Container orchestration",
  },
  aws: {
    name: "AWS",
    Icon: SiAmazon,
    color: "#FF9900",
    desc: "Cloud computing",
  },
  firebase: {
    name: "Firebase",
    Icon: SiFirebase,
    color: "#FFCA28",
    desc: "Auth + hosting + DB",
  },
  gcp: {
    name: "GCP",
    Icon: SiGooglecloud,
    color: "#4285F4",
    desc: "Cloud services",
  },
  lambda: {
    name: "AWS Lambda",
    Icon: SiAwslambda,
    color: "#FF9900",
    desc: "Serverless compute",
  },
  linux: {
    name: "Linux",
    Icon: SiLinux,
    color: "#FCC624", // official Linux yellow
    desc: "Open-source operating system used in servers, DevOps and cloud environments",
  },

  spring: {
    name: "Spring Boot",
    Icon: SiSpring,
    color: "#6DB33F", // official Spring green
    desc: "Java framework for building production-ready backend applications",
  },

  java: {
    name: "Java",
    Icon: FaJava,
    color: "#E76F00", // official Java orange
    desc: "Popular programming language for enterprise, backend, and cloud systems",
  },
};

// ----------------------------
// AI / ML TOOLS
// ----------------------------
const aiMlTools = {
  python: {
    name: "Python",
    Icon: SiPython,
    color: "#3776AB",
    desc: "Core programming language for ML & AI",
  },
  numpy: {
    name: "NumPy",
    Icon: SiNumpy,
    color: "#013243",
    desc: "Numerical computing library",
  },
  pandas: {
    name: "Pandas",
    Icon: SiPandas,
    color: "#150458",
    desc: "Data manipulation library",
  },
  sklearn: {
    name: "Scikit-Learn",
    Icon: SiScikitlearn,
    color: "#F7931E",
    desc: "Machine learning algorithms",
  },
  tensorflow: {
    name: "TensorFlow",
    Icon: SiTensorflow,
    color: "#FF6F00",
    desc: "Deep learning framework",
  },
  pytorch: {
    name: "PyTorch",
    Icon: SiPytorch,
    color: "#EE4C2C",
    desc: "Deep learning framework for research",
  },
  sql: {
    name: "SQL",
    Icon: SiMysql,
    color: "#00618A",
    desc: "Querying & managing databases",
  },
  postgres: {
    name: "PostgreSQL",
    Icon: SiPostgresql,
    color: "#336791",
    desc: "Relational database",
  },
  mongo: {
    name: "MongoDB",
    Icon: SiMongodb,
    color: "#47A248",
    desc: "NoSQL database",
  },
  flask: {
    name: "Flask",
    Icon: SiFlask,
    color: "#000000",
    desc: "Backend API deployment",
  },
  fastapi: {
    name: "FastAPI",
    Icon: SiFastapi,
    color: "#009688",
    desc: "High-performance ML API deployment",
  },
  streamlit: {
    name: "Streamlit",
    Icon: SiStreamlit,
    color: "#FF4B4B",
    desc: "ML app front-end deployment",
  },
  docker: {
    name: "Docker",
    Icon: SiDocker,
    color: "#0db7ed",
    desc: "Containerization & MLOps",
  },
  kubernetes: {
    name: "Kubernetes",
    Icon: SiKubernetes,
    color: "#326CE5",
    desc: "Container orchestration for ML",
  },
  aws: {
    name: "AWS",
    Icon: SiAmazon,
    color: "#FF9900",
    desc: "Cloud hosting & ML services",
  },
  gcp: {
    name: "GCP",
    Icon: SiGooglecloud,
    color: "#4285F4",
    desc: "Cloud ML services",
  },
  azure: {
    name: "Azure",
    Icon: FaMicrosoft,
    color: "#008AD7",
    desc: "Microsoft AI cloud tools",
  },
  opencv: {
    name: "OpenCV",
    Icon: SiOpencv,
    color: "#5C3EE8",
    desc: "Computer Vision library",
  },
};

// ----------------------------
// FINAL MERGED EXPORT
// ----------------------------

export const JobIcons = {
  ...fullStackTools,
  ...aiMlTools,
};
