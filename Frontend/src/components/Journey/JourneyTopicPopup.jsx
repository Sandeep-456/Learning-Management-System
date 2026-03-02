import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import CourseDropdown from "./CourseDropdown";

const JourneyTopicPopup = ({ showPopup, setShowPopup, selectedTopic }) => {
  return (
    <AnimatePresence>
      {showPopup && selectedTopic && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 md:z-[300] bg-sky-900/20 backdrop-blur-sm"
          onClick={() => setShowPopup(false)}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="
              absolute inset-x-auto top-0 w-[75%] top-22 bottom-26 md:bottom-4 right-0
              md:w-full md:max-w-[500px] md:z-[300]
              bg-[#E0F2FE] rounded-[30px] md:rounded-[45px]
              shadow-[-20px_0_50px_rgba(0,0,0,0.1),inset_8px_8px_15px_#fff,inset_-8px_-8px_15px_#bae6fd]
              overflow-hidden flex flex-col
              border-[8px] border-white/60
            "
          >
            {/* STICKY HEADER */}
            <div className="p-4 pb-2 md:p-8 md:pb-4 flex justify-between items-center">
              <div>
                <h2 className="text-xl md:text-2xl font-black text-sky-900 tracking-tight">
                  {selectedTopic.name}
                </h2>
                <span className="inline-block px-3 py-1 mt-1 bg-white/50 rounded-full text-[10px] font-bold text-sky-500 uppercase tracking-widest shadow-[inset_1px_1px_2px_rgba(0,0,0,0.05)]">
                  Topic Catalog
                </span>
              </div>

              <button
                onClick={() => setShowPopup(false)}
                className="
                  w-9 h-9 md:w-11 md:h-11 rounded-2xl
                  flex items-center justify-center
                  text-sky-900 bg-white
                  shadow-[4px_4px_10px_#bae6fd,inset_2px_2px_4px_#fff]
                  hover:scale-95 transition-transform
                "
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-6 md:px-6 md:pb-10 custom-scrollbar scrollbar-hide">
              {/* DESCRIPTION BUBBLE */}
              <div className="mb-8 p-6 rounded-[35px] bg-sky-50 shadow-[inset_6px_6px_12px_#d1edff,inset_-6px_-6px_12px_#ffffff]">
                <p className="text-xs md:text-sm font-medium leading-relaxed">
                  Tailored learning modules and recorded sessions designed
                  specifically for your growth path.
                </p>
              </div>

              {/* BUBBLE LIST CONTAINER */}
              <div className="space-y-4">
                <h3 className="text-[11px] font-black uppercase tracking-widest text-sky-400 ml-4 mb-2">
                  Learning Path
                </h3>

                <div className="flex flex-col gap-3">
                  {selectedTopic.subtopics?.length > 0 ? (
                    selectedTopic.subtopics.map((subtopic, i) => (
                      <motion.div
                        key={`sub-${i}`}
                        whileHover={{ y: -2 }}
                        className="bg-white rounded-[30px] shadow-[10px_10px_20px_#cae8fa,inset_2px_2px_5px_#fff]"
                      >
                        <CourseDropdown subtopic={subtopic} />
                      </motion.div>
                    ))
                  ) : (
                    <div className="p-10 text-center rounded-[40px] bg-white/30 border-4 border-dashed border-white/50 text-sky-300 font-bold text-sm md:text-base">
                      No modules yet.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default JourneyTopicPopup;
