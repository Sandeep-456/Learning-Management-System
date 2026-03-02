import React from "react";
import JobTabs from "../components/job/JobTabs";
import JobCard from "../components/job/JobCard";
import JobDetails from "../components/job/JobDetails";
import JobApplyForm from "../components/job/JobApplyForm";
import { getJobsWithUserStatus } from "../data/jobUserStatus";
import { AnimatePresence, motion } from "framer-motion";

export default function JobsPage() {
  const [activeTab, setActiveTab] = React.useState("open");
  const [jobs, setJobs] = React.useState(getJobsWithUserStatus());

  const [selectedJob, setSelectedJob] = React.useState(null);
  const [applyJob, setApplyJob] = React.useState(null);

  const [form, setForm] = React.useState({
    name: "",
    email: "",
    link: "",
  });

  // FILTER JOBS
  const filteredJobs = React.useMemo(() => {
    if (activeTab === "open") return jobs.filter((j) => j.status === "open");
    if (activeTab === "applied")
      return jobs.filter((j) => j.jobUpdates.length > 0);
    if (activeTab === "done") return jobs.filter((j) => j.status === "done");
    return jobs;
  }, [activeTab, jobs]);

  // APPLY SUBMIT
  const handleApplySubmit = (e) => {
    e.preventDefault();

    const newUpdate = {
      title: "Applied",
      date: new Date().toLocaleDateString(),
    };

    setJobs((prev) =>
      prev.map((job) =>
        job._id === applyJob._id ?
          { ...job, jobUpdates: [newUpdate, ...job.jobUpdates] }
        : job,
      ),
    );

    alert("Application submitted successfully!");
    setApplyJob(null);
    setForm({ name: "", email: "", link: "" });
  };

  React.useEffect(() => {
    if (selectedJob || applyJob) {
      document.body.style.overflow = "hidden"; // disable scroll
    } else {
      document.body.style.overflow = "auto"; // re-enable scroll
    }

    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedJob, applyJob]);

  return (
    <div className="bg-white p-10 space-y-8 relative">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-indigo-700">
          Job Opportunities
        </h1>
        <p className="text-slate-600 text-sm">
          Explore open roles and track your applications.
        </p>
      </div>

      {/* Tabs */}
      <JobTabs active={activeTab} setActive={setActiveTab} />

      {/* Job Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6"
      >
        {filteredJobs.map((job) => (
          <JobCard key={job._id} job={job} onView={() => setSelectedJob(job)} />
        ))}
      </motion.div>

      {/* ======================= JOB DETAILS MODAL ======================= */}
      <AnimatePresence>
        {selectedJob && (
          <motion.div
            className="fixed inset-0  bg-black/30 backdrop-blur-sm z-30"
            onClick={() => setSelectedJob(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white ml-auto mr-70 mt-30 rounded-xl shadow-lg w-full max-w-4xl h-[80vh] p-6 relative"
              onClick={(e) => e.stopPropagation()} // prevent closing on inside click
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <button
                className="absolute top-4 right-4 text-slate-500 hover:text-slate-700"
                onClick={() => setSelectedJob(null)}
              >
                ✕
              </button>

              <JobDetails
                job={selectedJob}
                onApply={() => setApplyJob(selectedJob)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================= APPLY FORM MODAL (HIGHER Z-INDEX, ALWAYS ON TOP) ======================= */}
      <AnimatePresence>
        {applyJob && (
          <JobApplyForm
            setApplyJob={setApplyJob}
            job={applyJob}
            form={form}
            setForm={setForm}
            onSubmit={handleApplySubmit}
            onClose={() => setApplyJob(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
