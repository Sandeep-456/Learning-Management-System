import MCQsSet from "../models/MCQsSet.js";
import mongoose from "mongoose";
// import { shuffle } from "lodash"; // Optional: or write a simple array shuffler
import AssignmentSubmission from "../models/AssignmentSubmission.js";

// @desc    Create or Update an MCQ Set (Admin Only)
// @route   POST /api/mcq/create
// @access  Admin
export const createOrUpdateMCQSet = async (req, res) => {
  const { subtopicId, setType, level, questions } = req.body;

  if (!subtopicId || !setType || !level || !questions) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // 1. Check if a set with this specific configuration already exists
    // (e.g., Linear Regression + Easy + Practice)
    let mcqSet = await MCQsSet.findOne({ subtopicId, setType, level });

    if (mcqSet) {
      // OPTION A: Overwrite completely (Safest for bulk uploads)
      mcqSet.questions = questions;
      mcqSet.totalQuestions = questions.length;
      await mcqSet.save();
      return res
        .status(200)
        .json({ message: "MCQ Set updated successfully", data: mcqSet });

      // OPTION B (Alternative): If you wanted to append, you would use:
      // mcqSet.questions.push(...questions);
    } else {
      // 2. Create New Set
      mcqSet = new MCQsSet({
        subtopicId,
        setType,
        level,
        questions,
        totalQuestions: questions.length,
      });
      await mcqSet.save();
      return res
        .status(201)
        .json({ message: "MCQ Set created successfully", data: mcqSet });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get ALL Sets for a Subtopic (Dashboard View) along with results if there are any
// @route   GET /api/mcq/:subtopicId
// @access  Student
export const getAllMCQSetsForSubtopic = async (req, res) => {
  const { subtopicId } = req.params;
  const userId = req.userId; // Ensure your auth middleware attaches this

  try {
    // 1. Fetch all Sets
    const mcqSets = await MCQsSet.find({ subtopicId })
      .select("-questions")
      .sort({ setType: 1, level: 1 });

    if (!mcqSets.length) {
      return res.status(200).json([]);
    }

    // 2. Fetch User's Submissions for these sets
    // We get all submissions for this user that match the Set IDs we just found
    const setIds = mcqSets.map((set) => set._id);
    const submissions = await AssignmentSubmission.find({
      studentId: userId,
      mcqSetId: { $in: setIds },
      status: "SUBMITTED", // Only care about completed ones for the dashboard
    }).sort({ attemptNumber: -1 }); // Sort by latest attempt first

    // 3. Map Submissions for fast lookup
    // Since a user might have multiple attempts, we want the latest or best.
    // Because we sorted by attemptNumber desc, the first one we see for a specific setID is the latest.
    const submissionMap = new Map();
    submissions.forEach((sub) => {
      const setIdStr = sub.mcqSetId.toString();
      if (!submissionMap.has(setIdStr)) {
        submissionMap.set(setIdStr, sub);
      }
    });

    // 4. Merge Data
    const processedSets = mcqSets.map((set) => {
      const userResult = submissionMap.get(set._id.toString()) || null;

      return {
        ...set.toObject(),
        estimatedDuration: `${Math.round((set.config?.displayCount || 20) * 1.5)} Mins`,

        // ATTACH RESULT HERE
        userResult: userResult
          ? {
              score: userResult.percentage,
              isPassed: userResult.isPassed,
              attempt: userResult.attemptNumber,
              submittedAt: userResult.submittedAt,
            }
          : null,
      };
    });

    res.status(200).json(processedSets);
  } catch (error) {
    console.error("Error fetching sets:", error);
    res.status(500).json({ message: "Server error fetching assessments" });
  }
};

// @desc    Get a specific MCQ Set (Student Fetch)
// @route   GET /api/mcq/:subtopicId
// @query   ?level=EASY&type=PRACTICE
export const getMCQSet = async (req, res) => {
  const { subtopicId } = req.params;
  const { level, type } = req.query; // type = "PRACTICE" or "ASSIGNMENT"
  const userId = req.userId; // From Auth Middleware

  // console.log(subtopicId);

  try {
    // 1. Fetch the Master Pool (All 50 questions)
    const masterSet = await MCQsSet.findOne({
      subtopicId,
      level,
      setType: type,
    });
    if (!masterSet) return res.status(404).json({ message: "Set not found" });

    const requiredCount = masterSet.config.displayCount || 20;

    // --- SCENARIO A: PRACTICE (Pure Random) ---
    if (type === "PRACTICE") {
      // Just shuffle and slice. No need to save anything.
      const randomQuestions = masterSet.questions
        .sort(() => 0.5 - Math.random()) // Simple shuffle
        .slice(0, requiredCount);

      return res.json({
        ...masterSet.toObject(),
        questions: randomQuestions, // We only send 20 to the frontend
      });
    }

    // --- SCENARIO B: ASSIGNMENT (Persisted Random) ---
    if (type === "ASSIGNMENT") {
      // 1. Check if user already started this assignment
      let submission = await AssignmentSubmission.findOne({
        studentId: userId,
        mcqSetId: masterSet._id,
      });

      let selectedQuestions = [];

      if (submission) {
        // 2a. USER RETURNING: Fetch the specific questions assigned to them
        // We filter the master list to find only the IDs saved in their submission
        selectedQuestions = masterSet.questions.filter((q) =>
          submission.assignedQuestionIds.includes(q._id.toString()),
        );
      } else {
        // 2b. USER STARTING NEW: Generate random set and SAVE it
        const randomSet = masterSet.questions
          .sort(() => 0.5 - Math.random())
          .slice(0, requiredCount);

        // Save these IDs so the user gets the same ones next time
        const newSubmission = new AssignmentSubmission({
          studentId: userId,
          mcqSetId: masterSet._id,
          assignedQuestionIds: randomSet.map((q) => q._id), // <--- Vital!
          status: "IN_PROGRESS",
        });
        await newSubmission.save();

        selectedQuestions = randomSet;
      }

      return res.json({
        ...masterSet.toObject(),
        questions: selectedQuestions,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete an entire MCQ Set
// @route   DELETE /api/mcq/:setId
export const deleteMCQSet = async (req, res) => {
  try {
    const { setId } = req.params;
    const deletedSet = await MCQsSet.findByIdAndDelete(setId);

    if (!deletedSet) {
      return res.status(404).json({ message: "MCQ Set not found" });
    }

    res.status(200).json({ message: "MCQ Set deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a Single Question to an existing Set (Maintenance)
// @route   PUT /api/mcq/:setId/add-question
export const addQuestionToSet = async (req, res) => {
  const { setId } = req.params;
  const { question } = req.body; // Single question object

  try {
    const mcqSet = await MCQsSet.findById(setId);
    if (!mcqSet) return res.status(404).json({ message: "Set not found" });

    // Validation: Check constraints (e.g. max 20)
    if (mcqSet.questions.length >= 20) {
      return res
        .status(400)
        .json({ message: "Set is full (Max 20 questions)." });
    }

    mcqSet.questions.push(question);
    mcqSet.totalQuestions = mcqSet.questions.length;
    await mcqSet.save();

    res.status(200).json({ message: "Question added", data: mcqSet });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a specific Question inside a Set
// @route   PUT /api/mcq/:setId/questions/:questionId
export const updateSingleQuestion = async (req, res) => {
  const { setId, questionId } = req.params;
  const updates = req.body; // { questionText: "New text", ... }

  try {
    const mcqSet = await MCQsSet.findById(setId);
    if (!mcqSet) return res.status(404).json({ message: "Set not found" });

    // Find the specific question in the array
    const question = mcqSet.questions.id(questionId);
    if (!question)
      return res
        .status(404)
        .json({ message: "Question not found inside this set" });

    // Apply updates
    Object.keys(updates).forEach((key) => {
      question[key] = updates[key];
    });

    await mcqSet.save();
    res.status(200).json({ message: "Question updated", data: question });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ... imports

export const submitAssessment = async (req, res) => {
  const { mcqSetId, answers } = req.body;
  const userId = req.userId;

  try {
    // 1. Fetch Master Set (Source of Truth)
    const masterSet = await MCQsSet.findById(mcqSetId);
    if (!masterSet) return res.status(404).json({ message: "Test not found" });

    // 2. Determine Attempt Number
    const previousAttempts = await AssignmentSubmission.countDocuments({
      studentId: userId,
      mcqSetId: mcqSetId,
      status: "SUBMITTED",
    });
    const attemptNumber = previousAttempts + 1;

    // 3. Grade Answers
    let score = 0;
    let gradedAnswers = [];
    const questionMap = new Map();
    masterSet.questions.forEach((q) => questionMap.set(q._id.toString(), q));

    Object.keys(answers).forEach((qId) => {
      const question = questionMap.get(qId);
      if (question) {
        const selectedKey = answers[qId];
        const isCorrect = selectedKey === question.correctOptionKey;
        if (isCorrect) score++;
        gradedAnswers.push({
          questionId: qId,
          selectedOptionKey: selectedKey,
          isCorrect,
        });
      }
    });

    // 4. Calculate Stats
    const totalQuestions = gradedAnswers.length;
    const percentage =
      totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
    const isPassed = percentage >= 60;

    // 5. Find or Create Submission
    let submission = await AssignmentSubmission.findOne({
      studentId: userId,
      mcqSetId: mcqSetId,
      status: "IN_PROGRESS",
    });

    if (!submission) {
      submission = new AssignmentSubmission({ studentId: userId, mcqSetId });
    }

    // --- [UPDATED] SAVE TYPE & LEVEL FROM MASTER SET ---
    // We use masterSet properties to ensure data integrity (users can't fake "EASY" as "HARD")
    submission.type = masterSet.setType; // "PRACTICE" or "ASSIGNMENT"
    submission.level = masterSet.level; // "EASY", "MEDIUM", "HARD"

    submission.status = "SUBMITTED";
    submission.attemptNumber = attemptNumber;
    submission.answers = gradedAnswers;
    submission.totalScore = score;
    submission.maxScore = totalQuestions;
    submission.percentage = percentage;
    submission.isPassed = isPassed;
    submission.submittedAt = new Date();

    await submission.save();

    res.status(200).json({
      success: true,
      score,
      maxScore: totalQuestions,
      percentage,
      isPassed,
      attemptNumber,
      // Return these so frontend can show correct UI text
      type: masterSet.setType,
      level: masterSet.level,
    });
  } catch (error) {
    console.error("Submission Error:", error);
    res.status(500).json({ message: "Error submitting assessment" });
  }
};
