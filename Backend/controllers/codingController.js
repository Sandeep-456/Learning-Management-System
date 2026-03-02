import CodingQuestionSet from "../models/CodingQuestionsSet.js";
import CodingSubmission from "../models/CodingSubmission.js";

// ------------------------------------------------------------------
// ADMIN: Create or Update Coding Set
// ------------------------------------------------------------------
export const createOrUpdateCodingSet = async (req, res) => {
  const { subtopicId, level, questions } = req.body;

  try {
    let codingSet = await CodingQuestionSet.findOne({ subtopicId, level });

    if (codingSet) {
      codingSet.questions = questions;
      await codingSet.save();
      return res
        .status(200)
        .json({ message: "Coding Set updated", data: codingSet });
    } else {
      codingSet = new CodingQuestionSet({ subtopicId, level, questions });
      await codingSet.save();
      return res
        .status(201)
        .json({ message: "Coding Set created", data: codingSet });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------------------------------------------------------
// STUDENT: Get All Sets (Dashboard View) - Merged with Status
// ------------------------------------------------------------------
export const getAllCodingSetsForSubtopic = async (req, res) => {
  const { subtopicId } = req.params;
  const userId = req.userId;

  try {
    // 1. Fetch Sets
    const sets = await CodingQuestionSet.find({ subtopicId }).sort({
      level: 1,
    });
    if (!sets.length) return res.status(200).json([]);

    // 2. Fetch User's Submissions (Only latest per set)
    const setIds = sets.map((s) => s._id);
    const submissions = await CodingSubmission.find({
      studentId: userId,
      codingQuestionSetId: { $in: setIds },
    });

    // Map for fast lookup: { "setID": SubmissionObject }
    const subMap = new Map();
    submissions.forEach((sub) =>
      subMap.set(sub.codingQuestionSetId.toString(), sub),
    );

    // 3. Merge
    const processedSets = sets.map((set) => {
      const sub = subMap.get(set._id.toString());
      return {
        ...set.toObject(),
        questions: undefined, // Don't send full details to dashboard
        questionCount: set.questions.length,

        // Attach Result / Status
        userResult: sub
          ? {
              status: sub.status, // "PENDING_REVIEW" or "GRADED"
              score: sub.status === "GRADED" ? sub.percentage : null,
              submittedAt: sub.submittedAt,
            }
          : null,
      };
    });

    res.status(200).json(processedSets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------------------------------------------------------
// STUDENT: Start/View a Specific Set (UPDATED)
// ------------------------------------------------------------------
export const getCodingSetById = async (req, res) => {
  try {
    const { id } = req.params; // Set ID
    const userId = req.userId;

    // 1. Fetch the Set (Questions included)
    const codingSet = await CodingQuestionSet.findById(id);
    if (!codingSet)
      return res.status(404).json({ message: "Coding Set not found" });

    // 2. Fetch User's Existing Submission
    const submission = await CodingSubmission.findOne({
      studentId: userId,
      codingQuestionSetId: id,
    });

    // 3. Merge Data
    // We want to send the questions, plus the user's specific answer for each (if it exists)
    const mergedQuestions = codingSet.questions.map((q) => {
      // Find previous response for this question
      const existingResponse = submission?.responses?.find(
        (r) => r.questionId.toString() === q._id.toString(),
      );

      return {
        ...q.toObject(),
        // Attach user's previous data
        savedUrl: existingResponse?.submissionUrl || "",
        marksObtained: existingResponse?.marksObtained || 0,
        adminFeedback: existingResponse?.adminFeedback || "",
      };
    });

    res.status(200).json({
      ...codingSet.toObject(),
      questions: mergedQuestions, // Replaced with merged version
      submissionStatus: submission?.status || "NOT_STARTED",
      submissionId: submission?._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------------------------------------------------------
// STUDENT: Submit Assignment
// ------------------------------------------------------------------
export const submitCodingAssignment = async (req, res) => {
  const { codingSetId, responses } = req.body;
  // responses: [{ questionId: "...", submissionUrl: "..." }]
  const userId = req.userId;

  try {
    // 1. Validation
    const codingSet = await CodingQuestionSet.findById(codingSetId);
    if (!codingSet) return res.status(404).json({ message: "Set not found" });

    // 2. Prepare Grading Skeleton
    // We create the response structure but leave marks as 0
    const formattedResponses = responses.map((r) => ({
      questionId: r.questionId,
      submissionUrl: r.submissionUrl,
      marksObtained: 0,
      maxMarks: 10, // Default max marks per question, or fetch from DB config if needed
    }));

    // 3. Create/Update Submission
    // Logic: If they resubmit, we overwrite the previous "PENDING" one.
    // If it was already "GRADED", maybe block resubmission? (Optional logic)

    let submission = await CodingSubmission.findOne({
      studentId: userId,
      codingQuestionSetId: codingSetId,
    });

    if (submission && submission.status === "GRADED") {
      // Optional: Prevent overwrite if already graded
      return res
        .status(400)
        .json({ message: "Assignment already graded. Cannot resubmit." });
    }

    if (!submission) {
      submission = new CodingSubmission({
        studentId: userId,
        codingQuestionSetId: codingSetId,
      });
    }

    submission.responses = formattedResponses;
    submission.status = "PENDING_REVIEW"; // Force status back to pending
    submission.submittedAt = new Date();

    // Reset aggregates until graded
    submission.totalScore = 0;
    submission.totalMaxScore = formattedResponses.length * 10;
    submission.percentage = 0;

    await submission.save();

    res.status(200).json({
      message: "Assignment submitted successfully!",
      status: "PENDING_REVIEW",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------------------------------------------------------
// ADMIN: Grade Submission
// ------------------------------------------------------------------
export const gradeCodingSubmission = async (req, res) => {
  const { submissionId, grades } = req.body;
  // grades: [{ questionId: "...", marksObtained: 8, adminFeedback: "Good job" }]

  try {
    const submission = await CodingSubmission.findById(submissionId);
    if (!submission)
      return res.status(404).json({ message: "Submission not found" });

    let totalScore = 0;
    let totalMax = 0;

    // Apply Grades
    grades.forEach((gradeItem) => {
      const response = submission.responses.find(
        (r) => r.questionId.toString() === gradeItem.questionId,
      );
      if (response) {
        response.marksObtained = gradeItem.marksObtained;
        response.adminFeedback = gradeItem.adminFeedback;

        totalScore += gradeItem.marksObtained;
        totalMax += response.maxMarks;
      }
    });

    submission.totalScore = totalScore;
    submission.totalMaxScore = totalMax;
    submission.percentage =
      totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : 0;

    submission.status = "GRADED";
    submission.gradedAt = new Date();

    await submission.save();

    res.status(200).json({ message: "Grading complete", data: submission });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
