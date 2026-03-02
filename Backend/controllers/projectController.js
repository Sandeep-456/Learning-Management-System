import ProjectSet from "../models/ProjectSet.js";
import ProjectSubmission from "../models/ProjectSubmission.js";

// ------------------------------------------------------------------
// ADMIN: Create or Update Project Set
// ------------------------------------------------------------------
export const createOrUpdateProjectSet = async (req, res) => {
  const {
    id, // Optional: Pass ID to update
    title,
    projectType,
    relatedSubtopicIds,
    projects, // Array of questions
    resources,
    submissionGuidelines,
  } = req.body;

  try {
    let projectSet;

    if (id) {
      projectSet = await ProjectSet.findById(id);
      if (!projectSet)
        return res.status(404).json({ message: "Project Set not found" });

      projectSet.title = title || projectSet.title;
      projectSet.projectType = projectType || projectSet.projectType;
      projectSet.relatedSubtopicIds =
        relatedSubtopicIds || projectSet.relatedSubtopicIds;
      projectSet.projects = projects || projectSet.projects;
      projectSet.resources = resources || projectSet.resources;
      projectSet.submissionGuidelines =
        submissionGuidelines || projectSet.submissionGuidelines;

      await projectSet.save();
      return res
        .status(200)
        .json({ message: "Project Set updated", data: projectSet });
    } else {
      projectSet = new ProjectSet({
        title,
        projectType,
        relatedSubtopicIds,
        projects,
        resources,
        submissionGuidelines,
      });
      await projectSet.save();
      return res
        .status(201)
        .json({ message: "Project Set created", data: projectSet });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------------------------------------------------------
// STUDENT: Get Projects for a Subtopic (Dashboard)
// ------------------------------------------------------------------
export const getProjectsForSubtopic = async (req, res) => {
  const { subtopicId } = req.params;
  const userId = req.userId;

  try {
    // 1. Fetch Project Sets where the relatedSubtopicIds ARRAY contains this subtopicId
    const projectSets = await ProjectSet.find({
      relatedSubtopicIds: subtopicId,
    }).sort({ createdAt: -1 });

    if (!projectSets.length) return res.status(200).json([]);

    // 2. Fetch User's Submissions for these sets
    const setIds = projectSets.map((p) => p._id);
    const submissions = await ProjectSubmission.find({
      studentId: userId,
      projectSetId: { $in: setIds },
    });

    const subMap = new Map();
    submissions.forEach((sub) => subMap.set(sub.projectSetId.toString(), sub));

    // 3. Merge Status
    const processedSets = projectSets.map((set) => {
      const sub = subMap.get(set._id.toString());

      // MERGING USER RESPONSES INTO THE PROJECTS ARRAY
      // We need to map over the projects and attach the specific user response (url, marks) to each one
      const mergedProjects = set.projects.map((proj) => {
        const response = sub?.responses?.find(
          (r) => r.projectId.toString() === proj._id.toString(),
        );
        return {
          ...proj.toObject(),
          savedSubmissionUrl: response?.submissionUrl || "",
          savedDeployedUrl: response?.deployedUrl || "",
          savedComments: response?.studentComments || "",
          marksObtained: response?.marksObtained || 0,
          adminFeedback: response?.adminFeedback || "",
        };
      });

      return {
        ...set.toObject(),
        projects: mergedProjects, // Hide details in dashboard
        projectCount: set.projects.length,

        userResult: sub
          ? {
              status: sub.status,
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
// STUDENT: Start/View a Specific Project Set (Full Details)
// ------------------------------------------------------------------
export const getProjectSetById = async (req, res) => {
  try {
    const { id } = req.params; // Project Set ID
    const userId = req.userId;

    const projectSet = await ProjectSet.findById(id);
    if (!projectSet)
      return res.status(404).json({ message: "Project Set not found" });

    const submission = await ProjectSubmission.findOne({
      studentId: userId,
      projectSetId: id,
    });

    // Merge Questions (Projects) with User Responses
    const mergedProjects = projectSet.projects.map((proj) => {
      const response = submission?.responses?.find(
        (r) => r.projectId.toString() === proj._id.toString(),
      );

      return {
        ...proj.toObject(),
        // Attach user specific data
        savedSubmissionUrl: response?.submissionUrl || "",
        savedDeployedUrl: response?.deployedUrl || "",
        savedComments: response?.studentComments || "",
        marksObtained: response?.marksObtained || 0,
        adminFeedback: response?.adminFeedback || "",
      };
    });

    res.status(200).json({
      ...projectSet.toObject(),
      projects: mergedProjects,
      submissionStatus: submission?.status || "NOT_STARTED",
      submissionId: submission?._id,
      totalScore: submission?.totalScore || 0,
      percentage: submission?.percentage || 0,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------------------------------------------------------
// STUDENT: Submit Project (Update Responses)
// ------------------------------------------------------------------
export const submitProject = async (req, res) => {
  const { projectSetId, responses } = req.body;
  // responses: [{ projectId, submissionUrl, deployedUrl, studentComments }]
  const userId = req.userId;

  try {
    const projectSet = await ProjectSet.findById(projectSetId);
    if (!projectSet)
      return res.status(404).json({ message: "Project Set not found" });

    let submission = await ProjectSubmission.findOne({
      studentId: userId,
      projectSetId: projectSetId,
    });

    if (submission && submission.status === "GRADED") {
      return res
        .status(400)
        .json({ message: "Project graded. Cannot resubmit." });
    }

    if (!submission) {
      submission = new ProjectSubmission({
        studentId: userId,
        projectSetId: projectSetId,
        responses: [],
      });
    }

    // Update/Add Responses
    responses.forEach((newResp) => {
      const existingIndex = submission.responses.findIndex(
        (r) => r.projectId.toString() === newResp.projectId,
      );

      const responseObj = {
        projectId: newResp.projectId,
        submissionUrl: newResp.submissionUrl,
        deployedUrl: newResp.deployedUrl,
        studentComments: newResp.studentComments,
        marksObtained: 0,
        maxMarks: 100, // Default max marks per mini-project question
      };

      if (existingIndex > -1) {
        submission.responses[existingIndex] = {
          ...submission.responses[existingIndex].toObject(),
          ...responseObj,
        };
      } else {
        submission.responses.push(responseObj);
      }
    });

    submission.status = "PENDING_REVIEW";
    submission.submittedAt = new Date();

    // Reset aggregates
    submission.totalScore = 0;
    submission.totalMaxScore = submission.responses.length * 100;
    submission.percentage = 0;

    await submission.save();

    res.status(200).json({
      message: "Project submitted successfully!",
      status: "PENDING_REVIEW",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------------------------------------------------------
// ADMIN: Grade Project
// ------------------------------------------------------------------
export const gradeProjectSubmission = async (req, res) => {
  const { submissionId, grades } = req.body;
  // grades: [{ projectId: "...", marksObtained: 90, adminFeedback: "..." }]

  try {
    const submission = await ProjectSubmission.findById(submissionId);
    if (!submission)
      return res.status(404).json({ message: "Submission not found" });

    let totalScore = 0;
    let totalMax = 0;

    // Apply grades to specific questions
    grades.forEach((grade) => {
      const response = submission.responses.find(
        (r) => r.projectId.toString() === grade.projectId,
      );

      if (response) {
        response.marksObtained = grade.marksObtained;
        response.adminFeedback = grade.adminFeedback;
      }
    });

    // Recalculate Totals
    submission.responses.forEach((r) => {
      totalScore += r.marksObtained;
      totalMax += r.maxMarks;
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
