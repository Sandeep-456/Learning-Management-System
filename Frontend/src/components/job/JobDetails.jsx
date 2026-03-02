import JobTrackingTimeline from "./JobTrackingTimeline";
import { motion } from "framer-motion";

import {
  ClipboardDocumentCheckIcon,
  WrenchScrewdriverIcon,
  QueueListIcon,
  BuildingLibraryIcon,
  GlobeAltIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";

import {
  FaMapMarkerAlt,
  FaMoneyBill,
  FaUsers,
  FaCalendarAlt,
} from "react-icons/fa";

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

export default function JobDetails({ job, onApply, onClose }) {
  console.log(job.logo);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="grid md:grid-cols-3 gap-6 p-6 h-full"
    >
      {/* ---------------- LEFT : APPLY + TRACKING ---------------- */}
      <div className="md:col-span-1 space-y-6">
        {/* Apply Section */}
        <div
          className="
            rounded-2xl p-5
            bg-white/80 backdrop-blur-xl
            border border-white/60
            shadow-[0_20px_45px_rgba(15,23,42,0.15)]
          "
        >
          {job.jobUpdates.length === 0 ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={onApply}
              className="
                w-full py-3 rounded-xl
                bg-indigo-600 text-white
                font-semibold tracking-wide
                shadow-[0_10px_20px_rgba(79,70,229,0.4)]
                hover:bg-indigo-700 transition
              "
            >
              Apply Now
            </motion.button>
          ) : (
            <p className="text-center text-emerald-600 font-semibold">
              Already Applied ✔
            </p>
          )}
        </div>

        {/* Tracking Timeline */}
        <div
          className="
            rounded-2xl p-5
            bg-white/80 backdrop-blur-xl
            border border-white/60
            shadow-[0_20px_45px_rgba(15,23,42,0.15)]
          "
        >
          <JobTrackingTimeline
            hiringProcess={job.hiringProcess}
            jobUpdates={job.jobUpdates}
          />
        </div>
      </div>

      {/* ---------------- RIGHT : JOB DETAILS ---------------- */}
      <div
        className="
          md:col-span-2 rounded-2xl p-6
          border border-white/60
          overflow-y-auto
        "
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-6 mb-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-600">
              {job.companyName}
            </h2>

            <h1 className="text-2xl font-extrabold text-indigo-700 mt-1">
              {job.role}
            </h1>

            {/* Links */}
            <div className="mt-4 flex gap-6 text-indigo-600 text-sm font-medium">
              <a
                href={job.aboutCompany.website}
                target="_blank"
                className="flex items-center gap-1 hover:underline"
              >
                <GlobeAltIcon className="w-5 h-5" /> Website
              </a>
              <a
                href={job.aboutCompany.linkedin}
                target="_blank"
                className="flex items-center gap-1 hover:underline"
              >
                <LinkIcon className="w-5 h-5" /> LinkedIn
              </a>
            </div>
          </div>

          {/* Logo */}
          {job.logo && (
            <div
              className="
                bg-white rounded-xl p-3
              "
            >
              <img
                src={logoMap[job.logo]}
                alt={`${job.companyName} logo`}
                className="w-28 h-28 object-contain"
              />
            </div>
          )}
        </div>

        {/* Meta Info */}
        <div className="grid grid-cols-2 gap-4 text-sm font-medium text-slate-700 mb-6">
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

        {/* Sections */}
        <div className="space-y-6 text-sm text-slate-700">
          {/* About Company */}
          <section>
            <h3 className="font-semibold flex items-center gap-2 text-slate-800">
              <BuildingLibraryIcon className="w-5 h-5 text-indigo-600" />
              About Company
            </h3>
            <p className="ml-7 mt-1 text-slate-600">
              {job.aboutCompany.description}
            </p>
          </section>

          {/* Eligibility */}
          <section>
            <h3 className="font-semibold flex items-center gap-2 text-slate-800">
              <ClipboardDocumentCheckIcon className="w-5 h-5 text-indigo-600" />
              Eligibility
            </h3>
            <ul className="list-disc ml-12 mt-1 space-y-1">
              {job.eligibility.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          </section>

          {/* Skills */}
          <section>
            <h3 className="font-semibold flex items-center gap-2 text-slate-800">
              <WrenchScrewdriverIcon className="w-5 h-5 text-indigo-600" />
              Skills Required
            </h3>
            <ul className="list-disc ml-12 mt-1 space-y-1">
              {job.skillsRequired.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          </section>

          {/* Hiring Process */}
          <section>
            <h3 className="font-semibold flex items-center gap-2 text-slate-800">
              <QueueListIcon className="w-5 h-5 text-indigo-600" />
              Hiring Process
            </h3>
            <ul className="list-disc ml-12 mt-1 space-y-1">
              {job.hiringProcess.map((e, i) => (
                <li key={i}>{e}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </motion.div>
  );
}
