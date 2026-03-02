import { motion } from "framer-motion";
import JobTechScroller from "./JobTechScroller";
import {
  FaMapMarkerAlt,
  FaMoneyBill,
  FaUsers,
  FaCalendarAlt,
} from "react-icons/fa";
import { getJobsWithUserStatus } from "../../data/jobUserStatus";
import { useState } from "react";

import amazonLogo from "../../assets/Jobs/AmazonLogo.png";
import accentureLogo from "../../assets/Jobs/accenture.png";
import tcsLogo from "../../assets/Jobs/tcs.png";
import wiproLogo from "../../assets/Jobs/wipro.png";

const logoMap = {
  amazon_logo: amazonLogo,
  accenture_logo: accentureLogo,
  tcs_logo: tcsLogo,
  wipro_logo: wiproLogo,
};

export default function JobCard({ job, onView }) {
  const [isHovered, setIsHovered] = useState(false);

  const jobsWithStatus = getJobsWithUserStatus();
  const jobWithStatus = jobsWithStatus.find((j) => j._id === job._id);

  const jobStatus =
    jobWithStatus?.jobUpdates?.length === 0
      ? "not_applied"
      : jobWithStatus.jobUpdates.length < jobWithStatus.hiringProcess.length
        ? "in_progress"
        : "hired";

  /* -------------------- STATUS TAG -------------------- */
  const StatusTag = ({ status }) => {
    const colors = {
      applied: "bg-blue-100 text-blue-700",
      in_progress: "bg-amber-100 text-amber-700",
      hired: "bg-emerald-100 text-emerald-700",
      rejected: "bg-rose-100 text-rose-700",
      not_applied: "bg-slate-100 text-slate-600",
    };

    const label = {
      applied: "Applied",
      in_progress: "Hiring in Progress",
      hired: "Hired",
      rejected: "Rejected",
      not_applied: "Apply",
    };

    return (
      <span
        className={`
          absolute top-5 right-5 px-3 py-1.5 text-xs rounded-full font-semibold
          shadow-[inset_1px_1px_2px_rgba(255,255,255,0.6),0_6px_12px_rgba(0,0,0,0.12)]
          ${colors[status]}
        `}
      >
        {label[status]}
      </span>
    );
  };

  return (
    <motion.div
      layout
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      className="
        relative rounded-2xl p-8 flex flex-col gap-5
        bg-white/80 backdrop-blur-xl
        border border-white/60
        shadow-[0_20px_45px_rgba(15,23,42,0.15)]
        hover:shadow-[0_30px_70px_rgba(15,23,42,0.25)]
        hover:border-indigo-600
        transition-all duration-300
      "
    >
      <StatusTag status={jobStatus} />

      {/* -------------------- HEADER -------------------- */}
      <div className="flex flex-col items-start gap-2">
        {/* Logo (appears on hover) */}
        <motion.div
          layout
          initial={false}
          animate={{
            opacity: isHovered ? 1 : 0,
            height: isHovered ? 48 : 0,
            marginBottom: isHovered ? 10 : 0,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="
            overflow-hidden flex items-center
            

          "
        >
          <img
            src={logoMap[job.logo]}
            alt="company logo"
            className="h-10 object-contain"
          />
        </motion.div>

        {/* Company Name */}
        <motion.h3
          layout
          className="text-sm font-semibold text-slate-600 tracking-wide"
        >
          {job.companyName}
        </motion.h3>

        {/* Role */}
        <motion.h2
          layout
          className="text-xl font-extrabold text-violet-700 leading-snug"
        >
          {job.role}
        </motion.h2>
      </div>

      {/* -------------------- DETAILS -------------------- */}
      <div className="grid grid-cols-2 gap-3 text-sm font-medium text-slate-700">
        <p className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-indigo-500" />
          {job.location}
        </p>

        <p className="flex items-center gap-2">
          <FaMoneyBill className="text-indigo-500" />
          {job.ctc}
        </p>

        <p className="flex items-center gap-2">
          <FaUsers className="text-indigo-500" />
          Openings: {job.openings}
        </p>

        <p className="flex items-center gap-2">
          <FaCalendarAlt className="text-indigo-500" />
          Apply by {job.applyBy}
        </p>
      </div>

      {/* -------------------- FOOTER -------------------- */}
      <div className="flex justify-between items-center pt-2">
        <JobTechScroller stack={job.techStack} />

        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => onView(job)}
          className="
            px-4 py-2 rounded-xl text-sm font-semibold text-white
            bg-violet-600
            shadow-[0_10px_20px_rgba(124,58,237,0.4)]
            hover:bg-violet-700
            transition
          "
        >
          View Details
        </motion.button>
      </div>
    </motion.div>
  );
}
