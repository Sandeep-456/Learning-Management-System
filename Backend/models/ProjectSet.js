import mongoose from "mongoose";

// Schema for a single Project Question (e.g., "Mini Project 1")
const projectQuestionSchema = new mongoose.Schema({
  title: { type: String, required: true }, // e.g., "Build a Weather App"
  problemStatement: { type: String, required: true }, // HTML/Markdown

  // Resources specific to this question
  resources: [
    {
      label: { type: String, required: true },
      url: { type: String, required: true },
      fileType: { type: String, default: "LINK" },
    },
  ],
});

const projectSetSchema = new mongoose.Schema(
  {
    // General Title for the week's set
    title: { type: String, required: true }, // e.g., "Week 1 Mini Projects: React Basics"

    projectType: {
      type: String,
      enum: ["MINI", "MAJOR"],
      required: true,
    },

    // --- FLEXIBLE ARRAY LINKAGE ---
    // This set will show up if the user is on ANY of these subtopics
    relatedSubtopicIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subtopic",
        required: true,
      },
    ],

    // --- ARRAY OF QUESTIONS ---
    // e.g., [ { title: "Mini Project 1" }, { title: "Mini Project 2" } ]
    projects: [projectQuestionSchema],

    // Global resources for the whole set
    resources: [
      {
        label: { type: String, required: true },
        url: { type: String, required: true },
        fileType: { type: String, default: "LINK" },
      },
    ],

    submissionGuidelines: { type: String },
  },
  { timestamps: true },
);

export default mongoose.model("ProjectSet", projectSetSchema);
