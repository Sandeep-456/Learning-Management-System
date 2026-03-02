// controllers/batchController.js
import Batch from "../models/Batch.js";
import { generateBatchSchedule } from "../utils/scheduleGenerator.js";

export const createBatch = async (req, res) => {
  const { name, startDate, courseId } = req.body;

  if (!name || !startDate || !courseId) {
    return res
      .status(400)
      .json({ message: "Name, StartDate, and CourseId are required." });
  }

  try {
    // 1. Create the Batch (Without Transaction)
    const newBatch = new Batch({
      name,
      courseId,
      startDate: new Date(startDate),
    });

    const savedBatch = await newBatch.save();
    console.log("Batch saved:", savedBatch._id);

    // 2. Generate Schedule
    await generateBatchSchedule(savedBatch._id, savedBatch.startDate);

    res.status(201).json({
      message: "Batch created and schedule generated successfully.",
      data: savedBatch,
    });
  } catch (error) {
    console.error("Controller Error:", error.message);
    // If schedule fails, you might want to delete the batch to keep DB clean
    // await Batch.findByIdAndDelete(savedBatch._id);
    res
      .status(500)
      .json({ message: "Failed to create batch.", error: error.message });
  }
};
