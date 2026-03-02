import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaBrain, FaComments, FaLock } from "react-icons/fa";
import image1 from "../assets/image.png";
import image3 from "../assets/image3.jpg";

const cards = [
  {
    title: "AI & Machine Learning",
    desc: "Learn Neural Networks, Deep Learning, ML Algorithms, and AI model building.",
    icon: <FaBrain className="text-purple-500 text-3xl" />,
    image: image1,
    isLocked: false,
    path: "/journey",
  },
  {
    title: "Aptitude Training",
    desc: "Sharpen logical reasoning, problem-solving, and quantitative analysis.",
    icon: <FaBrain className="text-pink-500 text-3xl" />,
    image:
      "https://media.geeksforgeeks.org/wp-content/uploads/20230301112707/Aptitude-for-placements.png",
    isLocked: true,
    path: "/journey",
  },
  {
    title: "Communications",
    desc: "Improve fluency, grammar, and communication with interactive practice.",
    icon: <FaComments className="text-violet-500 text-3xl" />,
    image: image3,
    isLocked: true,
    path: "/journey",
  },
];

export default function MyTechPage() {
  return (
    <div className="min-h-screen bg-[#E8EBF9] p-6">
      <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-16 max-w-7xl mx-auto">
        {cards.map((card, i) => (
          <Link to={`${card.isLocked ? "#" : card.path}`}>
            <motion.div
              key={i}
              whileHover={!card.isLocked ? { scale: 1.02 } : {}}
              className={`group relative flex flex-col rounded-4xl p-3 border-2 border-white transition-all duration-300
               ${
                 card.isLocked ?
                   "bg-[#E2E8F5] opacity-80 cursor-not-allowed shadow-[10px_10px_20px_rgba(174,190,230,0.3)]"
                 : "bg-[#F0F4FF] cursor-pointer shadow-[24px_24px_48px_rgba(174,190,230,0.5),inset_12px_8px_16px_rgba(255,255,255,1),inset_-12px_-8px_16px_rgba(174,190,230,0.4)]"
               }`}
            >
              {/* LOCKED OVERLAY: Centered Icon */}
              {card.isLocked && (
                <div className="absolute inset-0 z-30 flex items-center justify-center">
                  <div className="w-20 h-20 bg-[#F0F4FF] rounded-3xl flex items-center justify-center shadow-[inset_6px_6px_12px_rgba(0,0,0,0.1),inset_-6px_-6px_12px_rgba(255,255,255,0.8)] border border-white/50">
                    <FaLock className="text-slate-400 text-3xl" />
                  </div>
                </div>
              )}

              {/* IMAGE COMPONENT: Embedded Bubble */}
              <div
                className={`relative w-full h-48 rounded-4xl overflow-hidden border-4 border-white shadow-[inset_4px_4px_8px_rgba(0,0,0,0.1)] mb-6
               ${card.isLocked ? "grayscale blur-[2px] opacity-70" : ""}`}
              >
                <img
                  src={card.image}
                  className="w-full h-full object-cover"
                  alt={card.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1C4B]/20 to-transparent" />
              </div>

              {/* CONTENT AREA */}
              <div
                className={`px-6 pb-10 ${card.isLocked ? "opacity-50" : ""}`}
              >
                {/* VOLUMETRIC ICON BOX */}
                <div className="w-16 h-16 mb-6 rounded-2xl bg-white flex items-center justify-center shadow-[4px_4px_10px_rgba(0,0,0,0.05),inset_2px_2px_4px_white]">
                  {card.icon}
                </div>

                <h3 className="text-2xl font-black text-[#1A1C4B] mb-3 tracking-tight">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-500 font-bold leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
