import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaClipboardList,
  FaSpinner,
  FaBolt,
  FaLayerGroup,
  FaClock,
  FaStar,
  FaCheckDouble,
  FaChevronRight,
  FaChevronLeft,
  FaRedo,
  FaTrophy,
} from "react-icons/fa";
import api from "../../utils/api";

const VideoMCQTestDisplay = ({ session }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [mcqSets, setMcqSets] = useState([]);
  const [activeTab, setActiveTab] = useState("PRACTICE");

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchMCQSets = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/mcq/${session.subtopicId}`);
        setMcqSets(data);
      } catch (error) {
        console.error("Failed to fetch MCQ sets", error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.subtopicId) {
      fetchMCQSets();
    }
  }, [session]);

  // --- HANDLE LAUNCH ---
  const handleLaunchTest = (set) => {
    navigate(`/assignment/workspace/${session.subtopicId}`, {
      state: {
        type: set.setType,
        level: set.level,
        topic: session.title,
      },
    });
  };

  const filteredSets = mcqSets.filter((set) => set.setType === activeTab);

  // --- CLAY STYLES (Container & Tabs) ---
  const clayContainerStyle = {
    backgroundColor: "#F0F4F8",
    borderRadius: "40px",
    boxShadow: "20px 20px 60px #cedbe7, -20px -20px 60px #ffffff",
    border: "2px solid rgba(255,255,255,0.4)",
  };

  const clayTabActive = {
    background: "linear-gradient(145deg, #6366f1, #4f46e5)", // Indigo Gradient
    color: "white",
    boxShadow: "6px 6px 12px rgba(99, 102, 241, 0.4), -6px -6px 12px #ffffff",
  };

  const clayTabInactive = {
    backgroundColor: "#F0F4F8",
    color: "#64748b", // Slate-500
    boxShadow: "inset 4px 4px 8px #cedbe7, inset -4px -4px 8px #ffffff", // Pressed in
  };

  const clayInsetWell = {
    backgroundColor: "#E6EBF2",
    borderRadius: "24px",
    boxShadow: "inset 8px 8px 16px #cedbe7, inset -8px -8px 16px #ffffff",
  };

  return (
    <div className="font-sans py-4">
      {/* MAIN CLAY CONTAINER */}
      <div className="p-10 xl:p-12" style={clayContainerStyle}>
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 xl:w-10 xl:h-10 p-2 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm">
                <FaTrophy />
              </div>
              <h2 className="text-2xl xl:text-3xl font-black text-slate-700 tracking-tight">
                Assessment Center
              </h2>
            </div>
            <p className="text-slate-500 text-sm xl:text-xl font-medium ml-1">
              Select a module to test your knowledge.
            </p>
          </div>

          {/* CLAY TABS */}
          <div
            className="flex flex-col xl:flex-row bg-[#F0F4F8] p-2 rounded-2xl gap-4"
            style={{
              boxShadow:
                "inset 4px 4px 8px #cedbe7, inset -4px -4px 8px #ffffff",
            }}
          >
            <button
              onClick={() => setActiveTab("PRACTICE")}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300"
              style={activeTab === "PRACTICE" ? clayTabActive : clayTabInactive}
            >
              <FaBolt /> Practice Labs
            </button>
            <button
              onClick={() => setActiveTab("ASSIGNMENT")}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300"
              style={
                activeTab === "ASSIGNMENT" ? clayTabActive : clayTabInactive
              }
            >
              <FaLayerGroup /> Assessments
            </button>
          </div>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div
            className="flex h-60 items-center justify-center"
            style={clayInsetWell}
          >
            <div className="flex flex-col items-center gap-4">
              <FaSpinner className="animate-spin text-3xl text-indigo-500" />
              <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
                Loading Modules...
              </p>
            </div>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && filteredSets.length === 0 && (
          <div
            className="flex flex-col items-center justify-center py-20 text-center"
            style={clayInsetWell}
          >
            <FaClipboardList className="text-5xl text-slate-300 mb-4" />
            <h3 className="text-lg font-black text-slate-500">
              No Modules Found
            </h3>
            <p className="text-slate-400 text-sm font-medium">
              No {activeTab.toLowerCase()} sets available for this topic yet.
            </p>
          </div>
        )}

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {filteredSets.map((set) => (
            <LevelCard
              key={set._id}
              set={set}
              activeTab={activeTab}
              onLaunch={() => handleLaunchTest(set)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENT: LEVEL CARD (Claymorphism Matches Coding Page) ---
const LevelCard = ({ set, activeTab, onLaunch }) => {
  const { level, userResult } = set;

  // Helpers
  const duration = set.config?.displayCount
    ? `${Math.round(set.config.displayCount * 1.5)} Mins`
    : "20 Mins";

  const points =
    set.level === "EASY" ? 100 : set.level === "MEDIUM" ? 200 : 300;

  // --- STYLES ---
  const cardStyle = {
    backgroundColor: "#FFFFFF",
    borderRadius: "32px",
    // Strong "Preference" / Depth (Deep Shadows like Coding Card)
    boxShadow:
      "16px 16px 32px rgba(163, 177, 198, 0.5), -16px -16px 32px rgba(255, 255, 255, 1)",
    border: "3px solid #FFFFFF",
  };

  const iconStyle = {
    background:
      activeTab === "PRACTICE"
        ? "linear-gradient(145deg, #f59e0b, #d97706)" // Amber for Practice
        : "linear-gradient(145deg, #1e293b, #0f172a)", // Slate for Assessment
    boxShadow: "8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff",
  };

  const pressedBadgeStyle = {
    boxShadow:
      "inset 2px 2px 5px rgba(163, 177, 198, 0.3), inset -2px -2px 5px rgba(255, 255, 255, 0.8)",
  };

  // Badge Color Helper
  const getLevelColor = (lvl) => {
    switch (lvl) {
      case "HARD":
        return "bg-rose-50 text-rose-600";
      case "MEDIUM":
        return "bg-amber-50 text-amber-600";
      case "EASY":
      default:
        return "bg-emerald-50 text-emerald-600";
    }
  };

  return (
    <div
      onClick={onLaunch}
      className="group relative w-full p-8 flex flex-col justify-between cursor-pointer transition-all duration-300 transform hover:-translate-y-2"
      style={cardStyle}
    >
      {/* Decorative Gradient Line */}
      <div className="absolute top-8 right-8 w-3 h-3 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_15px_rgba(99,102,241,0.8)]" />

      {/* --- TOP SECTION --- */}
      <div>
        <div className="flex justify-between items-start mb-6">
          {/* Clay Icon */}
          <div
            className="w-16 h-16 rounded-2xl text-white flex items-center justify-center text-2xl transition-transform group-hover:rotate-12 duration-500"
            style={iconStyle}
          >
            {activeTab === "PRACTICE" ? <FaBolt /> : <FaLayerGroup />}
          </div>

          {/* Level Badge (Pressed In) */}
          <span
            className={`px-5 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest ${getLevelColor(level)}`}
            style={pressedBadgeStyle}
          >
            {level}
          </span>
        </div>

        <h3 className="text-2xl font-black text-slate-700 mb-2 group-hover:text-indigo-600 transition-colors">
          {level} {activeTab === "ASSIGNMENT" ? "Assessment" : "Practice"}
        </h3>

        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold uppercase tracking-wider">
            <FaClock /> {duration}
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold uppercase tracking-wider">
            <FaStar className="text-amber-400" /> {points} XP
          </div>
        </div>
      </div>

      {/* --- FOOTER SECTION --- */}
      <div className="flex items-center justify-between  pt-6 border-t border-slate-100">
        {/* Result / Status (Pressed In) */}
        {userResult ? (
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${userResult.score >= 70 ? "bg-emerald-50 text-emerald-600" : "bg-indigo-50 text-indigo-600"}`}
            style={pressedBadgeStyle}
          >
            <FaCheckDouble className="text-xs" />
            <span className="text-[9px] md:text-[11px] font-black uppercase tracking-wide">
              {userResult.score}% Score
            </span>
          </div>
        ) : (
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-400"
            style={pressedBadgeStyle}
          >
            <span className="w-2 h-2 rounded-full bg-slate-300"></span>
            <span className="text-[10px] font-bold uppercase tracking-wide">
              Not Attempted
            </span>
          </div>
        )}

        {/* Action Button (With Text & Strong Clay) */}
        <button
          className="flex items-center gap-3 px-3 py-2 md:px-6 md:py-3 rounded-xl bg-[#F0F4F8] text-slate-500 font-bold text-[10px] md:text-xs uppercase tracking-wider transition-all duration-300 group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-105 active:scale-95"
          style={{ boxShadow: "6px 6px 12px #d1d9e6, -6px -6px 12px #ffffff" }}
        >
          <span>{userResult ? "Retake" : "Start"}</span>
          {userResult ? (
            <FaRedo className="text-[10px]" />
          ) : (
            <FaChevronRight className="text-[10px]" />
          )}
        </button>
      </div>
    </div>
  );
};

export default VideoMCQTestDisplay;
