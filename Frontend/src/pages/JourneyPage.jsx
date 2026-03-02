import { useState } from "react";
import { useCourse } from "../context/CourseContext";
import JourneyDisplay from "../components/Journey/JourneyDisplay";
import JourneyTopicPopup from "../components/Journey/JourneyTopicPopup";

export default function Journey() {
  const { courseHierarchy, loading } = useCourse();
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // --- MINIMAL CLAY LOADING STATE ---
  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-[#F0F4FF]">
        <div className="px-8 py-4 rounded-[30px] bg-white text-indigo-600 text-sm font-black uppercase tracking-widest shadow-[15px_15px_35px_rgba(174,190,230,0.5),-10px_-10px_25px_rgba(255,255,255,1),inset_4px_4px_8px_white] animate-pulse">
          Loading Journey
        </div>
      </div>
    );
  }

  if (!courseHierarchy) {
    return (
      <div className="flex h-full items-center justify-center ">
        <div className="px-6 py-3 rounded-2xl bg-[#E2E8F5] text-slate-500 font-black text-xs uppercase tracking-[0.2em] shadow-[inset_4px_4px_8px_rgba(0,0,0,0.05)]">
          No Course Found
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto scrollbar-hide px-3 py-5 md:px-6 md:py-6 bg-[#E8EBF9]">
      <div className="max-w-full mx-auto space-y-10 md:max-w-[96%]">
        {/* --- COMPACT ULTRA-CLAY HEADER --- */}
        <div className="flex flex-row justify-between items-center px-4 py-6 md:px-8 rounded-[40px] bg-[#F0F4FF] border-2 border-white shadow-[20px_20px_40px_rgba(174,190,230,0.5),-15px_-15px_30px_rgba(255,255,255,1),inset_8px_8px_16px_rgba(255,255,255,1),inset_-8px_-8px_16px_rgba(174,190,230,0.3)]">
          <div className="text-center md:text-left">
            <h2 className="text-xl md:text-2xl font-black text-[#1A1C4B] tracking-tight">
              Learning Journey
            </h2>
            <p className="text-[9px] md:text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-1">
              Track Your Milestones
            </p>
          </div>

          {/* MINIMAL ULTRA-CLAY BADGE */}
          <div className="mt-4 md:mt-0 px-5 py-2.5 rounded-full text-[10px] md:text-[11px] font-black uppercase tracking-widest text-white bg-[#1A1C4B] border-2 border-white/20 shadow-[10px_10px_20px_rgba(26,28,75,0.2),inset_4px_4px_8px_rgba(255,255,255,0.3),inset_-4px_-4px_8px_rgba(0,0,0,0.3)] transition-transform hover:scale-105 active:scale-95">
            {courseHierarchy.name}
          </div>
        </div>

        {/* --- MAIN DISPLAY BUBBLE --- */}
        <div className="p-2 bg-transparent">
          <JourneyDisplay
            loading={loading}
            stages={courseHierarchy.stages}
            setSelectedTopic={setSelectedTopic}
            setShowPopup={setShowPopup}
          />
        </div>
      </div>

      <JourneyTopicPopup
        showPopup={showPopup}
        setShowPopup={setShowPopup}
        selectedTopic={selectedTopic}
      />
    </div>
  );
}
