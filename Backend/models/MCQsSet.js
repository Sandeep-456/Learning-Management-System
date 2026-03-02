// models/MCQsSet.js
import mongoose from "mongoose";

// 1. Schema for a Single Option
const optionSchema = new mongoose.Schema({
  key: { type: String, required: true }, // "A", "B", "C", "D"
  content: { type: String, required: true }, // The text or code
  isCode: { type: Boolean, default: false }, // <--- Triggers code styling in Frontend
});

// 2. Schema for a Single Question
const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },

  // Optional: If the question itself has a code block to analyze
  questionCodeSnippet: { type: String },

  // The 4 options
  options: [optionSchema],

  // The Answer Key
  correctOptionKey: { type: String, required: true }, // e.g., "B"

  // Explanation for the Review Screen
  explanation: { type: String },
  explanationCodeSnippet: { type: String }, // Optional code in explanation
});

// 3. The Main Set Schema
const mcqsSetSchema = new mongoose.Schema(
  {
    // Link to the curriculum
    subtopicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subtopic",
      required: true,
    },

    // Distinguish between Practice and Assignment
    setType: {
      type: String,
      enum: ["PRACTICE", "ASSIGNMENT"],
      required: true,
    },

    // The Difficulty Level
    level: {
      type: String,
      enum: ["EASY", "MEDIUM", "HARD"],
      required: true,
    },

    // The fixed list of 15-20 questions // The Big Pool of Questions (e.g., 50 or 100 questions)
    questions: [questionSchema],

    // Configuration for the Randomizer
    config: {
      displayCount: { type: Number, default: 20 }, // How many to show? // Show 20
      randomize: { type: Boolean, default: true }, // Shuffle them
    },
  },
  { timestamps: true },
);

// Compound Index: Ensure we don't accidentally create two "Easy Assignments" for the same subtopic
mcqsSetSchema.index({ subtopicId: 1, setType: 1, level: 1 }, { unique: true });

export default mongoose.model("MCQsSet", mcqsSetSchema);
