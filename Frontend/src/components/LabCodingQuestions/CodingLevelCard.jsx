import React from "react";
import {
  FaCheckCircle,
  FaClock,
  FaChevronRight,
  FaTerminal,
} from "react-icons/fa";

const CodingLevelCard = ({ set, onClick }) => {
  const { level, questionCount, userResult } = set;

  // --- BADGE STYLES (Reverted to Light Colors) ---
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

  const getStatusColor = (result) => {
    if (result?.status === "GRADED") {
      return "bg-emerald-50 text-emerald-600";
    }
    return "bg-orange-50 text-orange-600";
  };

  // --- CLAY STYLES ---
  const cardStyle = {
    backgroundColor: "#FFFFFF",
    borderRadius: "40px",
    // Strong "Preference" / Depth (Deep Shadows)
    boxShadow:
      "16px 16px 32px rgba(163, 177, 198, 0.5), -16px -16px 32px rgba(255, 255, 255, 1)",
    border: "3px solid #FFFFFF",
  };

  const iconStyle = {
    background: "linear-gradient(145deg, #1e293b, #0f172a)",
    boxShadow: "8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff",
  };

  // Engraved/Pressed effect for badges
  const pressedBadgeStyle = {
    boxShadow:
      "inset 2px 2px 5px rgba(163, 177, 198, 0.3), inset -2px -2px 5px rgba(255, 255, 255, 0.8)",
  };

  return (
    <div
      onClick={onClick}
      // Removed min-h, Added w-full. Kept p-8 for balance.
      className="group relative w-[320px] md:w-[380px] xl:w-[400px] p-8 flex flex-col justify-between cursor-pointer transition-all duration-300 transform hover:-translate-y-2"
      style={cardStyle}
    >
      {/* Decorative Gradient Line */}
      <div className="absolute top-7 right-7 w-3 h-3 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-[0_0_15px_rgba(99,102,241,0.8)]" />

      {/* --- TOP SECTION --- */}
      <div>
        <div className="flex justify-between items-start mb-6">
          {/* Clay Icon */}
          <div
            className="w-16 h-16 rounded-2xl text-white flex items-center justify-center text-2xl"
            style={iconStyle}
          >
            <FaTerminal />
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
          {level} Coding Set
        </h3>

        <p className="text-slate-400 font-medium text-sm leading-relaxed mb-8">
          Contains{" "}
          <span className="text-slate-700 font-extrabold">{questionCount}</span>{" "}
          problem statement{questionCount > 1 ? "s" : ""}.
          <br />
          Manual code review required.
        </p>
      </div>

      {/* --- FOOTER SECTION --- */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-100">
        {/* Status Indicator (Pressed In) */}
        <div
          className={`flex items-center gap-2 px-5 py-2 rounded-xl transition-all ${getStatusColor(userResult)}`}
          style={pressedBadgeStyle}
        >
          {userResult ? (
            <FaCheckCircle className="text-xs" />
          ) : (
            <FaClock className="text-xs" />
          )}
          <span className="text-[10px] font-bold uppercase tracking-wide">
            {userResult ? userResult.status.replace("_", " ") : "Pending"}
          </span>
        </div>

        {/* Action Button (Floats) */}
        <button
          className="w-12 h-12 rounded-full bg-[#F0F4F8] flex items-center justify-center text-slate-400 transition-all duration-300 group-hover:bg-indigo-600 group-hover:text-white group-hover:scale-110"
          style={{
            boxShadow: "6px 6px 12px #d1d9e6, -6px -6px 12px #ffffff",
          }}
        >
          <FaChevronRight className="text-sm" />
        </button>
      </div>
    </div>
  );
};

export default CodingLevelCard;
