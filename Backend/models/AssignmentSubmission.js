import mongoose from "mongoose";

const answerRecordSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
  selectedOptionKey: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
});

const assignmentSubmissionSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    // Note: This matches your MCQsSet model name
    mcqSetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MCQsSet",
      required: true,
    },

    // --- FIELDS FOR FILTERING ---
    type: { type: String, enum: ["PRACTICE", "ASSIGNMENT"], required: true },
    level: { type: String, enum: ["EASY", "MEDIUM", "HARD"], required: true },

    // --- STATE MANAGEMENT ---
    // Stores the specific random 20 IDs assigned to this user
    assignedQuestionIds: [{ type: mongoose.Schema.Types.ObjectId }],

    // Tracks if they are currently taking it or finished
    status: {
      type: String,
      enum: ["IN_PROGRESS", "SUBMITTED"],
      default: "IN_PROGRESS",
    },

    attemptNumber: { type: Number, default: 1 },

    // --- RESULTS (Optional now, calculated ONLY at submission) ---
    totalScore: { type: Number, default: 0 },
    maxScore: { type: Number, default: 0 },
    percentage: { type: Number, default: 0 },
    isPassed: { type: Boolean, default: false },

    // User's answers (Empty when they start, filled when they submit)
    answers: [answerRecordSchema],

    submittedAt: { type: Date }, // Set this only when status becomes SUBMITTED
  },
  { timestamps: true },
);

// Index to ensure fast lookups
assignmentSubmissionSchema.index({ studentId: 1, type: 1, level: 1 });

export default mongoose.model(
  "AssignmentSubmission",
  assignmentSubmissionSchema,
);
