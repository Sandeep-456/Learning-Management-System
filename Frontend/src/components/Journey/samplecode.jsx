import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaVideo,
  FaCode,
  FaFlask,
  FaClipboardCheck,
  FaPlayCircle,
  FaChevronDown,
} from "react-icons/fa";

export default function CourseDropdown({ subtopic }) {
  const [open, setOpen] = useState(false);
  const { sessions, name } = subtopic;

  const hasContent =
    subtopic.hasContent || (sessions && Object.values(sessions).some((s) => s));

  return (
    <div className="mb-8">
      {/* --- FULL CLAY DROPDOWN HEADER --- */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.01, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={`
          w-full flex justify-between items-center
          px-8 py-6 rounded-[3rem]
          transition-all duration-500 ease-out
          relative border-none outline-none
          ${
            open ?
              "bg-[#1b1f4a] text-white shadow-[15px_15px_35px_rgba(0,0,0,0.2),-8px_-8px_20px_rgba(255,255,255,0.05)]"
            : "bg-indigo-200 text-slate-900 shadow-[12px_12px_25px_rgba(0,0,0,0.06),-12px_-12px_25px_rgba(255,255,255,1)]"
          }
        `}
      >
        <div className="flex items-center gap-5 relative z-10">
          {/* NESTED CLAY ICON */}
          <div
            className={`
              w-12 h-12 rounded-[1.2rem] flex items-center justify-center
              text-xl font-black transition-all duration-300
              ${
                open ?
                  "bg-indigo-400/20 text-white shadow-[inset_3px_3px_6px_rgba(0,0,0,0.3)]"
                : "bg-indigo-50 text-indigo-600 shadow-[4px_4px_10px_rgba(0,0,0,0.05),-2px_-2px_6px_rgba(255,255,255,1)]"
              }
            `}
          >
            {name.charAt(0)}
          </div>
          <span className="font-[900] text-xl tracking-tight">{name}</span>
        </div>

        {/* CLAY TOGGLE BUTTON */}
        <div
          className={`
          w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500
          ${
            open ?
              "bg-indigo-500/20 rotate-180"
            : "bg-white shadow-[4px_4px_10px_rgba(0,0,0,0.05),-4px_-4px_10px_rgba(255,255,255,1)]"
          }
        `}
        >
          <FaChevronDown className={open ? "text-white" : "text-slate-400"} />
        </div>
      </motion.button>

      {/* --- DROPDOWN CONTENT --- */}
      <div
        className={`grid transition-all duration-500 ease-in-out overflow-hidden ${
          open ?
            "grid-rows-[1fr] opacity-100 mt-6"
          : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 space-y-5 px-3">
          <ResourceRow
            type="LIVE"
            session={sessions?.live}
            title="Live Class"
            icon={<FaVideo />}
            color="violet"
          />

          <ResourceRow
            type="LAB"
            session={sessions?.lab}
            title="Practical Lab"
            icon={<FaCode />}
            color="orange"
          />

          <ResourceRow
            type="PROJECT"
            session={sessions?.project}
            title="Mini Project"
            icon={<FaFlask />}
            color="pink"
          />

          <ResourceRow
            type="ASSESSMENT"
            session={sessions?.assessment}
            title="Assessment"
            icon={<FaClipboardCheck />}
            color="purple"
          />

          {!hasContent && (
            <div className="p-12 text-center rounded-[2.5rem] bg-white/40 shadow-[inset_6px_6px_12px_rgba(0,0,0,0.02)] border-2 border-dashed border-slate-200">
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
                Content releasing soon
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const ResourceRow = ({
  type,
  session,
  title,
  icon,
  color,
  secondaryAction,
}) => {
  if (!session) return null;

  const colors = {
    violet: "text-violet-600 bg-violet-50 shadow-violet-100",
    orange: "text-orange-600 bg-orange-50 shadow-orange-100",
    pink: "text-pink-600 bg-pink-50 shadow-pink-100",
    purple: "text-purple-600 bg-purple-50 shadow-purple-100",
  };

  const theme = colors[color] || colors.violet;
  const isScheduled = session.sessionStatus === "SCHEDULED";
  const link =
    session.recordingUrl ||
    session.liveClassLink ||
    session.questionContent ||
    "#";
  const isClickable = link !== "#" && link !== "Pending admin upload...";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between p-6 rounded-[2.5rem] bg-slate-300 shadow-[10px_10px_20px_rgba(0,0,0,0.04),-10px_-10px_20px_rgba(255,255,255,1)]"
    >
      <div className="flex items-center gap-5">
        {/* CLAY RESOURCE ICON */}
        <div
          className={`w-14 h-14 rounded-[1.3rem] flex items-center justify-center text-2xl ${theme} shadow-[4px_4px_10px_rgba(0,0,0,0.03),-2px_-2px_8px_rgba(255,255,255,1)] bg-white`}
        >
          {icon}
        </div>
        <div>
          <h4 className="font-[900] text-base text-slate-800 tracking-tight">
            {title}
          </h4>
          <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.15em] mt-1">
            {isScheduled ?
              `Starts: ${new Date(session.scheduledDate).toLocaleDateString()}`
            : session.sessionStatus}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {secondaryAction}
        {isClickable ?
          <motion.a
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            href={link}
            target="_blank"
            rel="noreferrer"
            className="px-8 py-3 bg-[#1b1f4a] rounded-full text-[11px] font-[900] text-white shadow-[8px_8px_16px_rgba(27,31,74,0.25)] tracking-widest transition-all"
          >
            {type === "LIVE" ? "JOIN" : "VIEW"}
          </motion.a>
        : <span className="px-6 py-2 bg-slate-100 rounded-full text-[10px] font-black text-slate-400 tracking-widest shadow-inner">
            LOCKED
          </span>
        }
      </div>
    </motion.div>
  );
};
