import mongoose from "mongoose";

// Response for a single Project Question
const projectResponseSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, required: true }, // Links to ProjectSet.projects._id

  submissionUrl: { type: String, required: true }, // GitHub Repo
  deployedUrl: { type: String }, // Live Link
  studentComments: { type: String },

  // Admin Grading
  marksObtained: { type: Number, default: 0 },
  maxMarks: { type: Number, default: 100 },
  adminFeedback: { type: String },
});

const projectSubmissionSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    projectSetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProjectSet",
      required: true,
    },

    // Array of responses corresponding to the questions in the set
    responses: [projectResponseSchema],

    // Aggregates for the whole set
    totalScore: { type: Number, default: 0 },
    totalMaxScore: { type: Number, default: 0 },
    percentage: { type: Number, default: 0 },

    status: {
      type: String,
      enum: ["PENDING_REVIEW", "GRADED", "NEEDS_RESUBMISSION"],
      default: "PENDING_REVIEW",
    },

    submittedAt: { type: Date, default: Date.now },
    gradedAt: { type: Date },
  },
  { timestamps: true },
);

export default mongoose.model("ProjectSubmission", projectSubmissionSchema);
