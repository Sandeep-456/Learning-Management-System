// models/CodingQuestionsSet.js
import mongoose from "mongoose";

// Schema for Sample I/O (displayed to user)
const testCaseSchema = new mongoose.Schema({
  input: { type: String, required: true }, // e.g., "Array: [1, 2, 3]"
  output: { type: String, required: true }, // e.g., "6"
  explanation: { type: String }, // Optional: "1+2+3 = 6"
});

// Schema for Flexible Attachments
const resourceSchema = new mongoose.Schema({
  label: { type: String, required: true }, // "Download Dataset"
  url: { type: String, required: true }, // The S3 or Drive link
  fileType: {
    type: String,
    default: "LINK",
  },
});

const codingQuestionSchema = new mongoose.Schema({
  title: { type: String }, // e.g., "Linear Regression from Scratch"
  problemStatement: { type: String, required: true }, // HTML/Markdown supported

  // OPTIONAL Test Cases
  sampleTestCases: { type: [testCaseSchema], default: [] },

  // Flexible Resources (PDFs, Zips, Drive Links)
  resources: [resourceSchema],

  // Constraints (Optional but good for coding)
  constraints: { type: String }, // "Time Limit: 2s"
});

const codingQuestionSetSchema = new mongoose.Schema(
  {
    subtopicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subtopic",
      required: true,
    },

    level: {
      type: String,
      enum: ["EASY", "MEDIUM", "HARD"],
      required: true,
    },

    // Array of 1-2 questions for this level
    questions: [codingQuestionSchema],
  },
  { timestamps: true },
);

// Ensure unique set per level per subtopic
codingQuestionSetSchema.index({ subtopicId: 1, level: 1 }, { unique: true });

export default mongoose.model("CodingQuestionSet", codingQuestionSetSchema);
