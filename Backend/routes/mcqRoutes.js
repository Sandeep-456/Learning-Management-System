import express from "express";
import {
  createOrUpdateMCQSet,
  getAllMCQSetsForSubtopic,
  getMCQSet,
  deleteMCQSet,
  addQuestionToSet,
  updateSingleQuestion,
  submitAssessment,
} from "../controllers/mcqController.js";
import { protect, admin } from "../middleware/authMiddleware.js"; // Assuming you have these

const router = express.Router();

// --- ADMIN ROUTES ---
// Create or Update a set (The JSON above goes here)
router.post("/create", protect, admin, createOrUpdateMCQSet);

// Add single question to existing set
router.put("/:setId/add-question", protect, admin, addQuestionToSet);

// Update a specific question
router.put(
  "/:setId/questions/:questionId",
  protect,
  admin,
  updateSingleQuestion,
);

// Delete a set
router.delete("/:setId", protect, admin, deleteMCQSet);

// --- STUDENT ROUTES ---

// 1. DASHBOARD FETCH (The new API you asked for)
// Returns: List of cards (Metadata only)
router.get("/:subtopicId", protect, getAllMCQSetsForSubtopic);

// 2. Start Assessment (POST) - Matches your Frontend
// Usage: POST /api/mcq/start
// Body: { subtopicId, type, level }
router.post("/start", protect, (req, res, next) => {
  // ADAPTER: Map req.body to params/query so we can reuse getMCQSet logic
  req.params.subtopicId = req.body.subtopicId;
  req.query.type = req.body.type || "ASSIGNMENT";
  req.query.level = req.body.level || "EASY"; // Default or pass from body

  // Call the controller
  getMCQSet(req, res, next);
});

// Test Submission
router.post("/submit", protect, submitAssessment);

export default router;
