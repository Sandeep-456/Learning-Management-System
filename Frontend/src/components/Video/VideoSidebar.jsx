import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaChevronDown,
  FaChevronRight,
  FaPlayCircle,
  FaVideo,
  FaFileAlt,
  FaClipboardCheck,
  FaCode,
  FaLock,
  FaPlus,
  FaMinus,
} from "react-icons/fa";

// --- LOCKING LOGIC HELPER ---
const isLocked = (dateString) => {
  if (!dateString) return false;
  const contentDate = new Date(dateString);
  const today = new Date();
  const unlockThreshold = new Date(today);
  unlockThreshold.setDate(today.getDate());
  return contentDate > unlockThreshold;
};

// --- CLAY STYLES CONSTANTS ---
const clayCardStyle = {
  backgroundColor: "#FFFFFF",
  borderRadius: "16px",
  boxShadow: "6px 6px 12px #cedbe7, -6px -6px 12px #ffffff",
  border: "1px solid rgba(255,255,255,0.4)",
};

const clayPressedStyle = {
  backgroundColor: "#E6EBF2",
  borderRadius: "16px",
  boxShadow: "inset 4px 4px 8px #cedbe7, inset -4px -4px 8px #ffffff",
};

const claySphere = {
  background: "linear-gradient(145deg, #6366f1, #4f46e5)",
  boxShadow: "2px 2px 4px #a5b4fc, -2px -2px 4px #ffffff",
};

