import mongoose from "mongoose";
import Batch from "../models/Batch.js";
import Course from "../models/Course.js";
import BatchSession from "../models/BatchSession.js";

// Helper: Find the first Friday on or after the start date
const findFirstFriday = (startDate) => {
  const date = new Date(startDate);
  // Reset time to midnight to avoid timezone drifts
  date.setHours(0, 0, 0, 0);
  const daysToAdd = (5 - date.getDay() + 7) % 7;
  date.setDate(date.getDate() + daysToAdd);
  return date;
};

// Helper: Add days to a date safely
const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// HELPER: Set specific time (Hours, Minutes)
const setTime = (date, hours, minutes = 0) => {
  const result = new Date(date);
  result.setHours(hours, minutes, 0, 0);
  return result;
};

export const generateBatchSchedule = async (batchId, batchStartDate) => {
  try {
    console.log(`Starting WEEKLY schedule generation for Batch: ${batchId}`);

    // 1. Fetch Batch & Course
    const batch = await Batch.findById(batchId);
    if (!batch || !batch.courseId)
      throw new Error("Invalid Batch or missing Course ID.");

    // 2. Fetch Course Structure
    // We populate 'topics' so we can access the topic._id
    const course = await Course.findById(batch.courseId).populate({
      path: "stages",
      populate: { path: "topics" },
    });

    if (!course) throw new Error("Course not found.");

    // 3. Flatten all subtopics into a single ordered list
    // Crucial: We attach the 'topicId' (Parent) to every subtopic here
    const allSubtopics = course.stages.flatMap((stage) => {
      if (!stage.topics) return [];
      return stage.topics.flatMap((topic) => {
        if (!topic.subtopics) return [];
        return topic.subtopics.map((subtopic) => ({
          ...subtopic.toObject(),
          topicId: topic._id, // This is the Main Topic ID (e.g., Linear Regression)
          subtopicId: subtopic._id,
        }));
      });
    });

    if (allSubtopics.length === 0) {
      console.warn("No subtopics found. Schedule is empty.");
      return;
    }

    // 4. Generate the Weekly Cycle
    const sessionsToCreate = [];
    let currentFriday = findFirstFriday(batchStartDate);

    // Loop through subtopics in pairs of 2 (Weekly Chunks)
    for (let i = 0; i < allSubtopics.length; i += 2) {
      const sub1 = allSubtopics[i];
      const sub2 = allSubtopics[i + 1]; // Undefined if we run out of topics

      // --- FRIDAY (Live Class: Subtopic 1) ---
      sessionsToCreate.push({
        batchId,
        subtopicId: sub1.subtopicId,
        topicId: sub1.topicId,
        type: "LIVE_CLASS",
        // UPDATED: Set time to 18:00 (6 PM)
        scheduledDate: setTime(currentFriday, 18),
        sessionStatus: "SCHEDULED",
      });

      // --- SATURDAY (Live Class: Subtopic 2) ---
      if (sub2) {
        sessionsToCreate.push({
          batchId,
          subtopicId: sub2.subtopicId,
          topicId: sub2.topicId,
          type: "LIVE_CLASS",
          // UPDATED: Set time to 18:00 (6 PM)
          scheduledDate: setTime(addDays(currentFriday, 1), 18),
          sessionStatus: "SCHEDULED",
        });
      }

      // --- SUNDAY (Live Doubt Session) ---
      const sundaySubtopics = [sub1.subtopicId];
      if (sub2) sundaySubtopics.push(sub2.subtopicId);

      sessionsToCreate.push({
        batchId,
        topicId: sub1.topicId,

        // PRIMARY CHANGE: Link both subtopics here
        relatedSubtopicIds: sundaySubtopics,

        type: "DOUBT_SESSION",
        // Keeping doubts at standard time (e.g. midnight or default)
        // You can change this to setTime(..., 10) for 10 AM if needed
        scheduledDate: setTime(addDays(currentFriday, 2), 10),
        sessionStatus: "SCHEDULED",
      });

      // --- MONDAY (Lab for Subtopic 1) ---
      sessionsToCreate.push({
        batchId,
        subtopicId: sub1.subtopicId,
        topicId: sub1.topicId,
        type: "LAB",
        questionContent: "Pending admin upload...",
        scheduledDate: addDays(currentFriday, 3),
        sessionStatus: "SCHEDULED",
      });

      // --- TUESDAY (Lab for Subtopic 2) ---
      if (sub2) {
        sessionsToCreate.push({
          batchId,
          subtopicId: sub2.subtopicId,
          topicId: sub2.topicId,
          type: "LAB",
          questionContent: "Pending admin upload...",
          scheduledDate: addDays(currentFriday, 4),
          sessionStatus: "SCHEDULED",
        });
      }

      // --- WEDNESDAY (Mini Project) ---
      // UPDATED: Use 'relatedSubtopicIds' to link to BOTH subtopics
      sessionsToCreate.push({
        batchId,
        topicId: sub1.topicId,

        // Link to [Subtopic 1, Subtopic 2] instead of just Subtopic 1
        relatedSubtopicIds: sundaySubtopics,

        type: "PROJECT",
        scheduledDate: addDays(currentFriday, 5),
        sessionStatus: "SCHEDULED",
      });

      // --- THURSDAY (Assessments - SPLIT) ---

      // 1. Assessment for Subtopic 1
      sessionsToCreate.push({
        batchId,
        subtopicId: sub1.subtopicId, // Explicit Link to Sub 1
        topicId: sub1.topicId,
        type: "ASSESSMENT",
        scheduledDate: addDays(currentFriday, 6),
        sessionStatus: "SCHEDULED",
      });

      // 2. Assessments for Subtopic 2 (Only if Subtopic 2 exists)
      if (sub2) {
        sessionsToCreate.push({
          batchId,
          subtopicId: sub2.subtopicId, // Explicit Link to Sub 2
          topicId: sub2.topicId,
          type: "ASSESSMENT",
          scheduledDate: addDays(currentFriday, 6),
          sessionStatus: "SCHEDULED",
        });
      }

      // Move to NEXT Friday for the next loop
      currentFriday = addDays(currentFriday, 7);
    }

    // 5. Bulk Insert
    if (sessionsToCreate.length > 0) {
      await BatchSession.insertMany(sessionsToCreate);
      console.log(
        `Success: Generated ${sessionsToCreate.length} weekly sessions for Batch ${batchId}`,
      );
    }
  } catch (error) {
    console.error("CRITICAL ERROR inside generateBatchSchedule:", error);
    throw error;
  }
};
