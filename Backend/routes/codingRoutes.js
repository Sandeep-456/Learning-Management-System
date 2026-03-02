import express from "express";
import {
  createOrUpdateCodingSet,
  getAllCodingSetsForSubtopic,
  getCodingSetById,
  submitCodingAssignment,
  gradeCodingSubmission,
} from "../controllers/codingController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// --- STUDENT ---
router.get("/subtopic/:subtopicId", protect, getAllCodingSetsForSubtopic); // Dashboard
router.get("/:id", protect, getCodingSetById); // Start Test
router.post("/submit", protect, submitCodingAssignment);

// --- ADMIN ---
router.post("/create", protect, admin, createOrUpdateCodingSet);
router.post("/grade", protect, admin, gradeCodingSubmission);

export default router;
