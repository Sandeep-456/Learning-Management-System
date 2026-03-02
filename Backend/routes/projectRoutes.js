import express from "express";
import {
  createOrUpdateProjectSet,
  getProjectsForSubtopic,
  getProjectSetById,
  submitProject,
  gradeProjectSubmission,
} from "../controllers/projectController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// ------------------------------------------------------------------
// STUDENT ROUTES
// ------------------------------------------------------------------

// Get all Project Sets visible for a specific subtopic (Dashboard)
// Matches logic: Find sets where relatedSubtopicIds contains :subtopicId
router.get("/subtopic/:subtopicId", protect, getProjectsForSubtopic);

// Get full details of a specific Project Set (Start/View)
router.get("/:id", protect, getProjectSetById);

// Submit a project response (Student)
router.post("/submit", protect, submitProject);

// ------------------------------------------------------------------
// ADMIN ROUTES
// ------------------------------------------------------------------

// Create or Update a Project Set
router.post("/create", createOrUpdateProjectSet); //  protect, admin,

// Grade a student's submission
router.post("/grade", protect, admin, gradeProjectSubmission);

export default router;
