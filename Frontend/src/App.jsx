import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "./context/AuthContext";

import LoginPage from "./pages/LoginPage";
import AppLayout from "./components/layout/AppLayout";

import HomePage from "./pages/HomePage";
import MyTechPage from "./pages/MyTechPage";
import JourneyPage from "./pages/JourneyPage";
import AssignmentsPage from "./pages/AssignmentsPage";
import PlacementPrepPage from "./components/PlacementPrepPage/PlacementPrepPage";
import JobsPage from "./pages/JobsPage";
import LiveClasses from "./pages/LiveClasses";
import RecordedClasses from "./pages/RecordedClasses";
import FullStackProject from "./pages/FullStackProject";
import VideoPage from "./pages/VideoPage";
import CodePlayground from "./pages/CodePlayground";
import StartAssignmentPage from "./components/AsssignmentsPage/StartAssignmentPage";
import PracticeDetailsPage from "./components/PlacementPrepPage/PracticeDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import ReactPlayground from "./pages/ReactPlayground/ReactPlayground";
import MCQTestPage from "./pages/MCQTestPage";
import AssignmentWorkspace from "./components/AsssignmentsPage/AssignmentWorkspace";
import ProjectPage from "./pages/ProjectPage";

import ProtectedRoute from "./components/ProtectedRoute";
// import RouteProgress from "./components/ui/RouteProgress";

export default function App() {
  const location = useLocation();
  const { auth } = useAuth();

  return (
    <>
      {/* <RouteProgress /> */}

      {/* <AnimatePresence>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="h-full"
        >  */}
      <Routes location={location}>
        {/* 1. PUBLIC ROUTES */}
        <Route path="/login" element={<LoginPage />} />

        {/* 2. DASHBOARD ROUTES (With Sidebar & Topbar) */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout /> {/* <--- This layout has the Sidebar */}
            </ProtectedRoute>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="my-tech" element={<MyTechPage />} />
          <Route path="journey" element={<JourneyPage />} />
          <Route path="tasks" element={<AssignmentsPage />} />
          <Route path="placement-prep" element={<PlacementPrepPage />} />
          <Route path="jobs" element={<JobsPage />} />
          <Route path="classes/live" element={<LiveClasses />} />
          <Route path="classes/recorded" element={<RecordedClasses />} />
          <Route path="projects/fullstack" element={<FullStackProject />} />
          <Route path="react_projects" element={<ReactPlayground />} />
          <Route path="code-playground" element={<CodePlayground />} />
          <Route path="video/:id" element={<VideoPage />} />

          {/* ROUTE FOR PROJECTS */}
          <Route path="/project/:subtopicId" element={<ProjectPage />} />

          {/* Note: AssignmentWorkspace is REMOVED from here */}

          <Route
            path="assignment/start/:id"
            element={<StartAssignmentPage />}
          />
          <Route
            path="practice/:tabIndex/:contentIndex"
            element={<PracticeDetailsPage />}
          />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* 3. FULL SCREEN ROUTES (No Sidebar) */}
        {/* We put this OUTSIDE the AppLayout route above */}
        <Route
          path="/assignment/workspace/:id"
          element={
            <ProtectedRoute>
              <AssignmentWorkspace />
            </ProtectedRoute>
          }
        />

        {/* Legacy MCQ Route (No Sidebar) */}
        {/* <Route
              path="/mcq/:topicName"
              element={
                <ProtectedRoute>
                  <MCQTestPage />
                </ProtectedRoute>
              }
            /> */}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {/* </motion.div>
      </AnimatePresence> */}
    </>
  );
}
