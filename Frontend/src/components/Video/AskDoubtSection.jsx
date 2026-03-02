import React from "react";
import { FaQuestionCircle, FaPaperPlane } from "react-icons/fa";

const AskDoubtSection = ({ doubt, setDoubt }) => {
  // --- STRONG CLAY STYLES ---

  // 1. Main Card (Massive Depth)
  const clayCardStyle = {
    backgroundColor: "#F3F4F6", // Slight off-white to let the white highlight pop
    borderRadius: "30px", // Rounded, soft corners
    // 1. Tighter Outer Shadow (Float)
    // 2. Strong Inner Highlight (Volume Top-Left)
    // 3. Soft Inner Shadow (Volume Bottom-Right)
    boxShadow: `
      12px 12px 24px rgba(163, 177, 198, 0.6), 
      -12px -12px 24px rgba(255, 255, 255, 1), 
      inset 6px 6px 10px rgba(255, 255, 255, 0.9), 
      inset -6px -6px 10px rgba(163, 177, 198, 0.15)
    `,
    border: "1px solid rgba(255,255,255,0.4)",
  };

  // 2. Textarea (Deep Carved Well)
  const clayInsetWell = {
    backgroundColor: "#E5E7EB",
    borderRadius: "20px",
    // Stronger inset shadow. Fixed bottom-right to be dark (not white) for depth.
    boxShadow: "inset 8px 8px 16px #b8b9be, inset -4px -4px 16px #ffffff",
    border: "none",
  };

  // 3. Button (Thick 3D Slab)
  const clayButtonStyle = {
    background: "linear-gradient(145deg, #7e22ce, #6b21a8)", // Purple Gradient
    color: "white",
    borderRadius: "20px",
    boxShadow: `
      8px 8px 16px rgba(163, 177, 198, 0.6), 
      -8px -8px 16px rgba(255, 255, 255, 1), 
      inset 4px 4px 8px rgba(255, 255, 255, 0.4), 
      inset -4px -4px 8px rgba(0, 0, 0, 0.2)
    `,
    border: "1px solid rgba(255,255,255,0.2)", // Adds the final glass/clay edge
    transition: "transform 0.1s ease, box-shadow 0.1s ease",
  };
  return (
    <div
      className="max-w-3xl mx-auto mt-12 p-10 md:p-12 font-sans"
      style={clayCardStyle}
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-purple-700 text-xl"
          style={{
            backgroundColor: "#F3F4F6",
            boxShadow: "6px 6px 12px #cfd1d6, -6px -6px 12px #ffffff",
          }}
        >
          <FaQuestionCircle />
        </div>
        <h2 className="text-3xl font-black text-purple-900 tracking-tight">
          Ask a Doubt
        </h2>
      </div>

      {/* Input Well */}
      <div className="relative mb-8">
        <textarea
          value={doubt}
          onChange={(e) => setDoubt(e.target.value)}
          placeholder="Type your question here... be specific!"
          className="w-full p-8 h-48 text-purple-900 placeholder-purple-800/40 text-base font-medium focus:outline-none resize-none transition-all focus:ring-4 focus:ring-purple-200/50"
          style={clayInsetWell}
        />
        {/* Character Count */}
        <div className="absolute bottom-4 right-6 text-xs font-bold text-purple-400 opacity-60 pointer-events-none uppercase tracking-widest">
          {doubt.length} chars
        </div>
      </div>

      {/* 3D Button */}
      <button
        className="w-full py-5 flex items-center justify-center gap-3 font-black uppercase tracking-widest text-sm hover:-translate-y-1 active:scale-95 active:shadow-inner transition-transform"
        style={clayButtonStyle}
      >
        <span>Submit Doubt</span>
        <FaPaperPlane className="text-sm" />
      </button>
    </div>
  );
};

export default AskDoubtSection;
