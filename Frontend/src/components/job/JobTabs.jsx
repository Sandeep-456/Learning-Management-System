import { motion } from "framer-motion";

export default function JobTabs({ active, setActive }) {
  const tabs = [
    { label: "Open to Apply", key: "open" },
    { label: "Applied", key: "applied" },
    { label: "Hiring Done", key: "done" },
    { label: "All Jobs", key: "all" },
  ];

  return (
    <div
      className="
        flex gap-3 overflow-x-auto pb-3
        border-b border-slate-200
      "
    >
      {tabs.map((t) => {
        const isActive = active === t.key;

        return (
          <motion.button
            key={t.key}
            onClick={() => setActive(t.key)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            className={`
              relative px-5 py-2 rounded-xl text-sm font-semibold whitespace-nowrap
              transition-all duration-300
              ${
                isActive ?
                  `
                    bg-white text-indigo-700
                    border border-white
                  `
                : `
                    text-slate-500
                    hover:text-slate-700
                    hover:bg-slate-50
                  `
              }
            `}
          >
            {t.label}

            {/* Active indicator */}
            {isActive && (
              <motion.span
                layoutId="job-tab-indicator"
                className="
                  absolute -bottom-[6px] left-1/2 -translate-x-1/2
                  w-10 h-1 rounded-full bg-indigo-600
                "
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
