export default function JobTrackingTimeline({ hiringProcess, jobUpdates }) {
  const completedTitles = jobUpdates.map((u) => u.title);

  return (
    <div className="relative">
      {hiringProcess.map((step, i) => {
        const isCompleted = completedTitles.includes(step);
        const date = jobUpdates.find((u) => u.title === step)?.date;

        return (
          <div key={i} className="mb-6 relative">
            {/* line */}
            {i !== hiringProcess.length - 1 && (
              <div
                className={`absolute left-[7px] top-[22px] w-0.5 h-full 
                  ${isCompleted ? "bg-indigo-600" : "bg-slate-300"}
                `}
              ></div>
            )}

            {/* dot */}
            <div
              className={`
                absolute top-1 left-0.5 w-3 h-3 rounded-full 
                ${isCompleted ? "bg-indigo-600" : "bg-slate-400"}
              `}
            ></div>

            {/* Title */}
            <p
              className={`
                ml-6 text-sm font-medium 
                ${isCompleted ? "text-slate-800" : "text-slate-500"}
              `}
            >
              {step}
            </p>

            {/* Date only for completed items */}
            {date && <p className="ml-6 text-xs text-slate-500">{date}</p>}
          </div>
        );
      })}
    </div>
  );
}
