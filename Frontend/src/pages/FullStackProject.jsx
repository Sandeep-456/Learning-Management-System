import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PracticeCard from "../components/fullstackproject/PracticeCard";
import ProjectCard from "../components/fullstackproject/ProjectCard";
import NewProjectModal from "../components/fullstackproject/NewProjectModal";
import { FiPlus } from "react-icons/fi";
import {
  loadFiles,
  saveFiles,
} from "../components/codeplayground/corelogic/fileSystem";

const practiceProblems = [
  {
    id: "palindrome-check",
    title: "Palindrome Check",
    type: "javascript",
    description:
      "A palindrome is a word, phrase, number, or other sequence of characters that reads the same backward as forward. This problem requires you to write a function that checks if a given string is a palindrome.",
    examples: [
      { input: '"racecar"', output: "true" },
      { input: '"hello"', output: "false" },
    ],
    testcases: [
      { input: "'A man, a plan, a canal: Panama'", expected: "true" },
      { input: "'race a car'", expected: "false" },
      { input: "'level'", expected: "true" },
    ],
    starterCode:
      "function isPalindrome(str) {\n  const cleaned = str.toLowerCase().replace(/[\\W_]/g, '');\n  const reversed = cleaned.split('').reverse().join('');\n  return cleaned === reversed;\n}",
  },
  {
    id: "count-digits",
    title: "Count Digits in a Number",
    type: "python",
    description:
      "Write a function that takes an integer as input and returns the number of digits in that integer. The input will always be a non-negative integer.",
    examples: [
      { input: "123", output: "3" },
      { input: "98765", output: "5" },
    ],
    testcases: [
      { input: "0", expected: "1" },
      { input: "123456789", expected: "9" },
      { input: "42", expected: "2" },
    ],
    starterCode:
      "def count_digits(n):\n  if n == 0:\n    return 1\n  count = 0\n  while n > 0:\n    n //= 10\n    count += 1\n  return count",
  },
  {
    id: "largest-element",
    title: "Find the Largest Element in an Array",
    type: "javascript",
    description:
      "Given an array of numbers, write a function to find the largest element in the array. The array will not be empty.",
    examples: [
      { input: "[1, 2, 3, 4, 5]", output: "5" },
      { input: "[10, 20, 5, 15]", output: "20" },
    ],
    testcases: [
      { input: "[-1, -5, -3]", expected: "-1" },
      { input: "[100, 200, 50]", expected: "200" },
      { input: "[42]", expected: "42" },
    ],
    starterCode:
      "function findLargestElement(arr) {\n  let largest = arr[0];\n  for (let i = 1; i < arr.length; i++) {\n    if (arr[i] > largest) {\n      largest = arr[i];\n    }\n  }\n  return largest;\n}",
  },
];

export default function FullStackProject() {
  const [testResults, setTestResults] = useState({});
  const [userProjects, setUserProjects] = useState(loadFiles());
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const results = {};
    practiceProblems.forEach((p) => {
      try {
        const stored = localStorage.getItem(`testResults-${p.id}`);
        if (stored) {
          results[p.id] = JSON.parse(stored);
        }
      } catch (e) {
        console.error("Failed to parse test results from localStorage", e);
      }
    });
    setTestResults(results);
  }, []);

  const handleCreateProject = (name, type) => {
    let newFile;
    if (type === "javascript") {
      newFile = { type: "js", code: "// New JavaScript file" };
    } else if (type === "python") {
      newFile = { type: "py", code: "# New Python file" };
    } else {
      newFile = {
        type: "web",
        html: "<h1>New Web Project</h1>",
        css: "",
        js: "",
      };
    }

    const updatedProjects = {
      ...userProjects,
      [name]: newFile,
    };

    saveFiles(updatedProjects);
    setUserProjects(updatedProjects);
    setShowNewProjectModal(false);

    navigate("/code-playground", { state: { file: newFile, fileName: name } });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Practice Coding Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Practice Coding
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {practiceProblems.map((problem) => (
            <PracticeCard
              key={problem.id}
              problem={problem}
              results={testResults[problem.id]}
            />
          ))}
        </div>
      </div>

      {/* My Projects Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">My Projects</h2>
          <button
            onClick={() => setShowNewProjectModal(true)}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            <FiPlus className="mr-2" />
            New Project
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(userProjects).map(([name, file]) => (
            <ProjectCard key={name} name={name} file={file} />
          ))}
        </div>
      </div>

      {showNewProjectModal && (
        <NewProjectModal
          onCancel={() => setShowNewProjectModal(false)}
          onCreate={handleCreateProject}
        />
      )}
    </div>
  );
}
