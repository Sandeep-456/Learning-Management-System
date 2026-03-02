import express from "express";
import { createBatch } from "../controllers/batchController.js";
// import { protect, admin } from "../middleware/authMiddleware.js"; // Placeholder for auth

const router = express.Router();

// @route   POST /api/batches
// @desc    Create a new batch
// @access  Private/Admin
router.post(
  "/",
  // protect, // To be enabled later
  // admin,   // To be enabled later
  createBatch
);

export default router;
