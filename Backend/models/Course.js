// models/Course.js
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  courseType: { type: String, default: "8 months" },
  description: { type: String, required: true },
  stages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Stage" }], // Array of Stage ObjectIds
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
