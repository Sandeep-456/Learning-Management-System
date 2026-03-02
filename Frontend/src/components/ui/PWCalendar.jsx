import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const pad2 = (n) => (n < 10 ? `0${n}` : `${n}`);
const dateKey = (d) =>
  `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;

// Demo schedule (replace with your real schedule later)
const fakeSchedule = {
  "2024-03-01": { total: 4, completed: 4 },
  "2024-03-02": { total: 4, completed: 4 },
  "2024-03-03": { total: 0, completed: 0 }, // locked
  "2024-03-04": { total: 4, completed: 4 },
  "2024-03-05": { total: 4, completed: 1 },
  "2024-03-06": { total: 4, completed: 2 },
  "2024-03-07": { total: 4, completed: 4 },
  "2024-03-08": { total: 4, completed: 2 },
};

export default function PWCalendar({ value, onChange }) {
  const selectedDate = value || new Date();

  return (
    <div className="bg-[#0d0f19] p-3 rounded-2xl shadow-2xl">
      <Calendar
        value={selectedDate}
        onChange={onChange}
        className="rounded-xl bg-[#0d0f19] text-white border-none"
        calendarType="ISO8601"
        next2Label={null}
        prev2Label={null}
        formatShortWeekday={(locale, date) =>
          date.toLocaleDateString("en-US", { weekday: "short" })
        }
        tileClassName={({ date }) => {
          const key = dateKey(date);
          const day = fakeSchedule[key];
          const isSelected =
            selectedDate.toDateString() === date.toDateString();
          const isOtherMonth =
            date.getMonth() !== selectedDate.getMonth();

          return `
            relative m-1 p-1.5 flex flex-col items-center justify-center rounded-lg
            ${isOtherMonth ? "opacity-40 text-gray-500" : "text-white"}
            ${isSelected ? "border-2 border-purple-400 bg-[#1e2232]" : "bg-[#1a1d2b]"}
            ${day ? "" : "opacity-50"}
          `;
        }}
        tileContent={({ date }) => {
          const key = dateKey(date);
          const day = fakeSchedule[key];
          const isSelected =
            selectedDate.toDateString() === date.toDateString();
          const isToday =
            new Date().toDateString() === date.toDateString();

          let total = day?.total || 0;
          let completed = day?.completed || 0;
          let percent = total ? Math.floor((completed / total) * 100) : 0;

          const isCompleted = percent === 100;
          const isInProgress = percent > 0 && percent < 100;

          return (
            <div className="flex flex-col items-center w-full relative">

              {/* TODAY DOT */}
              {!isSelected && isToday && (
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 absolute top-1"></div>
              )}

              {/* CHECKMARK */}
              {isCompleted && (
                <div className="absolute bottom-1 right-1">
                  <svg width="16" height="16">
                    <circle cx="8" cy="8" r="8" fill="#22C55E" />
                    <path
                      d="M4 8l2 2 4-4"
                      stroke="white"
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </div>
              )}

              {/* PROGRESS RING */}
              {isInProgress && (
                <div className="absolute bottom-1 right-1">
                  <svg width="22" height="22" viewBox="0 0 36 36">
                    <path
                      d="M18 2
                         a 16 16 0 1 1 0 32
                         a 16 16 0 1 1 0 -32"
                      fill="none"
                      stroke="#dcfce7"
                      strokeWidth="4"
                    />
                    <path
                      d="M18 2
                         a 16 16 0 1 1 0 32"
                      fill="none"
                      stroke="#22C55E"
                      strokeWidth="4"
                      strokeDasharray={`${percent}, 100`}
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              )}

              {/* PERCENT BADGE */}
              {total > 0 && !isCompleted && (
                <div className="mt-1 px-2 py-[1px] text-[9px] rounded bg-purple-600 text-white font-medium">
                  {percent}%
                </div>
              )}
            </div>
          );
        }}
      />
    </div>
  );
}