const VideoSidebar = ({ stages, activeContent, handleContentSelection }) => {
  const [expandedItems, setExpandedItems] = useState({});

  const toggleItem = (id) => {
    setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // AUTO-EXPAND LOGIC
  useEffect(() => {
    if (activeContent?.data?.subtopicId && stages) {
      const targetSubtopicId = activeContent.data.subtopicId;
      const newExpandedState = { ...expandedItems };
      let found = false;

      for (const stage of stages) {
        for (const topic of stage.topics) {
          const subtopicExists = topic.subtopics.find(
            (sub) => sub._id === targetSubtopicId,
          );
          if (subtopicExists) {
            newExpandedState[topic._id] = true;
            newExpandedState[targetSubtopicId] = true;
            found = true;
            break;
          }
        }
        if (found) break;
      }
      if (found) setExpandedItems(newExpandedState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeContent?.data?.subtopicId]);

  return (
    <div
      className="w-80 h-[75vh] md:h-[70vh] lg:h-[82vh] overflow-y-auto sticky top-4 lg:ml-4 lg:my-4 flex flex-col rounded-r-[30px] lg:rounded-[40px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
      style={{
        backgroundColor: "#F0F4F8",
        // CHANGED: Deep Clay Shadow + Thick Border
        boxShadow: "20px 20px 40px #cedbe7, -20px -20px 40px #ffffff",
        border: "4px solid #FFFFFF",
      }}
    >
      {/* HEADER CARD */}
      <div className="p-6 sticky top-0 z-20 mr-6 mt-2 lg:m-0 lg:backdrop-blur-sm bg-[#F0F4F8]/90">
        <div className="p-5" style={clayCardStyle}>
          <h2 className="text-xl font-black text-slate-700 tracking-tight">
            Course Content
          </h2>
          <p className="text-xs text-slate-400 mt-1 font-bold uppercase tracking-wider">
            Your learning path
          </p>
        </div>
      </div>

      {/* Main Container: Increased padding to prevent shadow clipping */}
      <div className="px-8 pb-10 overflow-y-auto space-y-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        {stages.map((stage) => (
          <div key={stage._id}>
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 pl-2">
              {stage.name}
            </h3>

            <div className="relative pl-2">
              {/* Vertical Guide Line */}
              <div
                className="absolute left-6 top-4 bottom-0 w-1 rounded-full"
                style={{
                  backgroundColor: "#E6EBF2",
                  boxShadow:
                    "inset 1px 1px 2px #cedbe7, inset -1px -1px 2px #ffffff",
                }}
              ></div>

              {stage.topics.map((topic, index) => (
                <TopicItem
                  key={topic._id}
                  topic={topic}
                  expandedItems={expandedItems}
                  toggleItem={toggleItem}
                  activeContent={activeContent}
                  handleContentSelection={handleContentSelection}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- LEVEL 1: TOPIC ITEM ---
const TopicItem = ({
  topic,
  expandedItems,
  toggleItem,
  activeContent,
  handleContentSelection,
}) => {
  const isOpen = expandedItems[topic._id];

  return (
    <div className="relative mb-6">
      {/* Connector Sphere */}
      <div
        className="absolute left-2.5 top-4.5 w-3.5 h-3.5 rounded-full z-10"
        style={claySphere}
      ></div>

      {/* Topic Button */}
      <button
        onClick={() => toggleItem(topic._id)}
        className={`w-full flex items-center justify-between pl-10 pr-4 py-3 rounded-2xl transition-all duration-300 transform
          ${isOpen ? "mb-4" : ""}
        `}
        style={isOpen ? clayPressedStyle : clayCardStyle}
      >
        <span
          className={`font-bold text-base text-left truncate pr-2 ${isOpen ? "text-indigo-600" : "text-slate-600"}`}
        >
          {topic.name}
        </span>
        <div
          className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all ${isOpen ? "bg-white shadow-sm text-indigo-500" : "text-slate-300"}`}
        >
          {isOpen ? (
            <FaChevronDown className="text-[10px]" />
          ) : (
            <FaChevronRight className="text-[10px]" />
          )}
        </div>
      </button>

      {/* Subtopics Container */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="ml-4 pl-2 relative overflow-visible" // Changed from overflow-hidden to visible to prevent shadow cut
          >
            <div className="space-y-4 pb-2 pt-1">
              {topic.subtopics.map((sub) => (
                <SubtopicItem
                  key={sub._id}
                  sub={sub}
                  expandedItems={expandedItems}
                  toggleItem={toggleItem}
                  activeContent={activeContent}
                  handleContentSelection={handleContentSelection}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- LEVEL 2: SUBTOPIC ITEM ---
const SubtopicItem = ({
  sub,
  expandedItems,
  toggleItem,
  activeContent,
  handleContentSelection,
}) => {
  const isOpen = expandedItems[sub._id];

  return (
    <div className="relative group">
      {/* Subtopic Header */}
      <button
        onClick={() => toggleItem(sub._id)}
        className="w-full flex items-center justify-between px-4 py-3 mb-2 rounded-xl text-xs font-bold transition-all hover:-translate-y-0.5"
        style={
          isOpen
            ? {
                ...clayCardStyle,
                backgroundColor: "#FFFFFF",
                color: "#4f46e5",
                zIndex: 10,
                // Ensure margin is handled so shadow doesn't clip
                marginRight: "4px",
                marginLeft: "4px",
              }
            : {
                color: "#64748b",
                marginRight: "4px",
                marginLeft: "4px",
              }
        }
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <span
            className={`shrink-0 w-1.5 h-1.5 rounded-full transition-colors ${isOpen ? "bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]" : "bg-slate-300"}`}
          ></span>
          <span className="truncate">{sub.name}</span>
        </div>

        <div
          className={`shrink-0 ml-3 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? "bg-indigo-500 text-white shadow-[inset_1px_1px_3px_rgba(0,0,0,0.2)]"
              : "bg-white text-indigo-400 shadow-[2px_2px_5px_#cedbe7,-2px_-2px_5px_#ffffff]"
          }`}
        >
          {isOpen ? <FaMinus size={8} /> : <FaPlus size={8} />}
        </div>
      </button>

      {/* Content List */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div
              className="p-4 rounded-2xl space-y-2 mx-1 ml-8"
              style={{
                backgroundColor: "#F1F5F9",
                boxShadow:
                  "inset 4px 4px 8px #cedbe7, inset -4px -4px 8px #ffffff",
              }}
            >
              <ContentList
                sub={sub}
                activeContent={activeContent}
                onSelect={handleContentSelection}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- LEVEL 3: CONTENT LIST (Sessions) ---
const ContentList = ({ sub, activeContent, onSelect }) => {
  const { sessions, cheatSheetUrl, name } = sub;
  const lockDate =
    sessions?.recording?.scheduledDate || sessions?.live?.scheduledDate;

  // 1. Defined Color Map for Icons (Tailwind doesn't allow dynamic construction)
  const iconColorMap = {
    red: "text-red-500",
    fuchsia: "text-fuchsia-500",
    blue: "text-blue-500",
    orange: "text-orange-500",
    violet: "text-violet-500",
    slate: "text-slate-400",
  };

  // Helper to Render Clay Button
  const renderBtn = (type, label, icon, data, colorName) => {
    const locked = isLocked(data.scheduledDate);

    // Active Check
    let isActive = false;
    if (activeContent?.type === type) {
      if (type === "PDF") {
        isActive = activeContent?.data?.subtopicId === sub._id;
      } else {
        isActive = activeContent?.data?._id === data._id;
      }
    }

    // 2. Updated Dynamic Clay Colors (Distinct Live vs Assessment)
    const getActiveStyle = (c) => {
      const colors = {
        red: {
          bg: "linear-gradient(145deg, #ef4444, #dc2626)",
          shadow: "4px 4px 10px #fca5a5, -4px -4px 10px #ffffff",
        },
        fuchsia: {
          // LIVE CLASS
          bg: "linear-gradient(145deg, #d946ef, #c026d3)", // Fuchsia-500 -> 600
          shadow: "4px 4px 10px #f5d0fe, -4px -4px 10px #ffffff",
        },
        blue: {
          bg: "linear-gradient(145deg, #3b82f6, #2563eb)",
          shadow: "4px 4px 10px #93c5fd, -4px -4px 10px #ffffff",
        },
        orange: {
          bg: "linear-gradient(145deg, #f97316, #ea580c)",
          shadow: "4px 4px 10px #fdba74, -4px -4px 10px #ffffff",
        },
        violet: {
          // ASSESSMENT (Distinct from Live)
          bg: "linear-gradient(145deg, #8b5cf6, #7c3aed)", // Violet-500 -> 600
          shadow: "4px 4px 10px #ddd6fe, -4px -4px 10px #ffffff",
        },
      };
      return colors[c] || colors.blue;
    };

    const activeTheme = getActiveStyle(colorName);
    const iconClass = iconColorMap[colorName] || "text-slate-400";

    // Style Calculation
    let btnStyle = {};

    if (isActive) {
      btnStyle = {
        background: activeTheme.bg,
        color: "white",
        boxShadow: activeTheme.shadow,
        borderRadius: "12px",
        border: "none",
      };
    } else if (locked) {
      btnStyle = {
        backgroundColor: "#E6EBF2",
        color: "#94a3b8",
        borderRadius: "12px",
        boxShadow: "inset 2px 2px 4px #cedbe7, inset -2px -2px 4px #ffffff",
        cursor: "not-allowed",
      };
    } else {
      btnStyle = {
        backgroundColor: "#FFFFFF",
        color: "#64748b",
        borderRadius: "12px",
        boxShadow: "4px 4px 8px #cedbe7, -4px -4px 8px #ffffff",
      };
    }

    return (
      <button
        key={type}
        disabled={locked}
        onClick={() =>
          onSelect(type, { ...data, title: name, subtopicId: sub._id })
        }
        className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold transition-transform duration-200 
          ${!locked && !isActive ? "hover:-translate-y-0.5 hover:text-indigo-600" : ""}
          ${isActive ? "scale-105" : ""}
        `}
        style={btnStyle}
      >
        <span
          className={
            isActive
              ? "text-white drop-shadow-md"
              : locked
                ? "text-slate-400"
                : iconClass // Uses the Map now
          }
        >
          {locked ? <FaLock className="text-[10px]" /> : icon}
        </span>
        <span className="truncate flex-1 text-left tracking-wide">{label}</span>
      </button>
    );
  };

  return (
    <div className="grid gap-3">
      {sessions?.recording
        ? renderBtn(
            "RECORDING",
            "Watch Recording",
            <FaPlayCircle className="text-sm" />,
            sessions.recording,
            "red",
          )
        : sessions?.live
          ? renderBtn(
              "LIVE",
              "Live Class",
              <FaVideo className="text-sm" />,
              sessions.live,
              "fuchsia", // Changed from violet to fuchsia
            )
          : null}

      {renderBtn(
        "PDF",
        "Cheat Sheet",
        <FaFileAlt className="text-sm" />,
        {
          _id: sub._id,
          cheatSheetUrl: cheatSheetUrl || null,
          scheduledDate: lockDate,
        },
        "blue",
      )}

      {sessions?.lab &&
        renderBtn(
          "LAB",
          "Lab Problem",
          <FaCode className="text-sm" />,
          sessions.lab,
          "orange",
        )}

      {sessions?.assessment &&
        renderBtn(
          "MCQ",
          "Assessment",
          <FaClipboardCheck className="text-sm" />,
          sessions.assessment,
          "violet", // Assessment stays Violet
        )}
    </div>
  );
};

export default VideoSidebar;
