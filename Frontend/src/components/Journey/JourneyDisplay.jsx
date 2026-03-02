import React from "react";
import { motion } from "framer-motion";
import Skeleton from "../ui/Skeleton";
import {
  FaBrain,
  FaClock,
  FaCheckCircle,
  FaChevronRight,
} from "react-icons/fa";

const JourneyDisplay = ({
  loading,
  stages,
  setSelectedTopic,
  setShowPopup,
}) => {
  const [activeTopicId, setActiveTopicId] = React.useState(null);

  return (
    <div className="relative md:pl-14">
      {/* BUBBLY TIMELINE TRACK */}
      <div
        className="hidden md:block absolute top-8 left-4 md:left-6 w-[8px] h-full rounded-full bg-[#dce2ff] 
                   shadow-[inset_4px_4px_8px_rgba(60,60,60,0.1),inset_-4px_-4px_8px_white,4px_4px_12px_rgba(174,190,230,0.3)]"
      />

      <div className="space-y-10 md:space-y-20">
        {stages?.map((stage, i) => (
          <motion.div
            key={stage._id || i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative flex flex-col gap-6"
          >
            {/* STRONG CLAY STAGE DOT */}
            <div
              className="hidden md:flex absolute -left-8 md:-left-[2.75rem] top-8 w-9 h-9 rounded-full bg-white 
                            shadow-[8px_8px_16px_rgba(174,190,230,0.6),inset_4px_4px_6px_white,inset_-4px_-4px_6px_rgba(174,190,230,0.4)] 
                            items-center justify-center border-2 border-white z-10"
            >
              <div className="w-3.5 h-3.5 rounded-full bg-indigo-600 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.3)]" />
            </div>

            {/* TITANIUM MAIN CARD */}
            <div
              className="p-4 md:p-6 lg:p-10 rounded-[30px] bg-[#E8EDFB] border-4 border-white 
                            shadow-[25px_25px_50px_rgba(174,190,230,0.5),-15px_-15px_30px_white,inset_12px_12px_20px_white,inset_-12px_-12px_20px_rgba(174,190,230,0.2)]"
            >
              {/* STAGE HEADER */}
              <div className="flex items-center gap-4 md:gap-8 mb-12">
                <div
                  className="w-14 h-14 md:w-18 md:h-18 rounded-[23px] bg-white flex items-center justify-center text-[#4F46E5] flex-shrink-0
  shadow-[
    24px_24px_48px_rgba(0,0,0,0.1), 
    inset_12px_8px_16px_rgba(255,255,255,1), 
    inset_-12px_-8px_16px_rgba(0,0,0,0.06)
  ]"
                >
                  <FaBrain className="text-3xl md:text-4xl drop-shadow-lg" />
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-[#1A1C4B] tracking-tight">
                    {stage.name}
                  </h3>
                  <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-slate-500 mt-2 opacity-60">
                    Phase {i + 1} • Advanced Core
                  </p>
                </div>
              </div>

              {/* ICE WHITE SUBTOPIC GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {stage.topics?.map((topic, idx) => {
                  const isActive = activeTopicId === topic._id;
                  const isCompleted = topic.status === "Completed";

                  return (
                    <motion.div
                      key={topic._id || idx}
                      onClick={() => {
                        if (!isCompleted) {
                          setSelectedTopic(topic);
                          setShowPopup(true);
                          setActiveTopicId(topic._id);
                        }
                      }}
                      whileHover={!isCompleted ? { scale: 1.02, y: -4 } : {}}
                      whileTap={{ scale: 0.98 }}
                      className={`
          flex items-center justify-between p-4 md:p-6 rounded-[25px] transition-all duration-300
          ${isCompleted ? "opacity-40 grayscale cursor-not-allowed" : "cursor-pointer"}
          ${
            isActive ?
              "bg-[#4F46E5] text-white border-2 border-white/40 shadow-[0_10px_30px_rgba(94,92,230,0.5),inset_10px_8px_16px_rgba(255,255,255,0.3),inset_-10px_-8px_16px_rgba(0,0,0,0.2)]"
            : "bg-[#1A1C4B] text-white border-2 border-[#1A1C4B] shadow-[4px_4px_20px_rgba(0,0,0,0.3),inset_12px_8px_16px_rgba(255,255,255,0.15),inset_-12px_-8px_16px_rgba(0,0,0,0.4)]"
          }
        `}
                    >
                      <div className="flex items-center gap-4 md:gap-5">
                        <div
                          className={`w-8 h-8 md:w-10 md:h-10 rounded-2xl flex items-center justify-center flex-shrink-0
            ${isActive ? "bg-white shadow-[inset_2px_2px_4px_rgba(0,0,0,0.2)]" : "bg-white shadow-[inset_2px_2px_4px_rgba(0,0,0,0.05)]"}`}
                        >
                          <FaClock
                            className={
                              `text-lg md:text-xl ` +
                              (isActive ? "text-sky-600" : "text-sky-600")
                            }
                          />
                        </div>
                        <span className="text-base md:text-lg font-black tracking-tight">
                          {topic.name}
                        </span>
                      </div>

                      {isCompleted ?
                        <FaCheckCircle className="text-xl md:text-2xl text-green-500 drop-shadow-sm" />
                      : <div
                          className={`p-1.5 md:p-2 rounded-full ${isActive ? "bg-white/10" : "bg-sky-200/50"}`}
                        >
                          <FaChevronRight
                            className={
                              `text-xs ` +
                              (isActive ? "text-white" : "text-white")
                            }
                          />
                        </div>
                      }
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default JourneyDisplay;
