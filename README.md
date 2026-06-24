# RUNE Learning LMS (Learning Management System)

Welcome to **RUNE Learning LMS**! This is a modern, responsive, and highly interactive Learning Management System built for developers. The platform features an engaging design using claymorphic elements, smooth custom transitions, and features like progress trackers, live classes, lab assessments, MCQ practice modules, coding test suites, and project submission boards.

The application is structured into two main parts:
*   **Backend**: Node.js & Express REST API using MongoDB (Mongoose) and Firebase Admin SDK.
*   **Frontend**: React (Vite), styled with TailwindCSS and Framer Motion.

---

## 🌌 The Story Behind the Name: RUNE Learning

The word **Rune** refers to ancient alphabetic symbols used in early Germanic writing systems. Often associated with mystery, lore, and secret wisdom, runes were carved into stones to record historical events, secrets, and knowledge.

In modern technology, **RUNE Learning** serves as a symbolic bridge:
*   **Ancient to Modern**: Just as ancient scholars carved runes to preserve intelligence, modern software developers write syntax, equations, and code to program computers. Code is the modern "rune" of humanity.
*   **Symbolic Mastery**: Our platform unlocks the mysteries of programming, mathematics, and artificial intelligence, teaching students how to master these complex, modern digital runes to build the future.

---

## 🛠️ Tech Stack

*   **Frontend**: React 19, Vite, TailwindCSS, Framer Motion, Axios, React Icons.
*   **Backend**: Node.js, Express.js, Mongoose (MongoDB ODM), JWT, Firebase Admin (for token verification).
*   **Database**: MongoDB (Atlas Cloud Cluster).
*   **Auth**: Firebase Auth (Google Sign-In & Phone OTP) coupled with custom JWT-based sessions.

---

## 📂 Project Structure

```text
Rune_Learning_LMS/
├── Backend/              # Node.js & Express server code
│   ├── config/           # Database & Firebase configuration
│   ├── controllers/      # Route handler logic (auth, courses, schedules, etc.)
│   ├── middleware/       # JWT auth & route validation middleware
│   ├── models/           # Mongoose schemas (User, Profile, Course, Student, Sessions, etc.)
│   ├── routes/           # REST API endpoints
│   ├── utils/            # Helper utilities and database seeder
│   └── server.js         # Backend server entry point
│
└── Frontend/             # React application (Vite setup)
    ├── public/           # Static public assets (including the RUNE Learning logo)
    └── src/
        ├── assets/       # Media files and styles
        ├── components/   # Reusable UI elements (Layout, Topbar, Sidebar, Home panels)
        ├── context/      # React state contexts (AuthContext, CourseContext)
        ├── pages/        # Router pages (Home, Login, Profile)
        ├── utils/        # Axios API client setup
        └── main.jsx      # React mounting entry point
```

---

## 🚀 Getting Started

Follow these steps to get the application up and running on your local machine.

### Prerequisites
Make sure you have the following installed:
*   [Node.js](https://nodejs.org/) (v16+ recommended)
*   [npm](https://www.npmjs.com/) (Node package manager)
*   [MongoDB Compass](https://www.mongodb.com/products/tools/compass) (Optional - to view database collections visually)

---

### 1. Backend Setup

1.  **Navigate to the Backend directory**:
    ```bash
    cd Backend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure environment variables**:
    Create a file named `.env` in the `Backend` directory and add the following parameters:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_signature_secret
    CORS_ALLOWED_ORIGINS=http://localhost:5173
    FIREBASE_SERVICE_ACCOUNT_JSON={"type":"service_account", ...}
    ```
    > [!IMPORTANT]
    > **MongoDB Atlas Network Access**: If you are using a cloud-hosted MongoDB Atlas instance, ensure that your current IP address is whitelisted in the Atlas Dashboard (Network Access -> Add IP Address) to allow local connections.

4.  **Seed the Database**:
    Initialize the database with default courses, stages, subtopics, MCQ practice sets, coding questions, and a mock student account by running the seeder script:
    ```bash
    node utils/seeder.js
    ```
    This script will automatically clear previous dummy values and set up a fresh learning workspace.

5.  **Start the server in Development mode**:
    ```bash
    npm run dev
    ```
    The backend server will run on `http://localhost:5000`.

---

### 2. Frontend Setup

1.  **Navigate to the Frontend directory**:
    ```bash
    cd ../Frontend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure environment variables**:
    Create a file named `.env` in the `Frontend` directory with the following variables for Firebase Client and API config:
    ```env
    VITE_FIREBASE_API_KEY=your_firebase_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
    VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

    VITE_BACKEND_URL=http://localhost:5000/api
    ```

4.  **Start the Frontend dev server**:
    ```bash
    npm run dev
    ```
    The application will run on `http://localhost:5173`. Open this URL in your browser to log in!

---

## 🔑 Login Options for Development

After running the database seeder:
*   **Phone Login**: You can log in using the pre-seeded mobile number: `9876543210`.
*   **Google Sign-In**: Clicking Google Login will authenticate you through Google. On your first login, the backend will **automatically enroll you** in the seeded `AI/ML` course and initialize your learning roadmap!

---

## 👨‍💻 Key Contributing Guidelines

1.  **Branch Naming**: Use clean branches: `feature/your-feature` or `bugfix/issue-description`.
2.  **Safe Navigation**: Always use optional chaining (`?.`) when accessing dynamic properties like `userProfile?.user?.username` inside React components to prevent null-pointer crashes during async loading cycles.
3.  **Keep it clean**: Avoid hardcoding configurations. Always leverage environment variables (`.env`).
