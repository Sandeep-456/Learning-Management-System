// models/Stage.js
import mongoose from "mongoose";

const stageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  progress: { type: Number, default: 0 },
  startDate: Date,
  endDate: Date,
  topics: [{ type: mongoose.Schema.Types.ObjectId, ref: "Topic" }], // Array of Topic ObjectIds
});

const Stage = mongoose.model("Stage", stageSchema);

export default Stage;
