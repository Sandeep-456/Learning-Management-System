import mongoose from "mongoose";

const batchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
});

const Batch = mongoose.model("Batch", batchSchema);

export default Batch;
