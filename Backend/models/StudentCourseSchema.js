// models/Student.js
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  batchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Batch",
  },
  courses: [
    {
      courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" }, // Reference to Course model
      progress: { type: Number, default: 0 }, // Overall progress for the course
      stages: [
        {
          stageId: { type: mongoose.Schema.Types.ObjectId, ref: "Stage" }, // Reference to Stage model
          progress: { type: Number, default: 0 }, // Stage progress
          topics: [
            {
              topicId: { type: mongoose.Schema.Types.ObjectId, ref: "Topic" }, // Reference to Topic model
              status: {
                type: String,
                enum: ["Pending", "In Progress", "Completed"],
                default: "Pending",
              },
              subtopics: [
                {
                  subtopicId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Subtopic",
                  }, // Reference to Subtopic model
                  status: {
                    type: String,
                    enum: ["Pending", "In Progress", "Completed"],
                    default: "Pending",
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});

const Student = mongoose.model("StudentSchema", studentSchema);

export default Student;
