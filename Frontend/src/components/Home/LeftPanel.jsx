import React from "react";
import { format } from "date-fns";
import {
  FaVideo,
  FaCode,
  FaFlask,
  FaClipboardCheck,
  FaQuestionCircle,
  FaPlayCircle,
  FaBookOpen,
} from "react-icons/fa";

import { HiLockClosed } from "react-icons/hi";
import { Link } from "react-router-dom";

const LeftPanel = ({ itemsForDay }) => {
  // console.log("FULL itemsForDay:", itemsForDay);

  //   const formatted = format(selectedDate, "EEEE, MMM dd yyyy");

  //   const getTopicHeader = () => {
  //     if (itemsForDay.length > 0)
  //       return itemsForDay[0].subtitle || "Course Schedule";
  //     return "No Classes Scheduled";
  //   };

  //   const isDateLocked = (date) => {
  //     const currentDate = startOfDay(new Date());
  //     const oneWeekFromNow = addDays(currentDate, 7);
  //     return isAfter(date, oneWeekFromNow);
  //   };

  // console.log(itemsForDay);

  // {
  //   /* --- DATE STRIP --- */
  // }
  //       <div className="h-24 flex items-center">
  //         <DateStrip date={selectedDate} setDate={setSelectedDate} />
  //       </div>

  return (
    <div className="h-full flex flex-col bg-[#F0F2FA] rounded-xl">
      {/* --- HEADER SECTION --- */}
      {/* Reduced padding (p-8) for mobile, kept md:p-12 for desktop */}
      <div className="bg-[#1A1C4B] p-8 md:p-12 pb-20 md:pb-24 relative overflow-hidden">
        <div className="relative flex justify-between items-center">
          <div>
            {/* Scaled text size: text-3xl for mobile, md:text-5xl for desktop */}
            <h1 className="text-white text-3xl md:text-5xl font-bold flex items-center gap-4 mb-4">
              Technology{" "}
              <span className="text-2xl md:text-3xl opacity-50">→</span>
            </h1>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-[10px] font-bold text-white tracking-widest uppercase">
                AI/ML Program
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- SESSIONS LIST CONTAINER --- */}
      {/* Reduced padding (p-4) on mobile to prevent horizontal overflow */}
      <div className="flex-1 bg-white -mt-12 p-4 md:p-10 overflow-y-auto scrollbar-hide relative rounded-t-[40px] md:rounded-t-0 shadow-[inset_0_10px_20px_rgba(255,255,255,0.9)]">
        <div className="mx-auto space-y-6">
          {itemsForDay.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-slate-400">
              <FaVideo className="text-6xl mb-4 opacity-10" />
              <p className="text-lg font-medium">No sessions scheduled.</p>
            </div>
          ) : (
            itemsForDay.flatMap((item, idx) => {
              const cards = [
                <SessionCard key={`session-${idx}`} item={item} />,
              ];
              if (item.recordingUrl) {
                cards.push(
                  <SessionCard
                    key={`recording-${idx}`}
                    item={{ ...item, isRecordingCard: true }}
                  />,
                );
              }
              return cards;
            })
          )}
        </div>
      </div>
    </div>
  );
};

