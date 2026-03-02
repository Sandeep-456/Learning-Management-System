import React, { useState, useRef } from "react";
import { format, eachDayOfInterval, startOfDay, addDays } from "date-fns";
import { FaCalendarAlt } from "react-icons/fa";
import Calendar from "react-calendar";

const MobileDateStrip = ({ selectedDate, setSelectedDate }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const startDate = new Date("2026-02-01");
  const endDate = new Date("2026-03-01");
  const dateRange = eachDayOfInterval({ start: startDate, end: endDate });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        {/* Claymorphic Calendar Trigger */}
        <button
          onClick={() => setShowCalendar(!showCalendar)}
          className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#1A1C4B] text-white shadow-[inset_-3px_-3px_6px_rgba(0,0,0,0.3),inset_3px_3px_6px_rgba(255,255,255,0.2)] active:scale-90 transition-all"
        >
          <FaCalendarAlt size={18} />
        </button>

        <div className="text-right">
          <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
            {format(selectedDate, "MMMM yyyy")}
          </span>
        </div>
      </div>

      {/* Horizontal Scroll Strip */}
      <div className="flex overflow-x-auto gap-3 pb-4 no-scrollbar snap-x">
        {dateRange.map((date, idx) => {
          const isSelected =
            format(date, "yyyy-MM-dd") === format(selectedDate, "yyyy-MM-dd");
          return (
            <div
              key={idx}
              onClick={() => setSelectedDate(date)}
              className={`flex-shrink-0 w-16 h-20 flex flex-col items-center justify-center rounded-[1.8rem] border-2 border-white transition-all snap-center
                ${
                  isSelected
                    ? "bg-[#1A1C4B] text-white shadow-[inset_-4px_-4px_10px_rgba(0,0,0,0.4),inset_4px_4px_10px_rgba(255,255,255,0.2)] scale-105"
                    : "bg-white text-[#1A1C4B] shadow-[6px_6px_12px_#d1d9e6,inset_2px_2px_4px_white]"
                }
              `}
            >
              <span
                className={`text-[9px] font-black uppercase ${isSelected ? "text-slate-400" : "text-slate-400"}`}
              >
                {format(date, "eee")}
              </span>
              <span className="text-xl font-black">{format(date, "d")}</span>
            </div>
          );
        })}
      </div>

      {/* Popover Calendar */}
      {showCalendar && (
        <div className="absolute top-20 left-4 right-4 z-500 p-4 bg-white rounded-3xl shadow-2xl border-4 border-white animate-in fade-in zoom-in-95 duration-200">
          <Calendar
            onChange={(d) => {
              setSelectedDate(d);
              setShowCalendar(false);
            }}
            value={selectedDate}
            className="clay-calendar-mobile w-full"
          />
        </div>
      )}
    </div>
  );
};

export default MobileDateStrip;
