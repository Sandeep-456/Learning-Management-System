import mongoose from "mongoose";

// Record for a single question's submission & grade
const responseRecordSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, required: true },

  // Student Input
  submissionUrl: { type: String, required: true }, // Link for THIS specific question

  // Admin Output (Initially empty/0)
  marksObtained: { type: Number, default: 0 },
  maxMarks: { type: Number, required: true },
  adminFeedback: { type: String },
});

const codingSubmissionSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    codingQuestionSetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CodingQuestionSet",
      required: true,
    },

    // --- NEW: Array of submissions (one per question) ---
    responses: [responseRecordSchema],

    // Aggregates
    totalScore: { type: Number, default: 0 },
    totalMaxScore: { type: Number, default: 0 },
    percentage: { type: Number, default: 0 },

    // --- STATUS FLOW ---
    // PENDING_REVIEW: Student submitted, Admin hasn't touched it.
    // GRADED: Admin has finished grading.
    status: {
      type: String,
      enum: ["PENDING_REVIEW", "GRADED"],
      default: "PENDING_REVIEW",
    },

    submittedAt: { type: Date, default: Date.now },
    gradedAt: { type: Date }, // Set when Admin finishes
  },
  { timestamps: true },
);

export default mongoose.model("CodingSubmission", codingSubmissionSchema);
