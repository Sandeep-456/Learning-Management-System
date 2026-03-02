import { useState } from "react";
import {
  FaVideo,
  FaCalendarAlt,
  FaClock,
  FaUsers,
  FaExclamationCircle,
} from "react-icons/fa";

const LiveClassLobby = ({ session }) => {
  // State for the notification
  const [showWarning, setShowWarning] = useState(false);

  // Format date
  const dateObj = new Date(session.scheduledDate);
  const dateStr = dateObj.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const timeStr = dateObj.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  // --- CLICK HANDLER ---
  const handleJoinClick = (e) => {
    const now = new Date();

    // Check if current time is BEFORE the scheduled time
    // (You can subtract 10 minutes (10 * 60 * 1000) if you want to allow 10 min early joining)
    if (now < dateObj) {
      e.preventDefault(); // STOP redirection
      setShowWarning(true);

      // Hide message after 3 seconds
      setTimeout(() => setShowWarning(false), 3000);
    }
  };

  // --- 1. Main Card Style (Matte Base + Volume) ---
  const clayCardStyle = {
    backgroundColor: "#F0F4F8",
    borderRadius: "3rem", // 48px
    // The "Deep Clay" stack: Float + Inner Highlight + Inner Shadow
    boxShadow: `
      20px 20px 60px #cedbe7, 
      -20px -20px 60px #ffffff, 
      inset 6px 6px 10px rgba(255, 255, 255, 0.9), 
      inset -6px -6px 10px rgba(163, 177, 198, 0.15)
    `,
    border: "1px solid rgba(255,255,255,0.4)",
  };

  // --- 2. Button/Icon Style (Gradient + Volume) ---
  const clayButtonStyle = {
    background: "linear-gradient(145deg, #8b5cf6, #6d28d9)", // Violet Gradient
    color: "white",
    // Float + Glossy Volume for Colored Elements
    boxShadow: `
      8px 8px 16px #b8b9be, 
      -8px -8px 16px #ffffff, 
      inset 4px 4px 8px rgba(255, 255, 255, 0.4), 
      inset -4px -4px 8px rgba(0, 0, 0, 0.2)
    `,
    border: "1px solid rgba(255,255,255,0.2)",
    transition: "transform 0.1s ease, box-shadow 0.1s ease",
  };

  // --- 3. Pill Style (White/Light + Volume) ---
  const clayPillStyle = {
    backgroundColor: "#F3F4F6",
    color: "#475569", // Slate-600
    // Subtle Float + Volume
    boxShadow: `
      6px 6px 12px #cedbe7, 
      -6px -6px 12px #ffffff, 
      inset 3px 3px 6px rgba(255, 255, 255, 0.9), 
      inset -3px -3px 6px rgba(163, 177, 198, 0.15)
    `,
    border: "1px solid rgba(255,255,255,0.6)",
  };

  return (
    <div className="relative w-full font-sans flex items-center justify-center p-4">
      {/* BACKGROUND DECORATIONS (Floating Blobs) */}
      <div className="absolute top-0 left-10 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-0 right-10 w-40 h-40 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse animation-delay-2000"></div>

      {/* MAIN CLAY CARD */}
      <div
        className="relative z-10 w-full max-w-2xl p-10 md:p-14 text-center"
        style={clayCardStyle}
      >
        {/* ICON CONTAINER */}
        <div className="relative inline-block mb-8">
          <div
            className="w-24 h-24 mx-auto rounded-3xl flex items-center justify-center text-white transform rotate-[-6deg] transition-transform hover:rotate-0 duration-500 ease-out"
            style={{
              ...clayButtonStyle, // Use same deep style as button
              borderRadius: "24px",
            }}
          >
            <FaVideo className="text-4xl drop-shadow-md" />
          </div>
          {/* Decorative Badge */}
          <div className="absolute -top-2 -right-4 bg-red-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg animate-bounce border border-white/20">
            LIVE
          </div>
        </div>

        {/* TEXT CONTENT */}
        <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-4 tracking-tight leading-tight">
          {session.title || "Live Session"}
        </h2>

        <p className="text-slate-500 font-medium text-sm md:text-base max-w-lg mx-auto mb-10 leading-relaxed">
          Get ready to learn! This interactive session starts soon. Please join
          a few minutes early to check your audio and video.
        </p>

        {/* INFO PILLS (Date & Time) */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <div
            className="flex items-center gap-3 px-6 py-3 rounded-2xl font-bold text-sm"
            style={clayPillStyle}
          >
            <FaCalendarAlt className="text-violet-400 text-lg" />
            <span>{dateStr}</span>
          </div>

          <div
            className="flex items-center gap-3 px-6 py-3 rounded-2xl font-bold text-sm"
            style={clayPillStyle}
          >
            <FaClock className="text-violet-400 text-lg" />
            <span>{timeStr}</span>
          </div>
        </div>

        {/* ACTION BUTTON CONTAINER (Relative for Tooltip positioning) */}
        <div className="relative inline-block">
          {/* --- THE WARNING TOOLTIP --- */}
          {showWarning && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 w-64 z-20 animate-[bounce_0.5s_infinite]">
              <div className="bg-red-50 text-red-600 px-4 py-2 rounded-xl border border-red-200 shadow-xl flex items-center justify-center gap-2 text-xs font-bold">
                <FaExclamationCircle className="text-sm" />
                <span>Wait! Class hasn't started yet.</span>
              </div>
              {/* Arrow pointing down */}
              <div className="w-3 h-3 bg-red-50 border-r border-b border-red-200 transform rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1.5"></div>
            </div>
          )}
          <a
            href={session.liveClassLink}
            onClick={handleJoinClick}
            target="_blank"
            rel="noreferrer"
            className="relative group inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-black tracking-wide transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 active:scale-95"
            style={clayButtonStyle}
          >
            <FaUsers className="text-xl" />
            <span>Join Zoom Meeting</span>

            {/* Hover Shine Effect */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
              <div className="absolute inset-0 translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>
          </a>
        </div>

        {/* FOOTER NOTE */}
        <p className="mt-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
          Attendance is mandatory
        </p>
      </div>
    </div>
  );
};

export default LiveClassLobby;
