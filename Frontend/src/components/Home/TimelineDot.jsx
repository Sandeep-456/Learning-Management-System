import React from "react";

const TimelineDot = ({ active }) => (
  <div
    className={
      "relative z-10 w-3.5 h-3.5 rounded-full border-4 bg-white " +
      (active ? "border-indigo-500" : "border-slate-300")
    }
  />
);

export default TimelineDot;
