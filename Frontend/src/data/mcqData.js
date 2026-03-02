const mcqData = [
  {
    id: 1,
    question: "What is ReactJS?",
    options: [
      "A JavaScript library for building user interfaces",
      "A server-side framework",
      "A database management system",
      "An operating system",
    ],
    correctAnswer: 0,
  },
  {
    id: 2,
    question: "Which command is used to create a new React project?",
    options: [
      "npm build",
      "npm start",
      "npx create-react-app my-app",
      "npm install",
    ],
    correctAnswer: 2,
  },
  {
    id: 3,
    question: "What is JSX?",
    options: [
      "A JavaScript extension that allows you to write HTML directly within JavaScript",
      "A new data type in JavaScript",
      "A styling language for React",
      "A testing framework for React",
    ],
    correctAnswer: 0,
  },
  {
    id: 4,
    question: "In React, how do you handle state?",
    options: [
      "Using CSS",
      "Using props",
      "Using `useState` hook or `this.state` in class components",
      "Using external libraries only",
    ],
    correctAnswer: 2,
  },
  {
    id: 5,
    question: "What is the virtual DOM?",
    options: [
      "A direct manipulation of the browser's DOM",
      "A lightweight copy of the actual DOM, managed by React",
      "A server-side rendering technique",
      "A testing utility for React components",
    ],
    correctAnswer: 1,
  },
  {
    id: 6,
    question: "Which of the following is used to pass data to a component from its parent?",
    options: [
      "State",
      "Props",
      "Hooks",
      "Redux",
    ],
    correctAnswer: 1,
  },
  {
    id: 7,
    question: "What is an event in React?",
    options: [
      "A function that runs automatically",
      "An action that can be triggered by the user or system",
      "A type of component",
      "A lifecycle method",
    ],
    correctAnswer: 1,
  },
  {
    id: 8,
    question: "What does `setState()` do?",
    options: [
      "Directly modifies the component's state",
      "Asynchronously updates the component's state and re-renders the component",
      "Sends a request to the server",
      "Is used to define initial state",
    ],
    correctAnswer: 1,
  },
  {
    id: 9,
    question: "Which hook is used for side effects in functional components?",
    options: [
      "useState",
      "useContext",
      "useEffect",
      "useReducer",
    ],
    correctAnswer: 2,
  },
  {
    id: 10,
    question: "What is a component in React?",
    options: [
      "A standalone JavaScript file",
      "A reusable piece of UI that returns JSX",
      "A type of CSS stylesheet",
      "A database table",
    ],
    correctAnswer: 1,
  },
];

export default mcqData;