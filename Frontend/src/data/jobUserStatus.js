import { jobData } from "./jobData";

// userJobStatus.js
const userJobStatus = {
  userId: "user123",

  appliedJobs: {
    job101: {
      status: "applied", // applied | in_progress | hired | rejected
      appliedOn: "2025-11-10",
      lastUpdate: "Resume Shortlisted",
    },

    job102: {
      status: "in_progress",
      appliedOn: "2025-11-12",
      lastUpdate: "Technical Round 1 Scheduled",
    },

    // Jobs NOT in this object ⇒ Not Applied
  },
};

// Merge jobs with user status
export const getJobsWithUserStatus = () => {
  return jobData.map((job) => {
    const userJob = userJobStatus.appliedJobs[job._id];

    // If user has not applied, keep jobUpdates empty
    if (!userJob) return { ...job, jobUpdates: [] };

    let completedSteps = [];

    switch (userJob.status) {
      case "applied":
        completedSteps = [job.hiringProcess[0]]; // Only first step done
        break;
      case "in_progress":
        // assume steps up to lastUpdate are done
        const lastStepIndex = job.hiringProcess.findIndex(
          (step) => step === userJob.lastUpdate
        );
        completedSteps =
          lastStepIndex >= 0
            ? job.hiringProcess.slice(0, lastStepIndex + 1)
            : [job.hiringProcess[0]]; // fallback
        break;
      case "hired":
        completedSteps = [...job.hiringProcess];
        break;
      case "rejected":
        // you can decide: maybe mark all previous steps done
        const rejectedIndex = job.hiringProcess.findIndex(
          (step) => step === userJob.lastUpdate
        );
        completedSteps =
          rejectedIndex >= 0
            ? job.hiringProcess.slice(0, rejectedIndex + 1)
            : [job.hiringProcess[0]];
        break;
      default:
        completedSteps = [];
    }

    // Build jobUpdates array with date if available, fallback to empty
    const jobUpdates = completedSteps.map((title) => ({
      title,
      date: title === userJob.lastUpdate ? userJob.appliedOn : "", // only last step has a date for now
    }));

    return { ...job, jobUpdates };
  });
};
