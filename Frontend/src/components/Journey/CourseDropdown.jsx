import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaVideo,
  FaCode,
  FaFlask,
  FaClipboardCheck,
  FaChevronRight,
  FaFileAlt,
  FaLock,
} from "react-icons/fa";

export default function CourseDropdown({ subtopic }) {
  const [open, setOpen] = useState(false);
  const { sessions, name } = subtopic;
  // console.log("Subtopic sessions:", subtopic);
  const hasContent =
    subtopic.hasContent ||
    (sessions && Object.values(sessions).some((s) => s)) ||
    subtopic.cheatsheeturl;

  // --- CHEAT SHEET UNLOCK LOGIC ---
  // 1. Get Live Class Date
  const liveDateStr = sessions?.live?.scheduledDate;
  // 2. Add 1 Day (24 hours) to Live Class Date
  let cheatSheetUnlockDate = null;
  if (liveDateStr) {
    const liveDate = new Date(liveDateStr);
    cheatSheetUnlockDate = new Date(liveDate.getTime() + 24 * 60 * 60 * 1000); // +1 Day
  }

  return (
    <div className="">
      {/* --- RUNE STRONG CLAY CARD --- */}
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ scale: 1.01, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={`
          w-full flex justify-between items-center px-4 py-4 md:px-8 md:py-6 rounded-[30px]
          transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] border-4 border-white
          ${
            open
              ? "bg-[#1B1F4A] text-white shadow-[inset_10px_10px_25px_rgba(0,0,0,0.4),10px_15px_30px_rgba(27,31,74,0.2)]"
              : "bg-[#F8FAFC] text-[#1B1F4A] shadow-[15px_15px_35px_#E2E8F0,-15px_-15px_35px_#FFFFFF]"
          }
        `}
      >
        <div className="flex items-center gap-4 md:gap-6">
          {/* ICON BUBBLE - Syncs with sidebar icons */}
          {/* <div
            className={`
            w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center text-lg font-black
            ${
              open
                ? "bg-[#4F46E5] text-white shadow-[inset_2px_2px_4px_rgba(255,255,255,0.3)]"
                : "bg-white text-[#4F46E5] shadow-[4px_4px_10px_#E2E8F0,inset_2px_2px_4px_#FFFFFF]"
            }
          `}
          >
            {name.charAt(0)}
          </div> */}
          <span className="font-black text-xs md:text-xl tracking-tight uppercase">
            {name}
          </span>
        </div>

        <motion.div
          animate={{ rotate: open ? 90 : 0 }}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors
            ${open ? "bg-white/20" : "bg-white shadow-sm text-[#CBD5E1]"}
          `}
        >
          <FaChevronRight size={14} />
        </motion.div>
      </motion.button>

      {/* --- BUBBLE LIST FORMAT (INSET TRAY) --- */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden px-4 mb-3"
          >
            <div className="flex flex-col gap-3 pt-6">
              <ResourceBubble
                type="LIVE"
                session={sessions?.live}
                title="Live Class"
                icon={<FaVideo />}
                unlockDate={sessions?.live?.scheduledDate}
              />
              <ResourceBubble
                type="LAB"
                session={sessions?.lab}
                title="Practice Lab"
                icon={<FaCode />}
                unlockDate={sessions?.lab?.scheduledDate}
              />
              {subtopic.cheatSheetUrl ? (
                <ResourceBubble
                  type="CHEATSHEET"
                  title="Cheatsheet"
                  url={subtopic.cheatSheetUrl}
                  session={{}} // Placeholder for session data
                  unlockDate={cheatSheetUnlockDate}
                />
              ) : (
                ""
              )}
              <ResourceBubble
                type="ASSESSMENT"
                session={sessions?.assessment}
                title="Assessment"
                icon={<FaClipboardCheck />}
                unlockDate={sessions?.assessment?.scheduledDate}
              />

              {!hasContent && (
                <div className="py-8 text-center rounded-[2rem] bg-[#F1F5F9] border-2 border-dashed border-[#CBD5E1] text-[#94A3B8] font-bold text-[10px] md:text-xs uppercase tracking-widest">
                  Content Coming Soon
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const ResourceBubble = ({ type, session, title, url, unlockDate }) => {
  if (!session && !url) return null;

  // --- LOCK CHECK ---
  const isLocked = unlockDate ? new Date() < new Date(unlockDate) : false;

  // DESIGN SYSTEM MAPPING (Synced with your SessionCard styles)
  const styles = {
    LIVE: {
      icon: <FaVideo />,
      badge: "Live Class",
      badgeColor: "bg-indigo-100 text-indigo-700",
      btnText: "Join",
      actionColor:
        "bg-[#1A1C4B] shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.3),inset_4px_4px_8px_rgba(255,255,255,0.2),0_8px_15px_rgba(26,28,75,0.2)]",
      iconBg: "bg-[#1A1C4B]",
    },
    LAB: {
      icon: <FaCode />,
      badge: "Practical Lab",
      badgeColor: "bg-orange-100 text-orange-700",
      btnText: "View",
      actionColor:
        "bg-orange-500 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.3),inset_4px_4px_8px_rgba(255,255,255,0.3),0_8px_15px_rgba(249,115,22,0.3)]",
      iconBg: "bg-orange-500",
    },
    PROJECT: {
      icon: <FaFlask />,
      badge: "Project",
      badgeColor: "bg-pink-100 text-pink-700",
      btnText: "Start",
      actionColor:
        "bg-pink-500 shadow-[inset_-5px_-5px_10px_rgba(0,0,0,0.3),inset_5px_5px_10px_rgba(255,255,255,0.3),0_10px_20px_rgba(236,72,153,0.4)]",
      iconBg: "bg-pink-500",
    },
    ASSESSMENT: {
      icon: <FaClipboardCheck />,
      badge: "Assessment",
      badgeColor: "bg-purple-100 text-purple-700",
      btnText: "Take",
      actionColor:
        "bg-purple-500 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.3),inset_4px_4px_8px_rgba(255,255,255,0.3),0_8px_15px_rgba(168,85,247,0.3)]",
      iconBg: "bg-purple-500",
    },
    CHEATSHEET: {
      icon: <FaFileAlt />,
      badge: "Cheatsheet",
      badgeColor: "bg-green-100 text-green-700",
      btnText: "View",
      actionColor:
        "bg-green-500 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.3),inset_4px_4px_8px_rgba(255,255,255,0.3),0_8px_15px_rgba(34,197,94,0.3)]",
      iconBg: "bg-green-500",
    },
  };

  const style = styles[type] || styles.LIVE;

  // --- LOCKED BADGE (Pressed Clay Effect) ---
  const LockedBadge = () => (
    <div className="flex items-center gap-2 px-5 py-2.5 rounded-[18px] bg-[#E2E8F0] border border-white/50 shadow-[inset_2px_2px_5px_rgba(0,0,0,0.1),inset_-2px_-2px_5px_rgba(255,255,255,0.7)] text-slate-400 select-none">
      <FaLock size={10} />
      <span className="text-[10px] font-black uppercase tracking-widest">
        Locked
      </span>
    </div>
  );

  const ActionButton = () => {
    if (type === "CHEATSHEET" && url) {
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`px-4 py-2 md:px-6 md:py-2.5 rounded-[18px] text-[10px] font-black text-white border border-white/10 transition-all hover:scale-105 active:scale-95 uppercase tracking-widest ${style.actionColor}`}
        >
          {style.btnText}
        </a>
      );
    }
    return (
      <button
        className={`px-4 py-2 md:px-6 md:py-2.5 rounded-[18px] text-[10px] font-black text-white border border-white/10 transition-all hover:scale-105 active:scale-95 uppercase tracking-widest ${style.actionColor}`}
      >
        {style.btnText}
      </button>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 8 }}
      className="flex items-center justify-between p-3 pl-4 md:p-4 md:pl-5 rounded-[2.5rem] bg-white border border-white/60 shadow-[8px_8px_16px_#E2E8F0,inset_4px_4px_8px_rgba(255,255,255,0.8)]"
    >
      <div className="flex items-center gap-5">
        {/* ICON BUBBLE (CLAY STYLE) */}
        <div
          className={`w-10 h-8 md:w-12 md:h-10 rounded-[18px] ${style.iconBg} text-white flex items-center justify-center text-base md:text-lg shrink-0 shadow-[inset_-3px_-3px_6px_rgba(0,0,0,0.3),inset_3px_3px_6px_rgba(255,255,255,0.2)]`}
        >
          {style.icon}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span
              className={`text-[5px] md:text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest ${style.badgeColor}`}
            >
              {style.badge}
            </span>
          </div>
          <h4 className="text-xs md:text-sm font-extrabold text-slate-800 truncate tracking-tight">
            {title}
          </h4>
        </div>
      </div>

      {/* Conditionally Render Locked Badge or Action Button */}
      {isLocked ? <LockedBadge /> : <ActionButton />}
    </motion.div>
  );
};
