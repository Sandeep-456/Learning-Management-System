import React from "react";

const Pill = ({ tone = "neutral", children }) => {
  const tones = {
    neutral: "text-slate-700 bg-slate-100",
    learn: "text-emerald-700 bg-emerald-100",
    practice: "text-amber-700 bg-amber-100",
    project: "text-indigo-700 bg-indigo-100",
    quiz: "text-fuchsia-700 bg-fuchsia-100",
    live: "text-violet-700 bg-violet-100",
    recording: "text-orange-700 bg-orange-100",
    holiday: "text-gray-700 bg-gray-100",
    doubt: "text-teal-700 bg-teal-100",
  };
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${tones[tone]}`}
    >
      {children}
    </span>
  );
};

export default Pill;
