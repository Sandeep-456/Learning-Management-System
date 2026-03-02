import React, { useState } from "react";
import { FaFileAlt, FaClock, FaCheck, FaBookOpen } from "react-icons/fa";

const CheatSheetDisplay = ({ url, subtopicId }) => {
  const [isRead, setIsRead] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // --- HELPER: CONVERT DRIVE LINK TO EMBED LINK ---
  const getEmbedUrl = (originalUrl) => {
    if (!originalUrl) return null;

    // If it's a Google Drive link, we need to extract the ID and use '/preview'
    // Check if it's a Drive link
    if (originalUrl.includes("drive.google.com")) {
      // 1. Convert '/view' or '/edit' to '/preview'
      return originalUrl
        .replace(/\/view.*$/, "/preview")
        .replace(/\/edit.*$/, "/preview");
    }
    return originalUrl; // Return original if it's not a drive link
  };

  const handleComplete = () => {
    // Prevent double clicking
    if (isAnimating) return;

    setIsAnimating(true);

    // Simulate API delay / UI animation timing
    setTimeout(() => {
      setIsRead(!isRead);
      setIsAnimating(false);
      console.log(
        "Marking PDF status:",
        !isRead ? "Read" : "Unread",
        subtopicId,
      );
    }, 200);
  };

  return (
    <div className="relative font-sans">
      {/* DECORATIVE BACKDROP BLOBS */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

      {/* MAIN CLAY CARD */}
      <div
        className="relative z-10 bg-[#F0F4F8] rounded-[2.5rem] p-8 md:p-10"
        style={{
          // This creates the "Clay" look: Light top-left inset + Dark bottom-right shadow
          boxShadow: "20px 20px 60px #cedbe7, -20px -20px 60px #ffffff",
        }}
      >
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          {/* Title Area */}
          <div className="flex items-center gap-5">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white transform rotate-[-3deg] transition-transform hover:rotate-0 duration-300"
              style={{
                background: "linear-gradient(145deg, #4f46e5, #3b82f6)",
                boxShadow: "5px 5px 15px #c1c9d2, -5px -5px 15px #ffffff",
              }}
            >
              <FaFileAlt className="text-2xl drop-shadow-md" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight leading-none">
                Reference Notes
              </h2>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Cheat Sheet
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Action Button */}
          <button
            onClick={handleComplete}
            className={`
                relative overflow-hidden group flex items-center gap-3 px-6 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 ease-out
                ${
                  isRead
                    ? "bg-emerald-50 text-emerald-600 shadow-inner ring-1 ring-emerald-100 translate-y-[2px]"
                    : "bg-white text-slate-600 hover:text-blue-600 hover:-translate-y-1"
                }
            `}
            style={
              !isRead
                ? {
                    boxShadow: "8px 8px 16px #d1d9e6, -8px -8px 16px #ffffff",
                  }
                : {}
            }
          >
            <div
              className={`
                w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300
                ${isRead ? "bg-emerald-500 text-white scale-110" : "bg-slate-100 text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-500"}
            `}
            >
              {isRead ? (
                <FaCheck className="text-xs" />
              ) : (
                <FaBookOpen className="text-xs" />
              )}
            </div>

            <span className="relative z-10">
              {isRead ? "Completed" : "Mark as Read"}
            </span>

            {/* Shine Effect on Hover (Unread) */}
            {!isRead && (
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent z-0"></div>
            )}
          </button>
        </div>

        {/* --- CONTENT WINDOW --- */}
        <div
          className="w-full h-[65vh] rounded-3xl overflow-hidden relative bg-slate-50"
          // Inner shadow to look like a recessed window
          style={{
            boxShadow:
              "inset 10px 10px 20px #d1d9e6, inset -10px -10px 20px #ffffff",
          }}
        >
          {url ? (
            <iframe
              // --- USE THE HELPER FUNCTION HERE ---
              src={getEmbedUrl(url)}
              className="w-full h-full rounded-3xl"
              title="Cheat Sheet Viewer"
              style={{ border: "none" }}
              allow="autoplay"
            />
          ) : (
            // --- EMPTY STATE ---
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-white/50 backdrop-blur-[2px]">
              <div className="relative mb-6">
                {/* Floating Icon Circle */}
                <div
                  className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-blue-400 animate-[float_3s_ease-in-out_infinite]"
                  style={{
                    boxShadow:
                      "10px 10px 30px #d1d9e6, -10px -10px 30px #ffffff",
                  }}
                >
                  <FaClock className="text-4xl" />
                </div>
                {/* Shadow underneath */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-2 bg-slate-300 rounded-full blur-md opacity-40 animate-[shadow_3s_ease-in-out_infinite]"></div>
              </div>

              <h3 className="text-2xl font-black text-slate-700 mb-2">
                Brewing Content
              </h3>
              <p className="text-slate-500 font-medium max-w-sm leading-relaxed text-sm">
                We're currently polishing this cheat sheet. It will be available
                here shortly.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheatSheetDisplay;
