import express from "express";
import {
  registerStudent,
  getCourseSchedule,
  updateCourseProgress,
} from "../controllers/studentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register a student (Admin or Internal use)
router.post("/register", registerStudent);

// Get Schedule (Protected)
router.get("/course-schedule", protect, getCourseSchedule);

// Update Progress
router.put("/update-progress", updateCourseProgress);

export default router;
