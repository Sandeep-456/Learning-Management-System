// controllers/studentController.js
import Student from "../models/StudentCourseSchema.js";
import User from "../models/User.js";
import Profile from "../models/Profile.js";
import Course from "../models/Course.js";
import Batch from "../models/Batch.js";
import BatchSession from "../models/BatchSession.js";
import Topic from "../models/Topic.js";
import mongoose from "mongoose";

// @desc    Register a user as a student, assign batch, and initialize course progress structure
// @route   POST /api/students/register
const registerStudent = async (req, res) => {
  const { userId, batchId, courseId } = req.body;

  try {
    // 1. Check if student already exists
    const existingStudent = await Student.findOne({ user: userId });
    if (existingStudent) {
      return res.status(400).json({ message: "Student already registered." });
    }

    // 2. Fetch the Master Course Structure (to clone it)
    // We need the full tree: Stages -> Topics -> Subtopics
    const courseStructure = await Course.findById(courseId).populate({
      path: "stages",
      populate: {
        path: "topics",
        populate: {
          path: "subtopics",
        },
      },
    });

    if (!courseStructure) {
      return res.status(404).json({ message: "Course not found." });
    }

    // 3. Check Batch Validity
    const batch = await Batch.findById(batchId);
    if (!batch) {
      return res.status(404).json({ message: "Batch not found." });
    }

    // 4. Build the Student's "Courses" Object
    // We map the master structure into the Student's progress tracking format
    const initialCourseProgress = {
      courseId: courseId,
      progress: 0,
      stages: courseStructure.stages.map((stage) => ({
        stageId: stage._id,
        progress: 0,
        topics: stage.topics.map((topic) => ({
          topicId: topic._id,
          status: "Pending",
          subtopics: topic.subtopics.map((subtopic) => ({
            subtopicId: subtopic._id,
            status: "Pending",
          })),
        })),
      })),
    };

    // 5. Create and Save the Student Document
    const newStudent = new Student({
      user: userId,
      batchId: batchId, // <--- This Links to the Batch for Schedules
      courses: [initialCourseProgress], // <--- This initializes Progress Tracking
    });

    await newStudent.save();

    res.status(201).json({
      message: "Student registered and linked to batch successfully",
      student: newStudent,
    });
  } catch (error) {
    console.error("Error registering student:", error);
    res.status(500).json({ message: error.message });
  }
};

