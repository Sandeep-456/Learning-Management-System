// models/Topic.js
import mongoose from "mongoose";

const subtopicSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    // STATIC RESOURCES
    cheatSheetUrl: { type: String },

    // REMOVED: mcqSetId & codingQuestionId
    // (We don't store them here because there are too many sets per subtopic)
  },
  {
    toJSON: { virtuals: true }, // IMPORTANT: Allow virtuals to show up in JSON
    toObject: { virtuals: true },
  },
);

// --- VIRTUAL POPULATION ---
// This tells Mongoose: "Go look in the MCQsSet collection,
// find all docs where 'subtopicId' matches THIS subtopic's '_id'"

subtopicSchema.virtual("mcqSets", {
  ref: "MCQsSet", // The Model to search
  localField: "_id", // The ID in this Subtopic
  foreignField: "subtopicId", // The field in MCQsSet that points back here
});

subtopicSchema.virtual("codingSets", {
  ref: "CodingQuestionSet",
  localField: "_id",
  foreignField: "subtopicId",
});

const topicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subtopics: [subtopicSchema],
});

const Topic = mongoose.model("Topic", topicSchema);

export default Topic;
