import mongoose from "mongoose";

const batchSessionSchema = new mongoose.Schema(
  {
    batchId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
      required: true,
    },

    // Removed 'required: true' to allow Doubt Sessions (which have no single subtopic)
    subtopicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subtopic", // Good practice to add ref here if you want to populate later
    },

    // --- NEW FIELD: Multi-Topic Support ---
    relatedSubtopicIds: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Subtopic" },
    ],

    type: {
      type: String,
      enum: ["LIVE_CLASS", "LAB", "PROJECT", "ASSESSMENT", "DOUBT_SESSION"],
      required: true,
    },

    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
    },

    // --- CONTENT FIELDS ---
    // (Ensure you have these if you want to store the Lab Question text)
    questionContent: { type: String },

    liveClassLink: { type: String },
    recordingUrl: { type: String },
    scheduledDate: { type: Date },

    sessionStatus: {
      type: String,
      enum: ["SCHEDULED", "LIVE", "COMPLETED"],
      default: "SCHEDULED",
    },
  },
  { timestamps: true },
);

// Updated Index
// Uniqueness based on: Batch + Date + Type + Subtopic
batchSessionSchema.index(
  { batchId: 1, scheduledDate: 1, type: 1, subtopicId: 1 },
  { unique: true },
);

// This works because:
// 1. Doubt Sessions (Sun) have different DATES, so they don't clash.
// 2. Assignments (Thu) have different SUBTOPICS, so they don't clash.

const BatchSession = mongoose.model("BatchSession", batchSessionSchema);

export default BatchSession;