// Update progress for a subtopic, topic, and stage
const updateCourseProgress = async (req, res) => {
  const { studentId, courseId, stageId, topicId, subtopicId, status } =
    req.body;

  try {
    const student = await Student.findById(studentId);

    // Find the course for this student
    const course = student.courses.find(
      (course) => course.courseId.toString() === courseId,
    );
    if (!course)
      return res
        .status(404)
        .json({ message: "Course not found for this student" });

    // Find the stage
    const stage = course.stages.find(
      (stage) => stage.stageId.toString() === stageId,
    );
    if (!stage) return res.status(404).json({ message: "Stage not found" });

    // Find the topic within the stage
    const topic = stage.topics.find(
      (topic) => topic.topicId.toString() === topicId,
    );
    if (!topic) return res.status(404).json({ message: "Topic not found" });

    // Find the subtopic
    const subtopic = topic.subtopics.find(
      (sub) => sub.subtopicId.toString() === subtopicId,
    );
    if (!subtopic)
      return res.status(404).json({ message: "Subtopic not found" });

    // Update the subtopic status
    subtopic.status = status;

    // Recalculate topic, stage, and course progress based on subtopic completion
    topic.progress =
      (topic.subtopics.filter((sub) => sub.status === "Completed").length /
        topic.subtopics.length) *
      100;
    stage.progress =
      (stage.topics.filter((t) => t.progress === 100).length /
        stage.topics.length) *
      100;
    course.progress =
      (course.stages.filter((st) => st.progress === 100).length /
        course.stages.length) *
      100;

    await student.save();

    res.status(200).json({ message: "Progress updated successfully", student });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCourseSchedule = async (req, res) => {
  try {
    const userId = req.userId;

    // 1. Fetch Student & Batch
    const student = await Student.findOne({ user: userId });
    if (!student || !student.batchId) {
      return res
        .status(404)
        .json({ message: "Student not assigned to a batch" });
    }

    // 2. Fetch Sessions
    const sessions = await BatchSession.find({ batchId: student.batchId })
      .sort({ scheduledDate: 1 })
      .lean();

    // 3. Fetch Course Hierarchy
    const course = await Course.findById(student.courses[0].courseId)
      .populate({
        path: "stages",
        populate: {
          path: "topics",
          populate: { path: "subtopics" },
        },
      })
      .lean();

    // --- Create Name Lookups ---
    const topicMap = new Map();
    const subtopicMap = new Map();

    course.stages.forEach((stage) => {
      stage.topics.forEach((topic) => {
        topicMap.set(topic._id.toString(), topic.name);
        topic.subtopics.forEach((sub) => {
          subtopicMap.set(sub._id.toString(), sub.name);
        });
      });
    });

    // 4. Enrich Sessions for Calendar (Flat List)
    const enrichedSessions = sessions.map((session) => {
      const topicName =
        session.topicId ? topicMap.get(session.topicId.toString()) : "General";
      let subtopicName = "General Session";

      if (session.subtopicId) {
        subtopicName =
          subtopicMap.get(session.subtopicId.toString()) || "Topic Details";
      } else if (session.relatedSubtopicIds?.length > 0) {
        const names = session.relatedSubtopicIds
          .map((id) => subtopicMap.get(id.toString()))
          .filter(Boolean);
        subtopicName = names.length > 0 ? names.join(" & ") : "Multiple Topics";
      }

      return {
        ...session,
        topicName,
        subtopicName,
        duration: session.type === "LIVE_CLASS" ? "120 min" : "90 min",
      };
    });

    // 5. Create Session Map for Hierarchy (Group by Subtopic)
    const sessionMap = {};

    sessions.forEach((session) => {
      // Single Subtopic Link
      if (session.subtopicId) {
        const id = session.subtopicId.toString();
        if (!sessionMap[id]) sessionMap[id] = [];
        sessionMap[id].push(session);
      }

      // Multi-Subtopic Link (Doubt Sessions)
      if (session.relatedSubtopicIds?.length > 0) {
        session.relatedSubtopicIds.forEach((relId) => {
          const id = relId.toString();
          if (!sessionMap[id]) sessionMap[id] = [];
          sessionMap[id].push(session);
        });
      }
    });

    // console.log(sessions);

    // 6. Hydrate Course Hierarchy
    course.stages.forEach((stage) => {
      stage.topics.forEach((topic) => {
        topic.subtopics.forEach((sub) => {
          const subSessions = sessionMap[sub._id.toString()] || [];

          // HERE IS THE FIX: Explicitly Mapping All Types
          sub.sessions = {
            live: subSessions.find((s) => s.type === "LIVE_CLASS"),
            recording: subSessions.find(
              (s) => s.type === "LIVE_CLASS" && s.recordingUrl,
            ),
            lab: subSessions.find((s) => s.type === "LAB"),
            project: subSessions.find((s) => s.type === "PROJECT"),
            assessment: subSessions.find((s) => s.type === "ASSESSMENT"),
            // doubt: subSessions.find((s) => s.type === "DOUBT_SESSION"),
          };

          // console.log(sub);

          // Add a helper flag for frontend
          sub.hasContent = Object.values(sub.sessions).some(
            (val) => val !== undefined,
          );
        });
      });
    });

    res.json({
      courseHierarchy: course,
      calendarSchedule: enrichedSessions,
      batchStartDate: sessions[0]?.scheduledDate,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// const getMySchedule = async (req, res) => {
//   try {
//     // 1. Identify the student from req.userId
//     const userId = req.userId || "6971fc66860ef63913d383aa";
//     if (!userId) {
//       return res.status(401).json({ message: "Not authenticated" });
//     }

//     // 2. Find the student's batchId from the Student model using the email
//     const student = await Student.findOne({ user: userId });
//     if (!student || !student.batchId) {
//       return res
//         .status(404)
//         .json({ message: "Student record or batch assignment not found" });
//     }
//     const batchId = student.batchId;

//     // 3. Fetch the batch details to get start and end dates
//     const batch = await Batch.findById(batchId);
//     if (!batch) {
//       return res.status(404).json({ message: "Batch not found" });
//     }

//     // 4. Fetch all BatchSession records for that batch
//     const sessions = await BatchSession.find({ batchId: batchId }).lean();

//     // 5. Fetch all Topic records to map subtopicId to names
//     const topics = await Topic.find({}).lean();
//     const subtopicMap = new Map();
//     topics.forEach((topic) => {
//       topic.subtopics.forEach((sub) => {
//         subtopicMap.set(sub._id.toString(), {
//           subtopicName: sub.name,
//           topicName: topic.name,
//         });
//       });
//     });

//     // 6. Map Data
//     const schedule = sessions.map((session) => {
//       let subtopicLabel = "N/A";

//       // Logic for Doubt Sessions (Multi-Subtopic)
//       if (
//         session.type === "DOUBT_SESSION" &&
//         session.relatedSubtopicIds?.length > 0
//       ) {
//         // Find names for all linked subtopics
//         const names = session.relatedSubtopicIds
//           .map((id) => {
//             const details = subtopicMap.get(id.toString());
//             return details ? details.subtopicName : null;
//           })
//           .filter(Boolean); // Remove nulls

//         // Join them: "Topic A & Topic B"
//         subtopicLabel = names.join(" & ");
//       }
//       // Logic for Normal Sessions (Single Subtopic)
//       else if (session.subtopicId) {
//         const details = subtopicMap.get(session.subtopicId.toString());
//         subtopicLabel = details ? details.subtopicName : "N/A";
//       }

//       return {
//         // ... other fields
//         title: session.topicId
//           ? subtopicMap.get(session.topicId.toString())?.topicName
//           : "General",
//         subtopic: subtopicLabel, // Now contains "Topic A & Topic B"
//         // ...
//       };
//     });

//     // console.log(schedule);

//     res.status(200).json({
//       schedule,
//       startDate: batch.startDate,
//       endDate: batch.endDate || new Date("2026-10-31"),
//     });
//   } catch (error) {
//     console.error("Error fetching schedule:", error);
//     res.status(500).json({ message: "Server error while fetching schedule" });
//   }
// };

export { registerStudent, updateCourseProgress, getCourseSchedule };
