// controllers/courseController.js
import Course from "../models/Course.js";
import Stage from "../models/Stage.js";
import Topic from "../models/Topic.js";
import Profile from "../models/Profile.js";
import mongoose from "mongoose";

// Get the course for the logged-in user
const getMyCourse = async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.userId });
    // uncomment it when the profile is automated
    // if (!profile) {
    //   return res.status(404).json({ message: "Profile not found" });
    // }

    const course = await Course.findOne({
      name: "AI/ML",
      courseType: "8 Months",
    }).populate({
      // replace "AI/ML" with profile.course when its live
      path: "stages",
      populate: {
        path: "topics",
        populate: {
          path: "subtopics",
        },
      },
    });

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch course by ID with stages and topics
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate({
      path: "stages",
      populate: {
        path: "topics",
        populate: {
          path: "subtopics",
        },
      },
    });
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new course (Admin)
const createCourse = async (req, res) => {
  const { name, description, stages: incomingStages } = req.body; // Rename 'stages' from req.body to 'incomingStages'
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const stageIds = await Promise.all(
      incomingStages.map(async (stageData) => {
        // Use incomingStages here
        const topicIds = await Promise.all(
          stageData.topics.map(async (topicData) => {
            const newTopic = new Topic(topicData);
            const savedTopic = await newTopic.save({ session });
            return savedTopic._id;
          }),
        );

        const newStage = new Stage({
          ...stageData,
          topics: topicIds,
        });
        const savedStage = await newStage.save({ session });
        return savedStage._id;
      }),
    );

    const newCourse = new Course({
      name,
      description,
      // stages: stageIds, // This line caused the error due to early validation
    });
    newCourse.stages = stageIds; // Explicitly assign stages after construction

    const savedCourse = await newCourse.save({ session });

    await session.commitTransaction();
    res.status(201).json({
      message: "Course created successfully",
      course: savedCourse,
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ message: error.message });
  } finally {
    session.endSession();
  }
};

const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { name, description, stages } = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const stageIds = await Promise.all(
      stages.map(async (stageData) => {
        const topicIds = await Promise.all(
          stageData.topics.map(async (topicData) => {
            if (topicData._id) {
              await Topic.findByIdAndUpdate(topicData._id, topicData, {
                session,
              });
              return topicData._id;
            } else {
              const newTopic = new Topic(topicData);
              const savedTopic = await newTopic.save({ session });
              return savedTopic._id;
            }
          }),
        );

        if (stageData._id) {
          await Stage.findByIdAndUpdate(
            stageData._id,
            { ...stageData, topics: topicIds },
            { session },
          );
          return stageData._id;
        } else {
          const newStage = new Stage({
            ...stageData,
            topics: topicIds,
          });
          const savedStage = await newStage.save({ session });
          return savedStage._id;
        }
      }),
    );

    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { name, description, stages: stageIds },
      { new: true, session },
    );

    await session.commitTransaction();
    res.status(200).json({
      message: "Course updated successfully",
      course: updatedCourse,
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ message: error.message });
  } finally {
    session.endSession();
  }
};

export { getCourseById, createCourse, getMyCourse, updateCourse };