const SessionCard = ({ item }) => {
  const styles = {
    LIVE_CLASS: {
      icon: <FaVideo />,
      badge: "Live Class",
      badgeColor: "bg-indigo-100 text-indigo-700",
      btnText: "Join Zoom",
      targetType: "LIVE",
      actionColor:
        "bg-[#1A1C4B] shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.3),inset_4px_4px_8px_rgba(255,255,255,0.2),0_8px_15px_rgba(26,28,75,0.2)]",
      iconBg: "bg-[#1A1C4B]",
      clay: "shadow-[10px_10px_20px_#d1d9e6,-10px_-10px_20px_#ffffff,inset_4px_4px_12px_rgba(255,255,255,0.8)]",
    },
    LAB: {
      icon: <FaCode />,
      badge: "Practical Lab",
      badgeColor: "bg-orange-100 text-orange-700",
      btnText: "View Problem",
      targetType: "LAB",
      actionColor:
        "bg-orange-500 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.3),inset_4px_4px_8px_rgba(255,255,255,0.3),0_8px_15px_rgba(249,115,22,0.3)]",
      iconBg: "bg-orange-500",
      clay: "shadow-[10px_10px_20px_#d1d9e6,-10px_-10px_20px_#ffffff,inset_4px_4px_12px_rgba(255,255,255,0.8)]",
    },
    PROJECT: {
      icon: <FaFlask />,
      badge: "Project",
      badgeColor: "bg-pink-100 text-pink-700",
      btnText: "Start Project",
      actionColor:
        "bg-pink-500 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.3),inset_4px_4px_8px_rgba(255,255,255,0.3),0_8px_15px_rgba(236,72,153,0.3)]",
      targetType: "PROJECT",
      iconBg: "bg-pink-500",
      clay: "shadow-[10px_10px_20px_#d1d9e6,-10px_-10px_20px_#ffffff,inset_4px_4px_12px_rgba(255,255,255,0.8)]",
    },
    ASSESSMENT: {
      icon: <FaClipboardCheck />,
      badge: "Assessment",
      badgeColor: "bg-purple-100 text-purple-700",
      btnText: "Take Quiz",
      actionColor:
        "bg-purple-500 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.3),inset_4px_4px_8px_rgba(255,255,255,0.3),0_8px_15px_rgba(168,85,247,0.3)]",
      targetType: "MCQ",
      iconBg: "bg-purple-500",
      clay: "shadow-[10px_10px_20px_#d1d9e6,-10px_-10px_20px_#ffffff,inset_4px_4px_12px_rgba(255,255,255,0.8)]",
    },
    DOUBT_SESSION: {
      icon: <FaQuestionCircle />,
      badge: "Doubt Session",
      badgeColor: "bg-teal-100 text-teal-700",
      btnText: "Join Session",
      targetType: "LIVE",
      actionColor:
        "bg-teal-500 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.3),inset_4px_4px_8px_rgba(255,255,255,0.3),0_8px_15px_rgba(20,184,166,0.3)]",
      iconBg: "bg-teal-500",
      clay: "shadow-[10px_10px_20px_#d1d9e6,-10px_-10px_20px_#ffffff,inset_4px_4px_12px_rgba(255,255,255,0.8)]",
    },
    RECORDING_VIEW: {
      icon: <FaPlayCircle />,
      badge: "Class Recording",
      badgeColor: "bg-red-100 text-red-700",
      targetType: "RECORDING",
      actionColor:
        "bg-red-500 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.3),inset_4px_4px_8px_rgba(255,255,255,0.3),0_8px_15px_rgba(239,68,68,0.3)]",
      iconBg: "bg-red-500",
      clay: "shadow-[10px_10px_20px_#d1d9e6,-10px_-10px_20px_#ffffff,inset_4px_4px_12px_rgba(255,255,255,0.8)]",
      btnText: "Watch Recording",
    },
    CHEAT_SHEET: {
      icon: <FaBookOpen />,
      badge: "Cheat Sheet",
      badgeColor: "bg-emerald-100 text-emerald-700",
      btnText: "View Notes",
      targetType: "PDF",
      actionColor:
        "bg-emerald-500 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.3),inset_4px_4px_8px_rgba(255,255,255,0.3),0_8px_15px_rgba(16,185,129,0.3)]",
      iconBg: "bg-emerald-500",
      clay: "shadow-[10px_10px_20px_#d1d9e6,-10px_-10px_20px_#ffffff,inset_4px_4px_12px_rgba(255,255,255,0.8)]",
    },
  };

  const cardType = item.isRecordingCard ? "RECORDING_VIEW" : item.type;
  const style = styles[cardType] || styles.LIVE_CLASS;

  // Video Page Path
  const destinationPath = `/video/${item.subtopicId}`;

  // Project Page Path
  const projectPath = `/project/${item.relatedSubtopicIds?.[0] || item.subtopicId}`;

  // Helper to determine what to render
  const renderActionButton = () => {
    // 1. If this is the extra Recording Card, link to video page
    if (item.isRecordingCard) {
      return (
        <Link
          to={destinationPath}
          state={{ activeContentType: "RECORDING", autoPlay: true }}
          className={`px-8 py-3.5 cursor-pointer rounded-[22px] text-sm font-black text-white border border-white/10 transition-all hover:scale-105 active:scale-95 ${style.actionColor}`}
        >
          {style.btnText}
        </Link>
      );
    }

    // // 2. If session has a recording, disable the original Join Zoom button
    // if (item.liveClassLink) {
    //   const isDisabled = !!item.recordingLink;
    //   return (
    //     <a
    //       href={isDisabled ? null : item.liveClassLink}
    //       target="_blank"
    //       rel="noreferrer"
    //       className={`px-8 py-3.5 rounded-[22px] text-sm font-black text-white border border-white/10 transition-all ${
    //         isDisabled ?
    //           "bg-slate-300 cursor-not-allowed opacity-50 shadow-none"
    //         : `cursor-pointer hover:scale-105 active:scale-95 ${style.actionColor}`
    //       }`}
    //     >
    //       {style.btnText}
    //     </a>
    //   );
    // }

    // 2. LIVE CLASS BUTTON (Updated)
    if (item.liveClassLink) {
      const isDisabled = !!item.recordingLink;

      // If Disabled (Recording exists), show non-clickable button
      if (isDisabled) {
        return (
          <button
            disabled
            className="px-8 py-3.5 rounded-[22px] text-sm font-black text-white border border-white/10 bg-slate-300 cursor-not-allowed opacity-50 shadow-none"
          >
            {style.btnText}
          </button>
        );
      }

      // If Active, Link to Internal Video Page with "LIVE" state
      return (
        <Link
          to={destinationPath}
          state={{ activeContentType: "LIVE" }}
          className={`px-8 py-3.5 rounded-[22px] text-sm font-black text-white border border-white/10 transition-all cursor-pointer hover:scale-105 active:scale-95 ${style.actionColor}`}
        >
          {style.btnText}
        </Link>
      );
    }

    // 3. PROJECT: Redirect to Dedicated Project Page
    if (item.type === "PROJECT") {
      return (
        <Link
          to={projectPath}
          // We don't need 'state' here because the page will fetch data using subtopicId
          className={`px-8 py-3.5 rounded-[22px] text-sm font-black text-white border border-white/10 transition-all ${style.actionColor}`}
        >
          {style.btnText}
        </Link>
      );
    }

    // 4. OTHER (Labs, Assessments): Internal Link to Video Page
    return (
      <Link
        to={destinationPath}
        state={{
          activeContentType: style.targetType,
          sessionId: item._id,
        }}
        className={`px-8 py-3.5 cursor-pointer rounded-[22px] text-sm font-black text-white border border-white/10 transition-all hover:scale-105 active:scale-95 ${style.actionColor}`}
      >
        {style.btnText}
      </Link>
    );
  };

  /*  Cheat sheets logic */
  const cheatSheets =
    item.type === "DOUBT_SESSION" && item.relatedSubtopicIds?.length
      ? ["Friday", "Saturday"]
      : [];

  return (
    <div
      className={`group relative w-full p-6 md:p-8 rounded-[30px] md:rounded-4xl border border-white/40 transition-all duration-300 ${style.clay} ${item.isRecordingCard ? "bg-red-50/30" : ""}`}
    >
      {/* Mobile: Column layout | Desktop: Row layout */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4 md:gap-8 min-w-0 flex-1">
          {/* Scaled Icon for Mobile */}
          <div
            className={`w-14 h-12 md:w-20 md:h-16 rounded-[18px] md:rounded-[25px] ${style.iconBg} text-white flex items-center justify-center text-xl md:text-3xl shrink-0 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.3),inset_4px_4px_8px_rgba(255,255,255,0.2)]`}
          >
            {style.icon}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
              <span
                className={`text-[9px] md:text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-2 whitespace-nowrap ${style.badgeColor}`}
              >
                {!item.isRecordingCard &&
                  item.type === "LIVE_CLASS" &&
                  !item.recordingLink && (
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></span>
                  )}
                {style.badge}
              </span>
              <span className="text-xs md:text-sm text-slate-400 font-bold whitespace-nowrap">
                🕒 {item.duration || "30min"}
              </span>
            </div>
            {/* Scaled Heading for Mobile */}
            <h3 className="text-lg mb-3 md:mb-0 md:text-3xl font-extrabold text-slate-800 leading-tight">
              {item.subtopicName} {item.isRecordingCard && "(Recording)"}
            </h3>
            <p className="text-sm md:text-lg text-slate-500 font-bold mt-1 truncate">
              Topic:{" "}
              <span className="text-slate-400 font-normal">
                {item.topicName}
              </span>
            </p>
          </div>
        </div>

        {/* Button stretches to full width on mobile */}
        <div className="w-full flex justify-end md:w-auto md:self-center">
          {renderActionButton()}
        </div>
      </div>

      {/* CHEAT SHEETS (Mobile Responsive) */}
      {cheatSheets.length > 0 && (
        <div className="mt-6 md:mt-8 space-y-4 md:space-y-6">
          {cheatSheets.map((dayLabel, i) => {
            const csStyle = styles.CHEAT_SHEET;
            const targetId = item.relatedSubtopicIds?.[i] || item.subtopicId;
            const csPath = `/video/${targetId}`;

            return (
              <div
                key={i}
                className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 md:p-6 rounded-[24px] md:rounded-[30px] border border-white/40 transition-all duration-300 ${csStyle.clay}`}
              >
                <div className="flex items-center gap-4 md:gap-6 min-w-0 flex-1">
                  <div
                    className={`w-12 h-10 md:w-16 md:h-14 rounded-[15px] md:rounded-[20px] ${csStyle.iconBg} text-white flex items-center justify-center text-xl md:text-2xl shrink-0 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.3),inset_4px_4px_8px_rgba(255,255,255,0.2)]`}
                  >
                    {csStyle.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span
                      className={`text-[9px] md:text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${csStyle.badgeColor}`}
                    >
                      {dayLabel} {csStyle.badge}
                    </span>
                    <h4 className="text-lg md:text-xl font-extrabold text-slate-800 leading-snug mt-1">
                      {item.topicName} Reference
                    </h4>
                  </div>
                </div>
                <Link
                  to={csPath}
                  state={{ activeContentType: "PDF" }}
                  className={`w-full sm:w-auto text-center px-6 py-3 cursor-pointer rounded-[18px] text-xs font-black text-white border border-white/10 transition-all hover:scale-105 active:scale-95 ${csStyle.actionColor}`}
                >
                  {csStyle.btnText}
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LeftPanel;

// console.log(hi)
