import React, { useRef, useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  format,
  addDays,
  startOfDay,
  eachDayOfInterval,
  isAfter,
  startOfYear,
  endOfYear,
  startOfMonth,
  endOfMonth,
} from "date-fns";
import {
  FaCalendarAlt,
  FaChevronUp,
  FaChevronDown,
  FaLock,
} from "react-icons/fa";

// --- CUSTOM CSS FOR CALENDAR TILES ---
const customCalendarStyles = `
  /* 1. Reset relative positioning for tiles so the lock icon sits inside correctly */
  .react-calendar__tile {
    position: relative;
    overflow: hidden;
    z-index: 1; 
  }

  /* 2. Specific style for locked dates */
  .react-calendar__tile.locked-date {
    background-color: #f1f5f9 !important;
    color: #cbd5e1 !important;
    pointer-events: none !important; /* Disable clicks */
  }
  
  /* 3. Ensure the lock icon sits on top */
  .react-calendar__tile.locked-date svg {
    z-index: 10;
  }
`;

const RightPanel = ({ selectedDate, setSelectedDate }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const calendarRef = useRef(null);
  const scrollRef = useRef(null);
  const triggerRef = useRef(null);

  // --- DATE SETUP ---
  // Using Dynamic Year so it works for "Today"
  const currentYear = new Date().getFullYear();
  const currentDate = startOfDay(new Date());

  // Dynamic Range: 1st of Current Month to Last Day of Current Month
  const startDate = startOfMonth(currentDate); // e.g., Feb 1, 2026
  const endDate = endOfMonth(currentDate);
  const dateRange = eachDayOfInterval({ start: startDate, end: endDate });

  // Logic: Lock anything more than 5 days in the future
  const lockThreshold = addDays(currentDate, 0);

  // Calendar Limits
  const minCalendarDate = startOfYear(new Date());
  const maxCalendarDate = endOfYear(new Date());

  // --- SCROLL HELPER ---
  const scrollBy = (offset) => {
    if (scrollRef.current) {
      const isMobile = window.innerWidth < 768;
      scrollRef.current.scrollBy({
        [isMobile ? "left" : "top"]: offset,
        behavior: "smooth",
      });
    }
  };

  // --- INITIALIZATION & EFFECTS ---
  useEffect(() => {
    if (scrollRef.current) {
      const targetDateStr = format(selectedDate, "yyyy-MM-dd");
      const targetIndex = dateRange.findIndex(
        (d) => format(d, "yyyy-MM-dd") === targetDateStr,
      );

      if (targetIndex !== -1) {
        const isMobile = window.innerWidth < 768;
        const totalItemSize = isMobile ? 68 : 91;
        const targetPos = Math.max(0, (targetIndex - 1) * totalItemSize);

        scrollRef.current.scrollTo({
          [isMobile ? "left" : "top"]: targetPos,
          behavior: "smooth",
        });
      }
    }

    const handleClickOutside = (event) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [selectedDate, dateRange]);

  return (
    <div
      className="
      bg-[#F0F4FF] border-2 md:border-4 border-white h-fit w-full
      rounded-3xl md:rounded-4xl flex flex-col md:items-center 
      py-3 md:py-8 px-4 md:px-0 
      shadow-[10px_10px_20px_#d1d9e6,-10px_-10px_20px_#ffffff,inset_2px_2px_6px_rgba(255,255,255,0.8)]
    "
    >
      {/* --- FIX 1: INJECT CSS HERE --- */}
      <style>{customCalendarStyles}</style>

      <div className="flex flex-row md:flex-col items-center w-full gap-2 md:gap-0">
        {/* Header / Calendar Trigger */}
        <div className="flex items-center gap-x-2 md:gap-x-6 mb-0 md:mb-6 px-2 md:px-4 order-2 md:order-1">
          <div
            ref={triggerRef}
            className="relative z-200 bg-[#1A1C4B] text-white p-2.5 rounded-2xl shadow-[inset_-3px_-3px_6px_rgba(0,0,0,0.3),inset_3px_3px_6px_rgba(255,255,255,0.2)]"
          >
            <button
              onClick={() => setShowCalendar(!showCalendar)}
              className="bg-[#1A1C4B] z-500 text-white p-2.5 rounded-2xl hover:scale-110 transition-transform active:scale-95"
            >
              <FaCalendarAlt size={18} />
            </button>

            {showCalendar && (
              <div
                ref={calendarRef}
                className="absolute right-full top-5 mr-2 p-4 bg-[#F8FAFF] rounded-2xl shadow-[20px_20px_40px_rgba(0,0,0,0.1),inset_4px_4px_12px_white] border-4 border-white animate-in fade-in slide-in-from-right-4 duration-200 z-50"
                style={{ width: "280px" }}
              >
                <Calendar
                  onChange={(date) => {
                    setSelectedDate(date);
                    setShowCalendar(false);
                  }}
                  value={selectedDate}
                  className="clay-calendar-mini"
                  minDate={minCalendarDate}
                  maxDate={maxCalendarDate}
                  // Logic: Disable if date is strictly AFTER the lock threshold
                  tileDisabled={({ date }) =>
                    isAfter(startOfDay(date), lockThreshold)
                  }
                  // Logic: Add class for visuals
                  tileClassName={({ date }) =>
                    isAfter(startOfDay(date), lockThreshold)
                      ? "locked-date"
                      : null
                  }
                  // Logic: Add Icon
                  tileContent={({ date, view }) => {
                    if (
                      view === "month" &&
                      isAfter(startOfDay(date), lockThreshold)
                    ) {
                      return (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/40">
                          <FaLock
                            className="text-slate-400 opacity-60"
                            size={10}
                          />
                        </div>
                      );
                    }
                  }}
                  prevLabel={<FaChevronUp className="-rotate-90" size={14} />}
                  nextLabel={<FaChevronUp className="rotate-90" size={14} />}
                  navigationLabel={null}
                  prev2Label={null}
                  next2Label={null}
                />
              </div>
            )}
          </div>

          <div className="text-left hidden md:block">
            <p className="text-slate-500 font-bold text-[13px] uppercase tracking-tight">
              {format(selectedDate, "dd eee, MMM")}
            </p>
            <p className="text-[#1A1C4B] font-black text-2xl leading-none mt-1">
              {format(selectedDate, "yyyy")}
            </p>
          </div>
        </div>

        {/* Desktop Scroll Up */}
        <button
          onClick={() => scrollBy(-91)}
          className="hidden md:block text-slate-300 mb-4 hover:text-[#1A1C4B] transition-colors order-2"
        >
          <FaChevronUp size={22} />
        </button>

        {/* Date Strip */}
        <div
          ref={scrollRef}
          className="
            flex flex-row md:flex-col items-center 
            gap-3 md:gap-y-4 w-full h-auto md:h-[500px] 
            overflow-x-auto md:overflow-y-auto no-scrollbar scroll-smooth
            order-1 md:order-3 py-1 px-1
          "
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {dateRange.map((date, idx) => {
            const isSelected =
              format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
            const isLocked = isAfter(startOfDay(date), lockThreshold);

            return (
              <div
                key={idx}
                onClick={() => !isLocked && setSelectedDate(date)}
                className={`
                  group flex flex-col items-center justify-center cursor-pointer transition-all duration-300 shrink-0
                  w-14 h-14 md:w-[85%] md:h-[75px] rounded-2xl md:rounded-[30px] border-2 border-white
                  ${isLocked ? "opacity-40 grayscale cursor-not-allowed shadow-none" : "hover:scale-105"}
                  ${
                    isSelected && !isLocked
                      ? "bg-[#1A1C4B] text-white scale-105 shadow-[inset_-4px_-4px_10px_rgba(0,0,0,0.4),inset_4px_4px_10px_rgba(255,255,255,0.2),0_10px_20px_rgba(26,28,75,0.3)]"
                      : "bg-[#F0F4FF] text-[#1A1C4B] shadow-[inset_-3px_-3px_6px_rgba(0,0,0,0.05),inset_3px_3px_6px_rgba(255,255,255,0.8)]"
                  }
                `}
              >
                {isLocked && (
                  <FaLock className="absolute top-1 md:top-2 text-[7px] md:text-[10px] text-slate-400" />
                )}
                <span
                  className={`text-[8px] md:text-[10px] font-bold uppercase mb-0.5 md:mb-1 ${isSelected ? "text-slate-300" : "text-slate-500"}`}
                >
                  {format(date, "eee")}
                </span>
                <span className="text-lg md:text-xl font-black leading-none">
                  {format(date, "d")}
                </span>
              </div>
            );
          })}
        </div>

        {/* Desktop Scroll Down */}
        <button
          onClick={() => scrollBy(91)}
          className="hidden md:block text-slate-300 mt-4 hover:text-[#1A1C4B] transition-colors order-4"
        >
          <FaChevronDown size={22} />
        </button>
      </div>
    </div>
  );
};

export default RightPanel;
