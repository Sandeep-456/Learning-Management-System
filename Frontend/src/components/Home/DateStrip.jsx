import React, { useMemo, useRef, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { HiLockClosed } from "react-icons/hi";
import { dateKey } from "./utils";
import {
  add,
  sub,
  eachDayOfInterval,
  isAfter,
  addDays,
  startOfDay,
} from "date-fns";

const useDateStrip = () =>
  useMemo(() => {
    const startDate = new Date("2026-01-01");
    const endDate = new Date("2026-10-01");
    const dateRange = eachDayOfInterval({ start: startDate, end: endDate });

    return dateRange.map((d) => {
      d.setHours(0, 0, 0, 0);
      return {
        label: d.toLocaleDateString("en-US", { weekday: "short" }),
        day: d.getDate(),
        ts: d.getTime(),
      };
    });
  }, []);

const DateStrip = ({ date, setDate }) => {
  const days = useDateStrip(date);
  const today = dateKey(new Date());
  const scrollContainer = useRef(null);

  useEffect(() => {
    if (scrollContainer.current) {
      const selectedDateElement = scrollContainer.current.querySelector(
        `[data-date-key="${dateKey(date)}"]`,
      );
      if (selectedDateElement) {
        selectedDateElement.scrollIntoView({
          behavior: "smooth",
          inline: "center",
        });
      }
    }
  }, [date, days]); // Added 'days' as a dependency because the date range changes based on 'date'

  const scrollLeft = () => {
    scrollContainer.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainer.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <div className="h-200 px-2 py-2 flex flex-col items-center">
      <button
        onClick={scrollLeft}
        className="p-2 rounded-full hover:bg-slate-200"
      >
        <FaChevronLeft />
      </button>
      <div
        ref={scrollContainer}
        className="flex flex-col gap-3 overflow-x-auto hide-scrollbar"
      >
        {days.map((d) => {
          const dObj = new Date(d.ts);
          const isSelected = dateKey(dObj) === dateKey(date);
          const isToday = dateKey(dObj) === today;

          const currentDate = startOfDay(new Date());
          const oneWeekFromNow = addDays(currentDate, 30);
          const isLocked = isAfter(dObj, oneWeekFromNow);

          return (
            <button
              key={d.ts}
              data-date-key={dateKey(dObj)} // Add data attribute for easier selection
              onClick={() => !isLocked && setDate(dObj)}
              disabled={isLocked}
              className={
                "w-[70px] h-[60px] flex-none flex flex-col items-center justify-center rounded-b-4xl rounded-t-4xl border transition-all duration-300 " +
                (isSelected ?
                  "bg-indigo-700 text-white border-indigo-600 shadow-lg"
                : "bg-white text-slate-700 border-slate-200 ") +
                (isLocked ?
                  "opacity-50 cursor-not-allowed"
                : "hover:bg-slate-100")
              }
            >
              {isLocked && <HiLockClosed className="text-slate-400" />}
              <span className="text-xs font-semibold opacity-80">
                {d.label}
              </span>

              <span className="text-xl font-bold leading-none">{d.day}</span>

              {isToday && !isSelected && (
                <span className="mt-1 text-[10px] text-indigo-600 font-semibold">
                  Today
                </span>
              )}
            </button>
          );
        })}
      </div>
      <button
        onClick={scrollRight}
        className="p-2 rounded-full hover:bg-slate-200"
      >
        <FaChevronRight />
      </button>

      <style>{`
        .hide-scrollbar { scrollbar-width: none; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default DateStrip;
