// routes/apiRoutes.js
import express from "express";
import {
  getCourseById,
  createCourse,
  getMyCourse,
  updateCourse,
} from "../controllers/courseController.js";
import { updateCourseProgress } from "../controllers/studentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Course routes
router.get("/my-course", protect, getMyCourse);
router.get("/courses/:id", getCourseById);
router.post("/courses", createCourse);
router.put("/courses/:id", updateCourse);

// Student routes
router.put(
  "/students/:id/courses/:courseId/updateProgress",
  updateCourseProgress,
);

export default router;
