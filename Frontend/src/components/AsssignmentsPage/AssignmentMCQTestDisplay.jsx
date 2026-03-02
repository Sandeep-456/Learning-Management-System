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
} from "react-icons/fa";
import api from "../../utils/api"; // Assuming this path is correct

const AssignmentMCQTestDisplay = ({ subtopicId }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [mcqSets, setMcqSets] = useState([]);
  const [activeTab, setActiveTab] = useState("PRACTICE"); // Default to Practice

  // State for taking a test (placeholder)
  const [testMode, setTestMode] = useState(false);
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [activeSetInfo, setActiveSetInfo] = useState(null);

  // 1. FETCH ALL AVAILABLE SETS FOR THIS SUBTOPIC
  useEffect(() => {
    const fetchMCQSets = async () => {
      try {
        setLoading(true);
        // Use the subtopicId passed as a prop
        const { data } = await api.get(`/mcq/${subtopicId}`);
        setMcqSets(data);
      } catch (error) {
        console.error("Failed to fetch MCQ sets", error);
        // Fallback or empty state handled in UI
      } finally {
        setLoading(false);
      }
    };

    if (subtopicId) {
      fetchMCQSets();
    }
  }, [subtopicId]);

  // 2. HANDLE LAUNCH (Redirect Logic)
  const handleLaunchTest = (set) => {
    // Navigate to the standalone workspace
    // We pass 'state' so the next page knows what Level/Type to load
    navigate(`/assignment/workspace/${subtopicId}`, {
      state: {
        mcqSetId: set._id, // Pass the actual MCQ set ID in state
        type: set.setType, // "PRACTICE" or "ASSIGNMENT"
        level: set.level, // "EASY", "MEDIUM", "HARD"
        topic: set.title || "Assessment", // Use set.title if available, else a generic "Assessment"
      },
    });
  };

  // 3. FILTER SETS BASED ON TAB
  const filteredSets = mcqSets.filter((set) => set.setType === activeTab);

  // --- VIEW: TAKING THE TEST (PLACEHOLDER) ---
  if (testMode) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-sm min-h-[500px]">
        <button
          onClick={() => setTestMode(false)}
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-6 font-bold text-sm clay-interactive-bubble"
        >
          <FaChevronLeft /> Back to Dashboard
        </button>

        <h2 className="text-2xl font-bold mb-2 text-slate-800">
          {activeSetInfo?.level}{" "}
          {activeSetInfo?.setType === "ASSIGNMENT" ? "Assessment" : "Practice"}
        </h2>
        <p className="text-slate-500 mb-6">
          Question 1 of {activeQuestions.length} (Placeholder)
        </p>

        {/* Placeholder for Question UI */}
        <div className="p-10 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 text-center text-slate-400">
          [ MCQ Question Interface Renders Here ]
        </div>
      </div>
    );
  }

  // --- VIEW: DASHBOARD (CARDS) ---
  return (
    <div className="bg-slate-50 p-6 lg:p-10 rounded-3xl min-h-[500px] clay-card">
      {/* HEADER & TABS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Assessment Center
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Select a module to test your knowledge
          </p>
        </div>

        {/* TABS SWITCHER */}
        <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200 clay-interactive-bubble">
          <button
            onClick={() => setActiveTab("PRACTICE")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all clay-interactive-bubble ${
              activeTab === "PRACTICE"
                ? "bg-indigo-600 text-white shadow-md"
                : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            <FaBolt /> Practice Labs
          </button>
          <button
            onClick={() => setActiveTab("ASSIGNMENT")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all clay-interactive-bubble ${
              activeTab === "ASSIGNMENT"
                ? "bg-indigo-600 text-white shadow-md"
                : "text-slate-500 hover:bg-slate-50"
            }`}
          >
            <FaLayerGroup /> Assessments
          </button>
        </div>
      </div>

      {/* LOADING STATE */}
      {loading && (
        <div className="flex justify-center items-center h-40">
          <FaSpinner className="animate-spin text-3xl text-indigo-600" />
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && filteredSets.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-slate-200 clay-card">
          <FaClipboardList className="text-4xl text-slate-300 mx-auto mb-3" />
          <p className="text-slate-500 font-medium">
            No {activeTab.toLowerCase()} sets available for this topic yet.
          </p>
        </div>
      )}

      {/* CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
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
  );
};

// --- SUB-COMPONENT: LEVEL CARD ---
const LevelCard = ({ set, activeTab, onLaunch }) => {
  // Extract Result from Backend Data
  const result = set.userResult; // This should come from the API response

  const isHard = set.level === "HARD" || set.level === "MEDIUM";
  const duration = set.config?.displayCount
    ? `${Math.round(set.config.displayCount * 1.5)} Mins`
    : "20 Mins"; // Default value or calculated based on questions
  const points =
    set.level === "EASY" ? 100 : set.level === "MEDIUM" ? 200 : 300;

  return (
    <div onClick={onLaunch} className="group cursor-pointer h-full">
      <div className="bg-gray-50 h-full border border-slate-200 rounded-3xl px-8 py-6 shadow-sm hover:shadow-xl hover:border-indigo-100 hover:-translate-y-1 transition-all duration-500 relative overflow-hidden flex flex-col clay-card">
        {/* Decorative Gradient Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

        {/* HEADER */}
        <div className="flex justify-between items-start mb-6">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl shadow-inner ${
              activeTab === "PRACTICE"
                ? "bg-orange-50 text-orange-600"
                : "bg-slate-900 text-white"
            }`}
          >
            {activeTab === "PRACTICE" ? (
              <FaBolt className="text-2xl" />
            ) : (
              <FaLayerGroup className="text-2xl" />
            )}
          </div>

          <div className="flex flex-col items-end gap-2">
            <span
              className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                isHard ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
              }`}
            >
              {set.level}
            </span>
            <div className="flex gap-4 text-slate-400 text-xs font-bold uppercase tracking-widest">
              <span className="flex items-center gap-1.5">
                <FaClock /> {duration}
              </span>
              <span className="flex items-center gap-1.5">
                <FaStar className="text-amber-400" /> {points} XP
              </span>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-indigo-600 transition-colors">
            {set.level} {activeTab === "ASSIGNMENT" ? "Assessment" : "Practice"}
          </h3>

          <p className="text-slate-500 text-xs leading-relaxed mb-6">
            {activeTab === "ASSIGNMENT"
              ? "Complete this graded assessment to verify your understanding of the core concepts."
              : "A flexible practice environment to test your skills without time pressure or grading."}
          </p>
        </div>

        {/* FOOTER - Updated with Attempts & Real Score */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-50 mt-auto">
          {/* LEFT: RESULT DISPLAY */}
          <div className="flex items-center gap-3">
            {result ? (
              <div className="flex flex-col items-start">
                <div
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border ${result.isPassed ? "bg-emerald-50 border-emerald-100" : "bg-indigo-50 border-indigo-100"}`}
                >
                  <FaCheckDouble
                    className={
                      result.isPassed ? "text-emerald-600" : "text-indigo-600"
                    }
                  />
                  <span
                    className={`text-sm font-black ${result.isPassed ? "text-emerald-700" : "text-indigo-700"}`}
                  >
                    {result.score}%
                  </span>
                </div>
                {/* NEW: Attempt Counter */}
                <span className="text-[10px] font-bold text-slate-400 ml-1 mt-1 flex items-center gap-1">
                  <FaRedo className="text-[8px]" /> Attempt {result.attempt}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-slate-300">
                <div className="h-8 w-8 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center text-[10px]">
                  —
                </div>
                <span className="text-xs font-bold italic">No attempts</span>
              </div>
            )}
          </div>

          {/* RIGHT: ACTION BUTTON */}
          <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-indigo-600 transition-all shadow-lg shadow-slate-200 group-hover:shadow-indigo-200 clay-interactive-bubble">
            {result ? "Retake" : "Launch"}
            <FaChevronRight className="text-[10px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignmentMCQTestDisplay;
