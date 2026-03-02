import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiBell, FiMenu, FiX, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
  HiLightBulb,
  HiUser,
  HiClipboardList,
  HiBriefcase,
} from "react-icons/hi";
import { BiSolidLock } from "react-icons/bi";
import { MdOutlineMemory } from "react-icons/md";
import { FaRoute } from "react-icons/fa";
import { ImHome } from "react-icons/im";
import { useAuth } from "../../context/AuthContext";

export default function Topbar() {
  const { userProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [classesOpen, setClassesOpen] = useState(false);

  const sidebarLocks = {
    "/": false,
    "/my-tech": false,
    "/journey": false,
    "/tasks": true,
    "/placement-prep": true,
    "/jobs": true,
  };

  const navItems = [
    { to: "/", label: "Home", icon: <ImHome /> },
    { to: "/my-tech", label: "Tech", icon: <MdOutlineMemory /> },
    { to: "/journey", label: "Journey", icon: <FaRoute /> },
    { to: "/tasks", label: "Tasks", icon: <HiClipboardList /> },
    { to: "/placement-prep", label: "Prep", icon: <HiLightBulb /> },
    { to: "/jobs", label: "Jobs", icon: <HiBriefcase /> },
  ];

  const getInitials = (username) =>
    username ? username.charAt(0).toUpperCase() : "";

  return (
    <motion.header className="h-[10vh] w-full flex items-center justify-between px-4 md:px-10 bg-[#F0F4FF] border-b-[3px] border-white shadow-[0_15px_30px_-10px_rgba(26,28,75,0.15)] sticky top-0 z-[500]">
      <div className="flex items-center gap-10">
        <a href="/" className="flex items-center gap-4 group">
          {/* LOGO WITH INCREASED INNER GLOW */}
          <div className="p-2 rounded-2xl bg-white shadow-[inset_-4px_-4px_10px_rgba(0,0,0,0.15),inset_4px_4px_10px_rgba(255,255,255,1),0_12px_20px_rgba(0,0,0,0.05)]">
            <img
              src="https://res.cloudinary.com/dpvrtbqxt/image/upload/v1764072403/samples/Aspire/Logo_f8hqc0.jpg"
              alt="LOGO"
              className="w-10 h-10 rounded-full object-contain"
            />
          </div>
          <h1 className="text-lg md:text-2xl font-black tracking-tighter text-[#1A1C4B]">
            Aspire Next <span className="text-indigo-600">LMS</span>
          </h1>
        </a>
      </div>

      <div className="flex items-center gap-5">
        <div className="hidden md:block">
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-indigo-900 shadow-[8px_8px_16px_#d1d9e6,-8px_-8px_20px_#ffffff,inset_2px_2px_5px_rgba(255,255,255,1)] hover:scale-110 active:scale-90 transition-all group"
            aria-label="Notifications"
          >
            <FiBell
              size={24}
              className="group-hover:rotate-12 transition-transform"
            />
            {/* Static Red Indicator */}
            {/* <span className="absolute top-4 right-4 w-3.5 h-3.5 bg-red-500 rounded-full border-[3px] border-white shadow-[2px_2px_5px_rgba(0,0,0,0.1)]"></span> */}
          </button>
        </div>

        {/* DESKTOP PROFILE PILL - DEEP EXTRUSION */}
        <div className="hidden md:block">
          <div
            onClick={() => navigate("/profile")}
            className="flex items-center gap-4 pl-2 pr-7 py-1 cursor-pointer  rounded-full border-[4px] border-white cursor-pointer shadow-[12px_12px_24px_#d1d9e6,-8px_-8px_24px_#ffffff] hover:translate-y-[-2px] transition-all group"
          >
            <div className="w-10 h-10 rounded-full bg-[#1A1C4B] flex items-center justify-center text-white text-xl font-black shadow-[inset_-5px_-5px_10px_rgba(0,0,0,0.4),inset_5px_5px_10px_rgba(255,255,255,0.3)] group-hover:rotate-6 transition-transform">
              {getInitials(userProfile?.user?.username)}
            </div>
            <p className="font-black text-[#1A1C4B] uppercase tracking-widest text-sm">
              {userProfile?.user?.username}
            </p>
          </div>
        </div>
        {/* 
        <button
          onClick={() => setIsMenuOpen(true)}
          className="md:hidden w-12 h-12 flex items-center justify-center rounded-2xl bg-[#1A1C4B] text-white shadow-[inset_6px_6px_12px_rgba(255,255,255,0.2),inset_-6px_-6px_12px_rgba(0,0,0,0.4),10px_10px_20px_rgba(0,0,0,0.2)] active:scale-90 transition-all"
        >
          <FiMenu size={28} />
        </button> */}
        <div className="flex block md:hidden justify-center items-center w-full">
          <button
            onClick={() => {
              setProfileOpen(!profileOpen);
              setClassesOpen(false); // Close classes if profile is opened
            }}
            className="w-12 h-12 rounded-full bg-[#3B82F6] text-white font-black flex items-center justify-center shadow-lg border-2 border-white/10 hover:scale-110 transition-transform clay-profile"
          >
            {userProfile.user.username.charAt(0).toUpperCase()}
          </button>

          {profileOpen && (
            <div className="z-[500] absolute right-10 top-16 w-44 bg-white p-2 rounded-2xl shadow-2xl border border-slate-100 animate-in fade-in slide-in-from-left-4 duration-200">
              <button
                onClick={() => {
                  navigate("/profile");
                  setProfileOpen(false);
                }}
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-700 w-full text-xs font-bold"
              >
                <HiUser className="text-indigo-600" /> Profile
              </button>
              <button
                onClick={async () => {
                  await logout();
                  navigate("/login");
                  window.location.reload();
                }}
                className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-red-50 text-red-600 w-full text-xs font-bold mt-1"
              >
                <FiLogOut /> Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE DRAWER */}
      {/* <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-[599] bg-[#1A1C4B]/40 backdrop-blur-md md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[340px] z-[600] bg-[#F0F4FF] flex flex-col shadow-[-30px_0_60px_rgba(0,0,0,0.2)] py-3 border-white"
            >
              <div className="flex justify-between border-b-2 border-gray-200 items-center">
                <div
                  onClick={() => {
                    navigate("/profile");
                    setIsMenuOpen(false);
                  }}
                  className="p-4 mb-2 flex items-center gap-4 rounded-3xl hover:bg-slate-50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-[#3B82F6] text-white flex items-center justify-center text-xl font-black shadow-[inset_-6px_-6px_10px_rgba(0,0,0,0.4),inset_6px_6px_10px_rgba(255,255,255,0.3)] border-2 border-white/10">
                    {getInitials(userProfile?.user?.username)}
                  </div>
                  <h2 className="text-sm font-[1000] text-[#1A1C4B] uppercase tracking-tighter">
                    {userProfile?.user?.username}
                  </h2>
                </div>
                <div className="mb-4">
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="self-end w-10 h-10 mr-6 flex items-center justify-center rounded-2xl bg-white text-[#1A1C4B] shadow-[8px_8px_16px_#d1d9e6,-5px_-5px_15px_#ffffff,inset_2px_2px_5px_white] "
                  >
                    <FiX size={24} />
                  </button>
                </div>
              </div>

              <div className=" overflow-hidden flex flex-col p-3">
                <nav className="flex flex-col overflow-y-auto">
                  {navItems.map((item) => {
                    const isLocked = sidebarLocks[item.to];
                    const isActive = location.pathname === item.to; // Check if current route matches

                    return (
                      <div
                        key={item.label}
                        onClick={() =>
                          !isLocked && (navigate(item.to), setIsMenuOpen(false))
                        }
                        className={`flex items-center gap-2 p-3 rounded-[1.8rem] transition-all duration-300 relative ${
                          isLocked ? "opacity-30 grayscale cursor-not-allowed"
                          : isActive ?
                            "border-2 border-gray-200 bg-[#1A1C4B] text-white shadow-[inset_6px_6px_12px_rgba(255,255,255,0.2),inset_-6px_-6px_12px_rgba(0,0,0,0.4),10px_10px_20px_rgba(0,0,0,0.2)] "
                          : "text-slate-500 hover:text-[#1A1C4B] hover:bg-slate-50 cursor-pointer"
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all ${
                            isActive ?
                              "bg-[#4347ca] text-white shadow-[inset_-3px_-3px_6px_rgba(0,0,0,0.4)]"
                            : "bg-[#f3f3f3] text-slate-500 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.05)]"
                          }`}
                        >
                          {item.icon}
                        </div>

                        <span
                          className={`text-sm font-[1000] uppercase tracking-tighter flex-1 ${isActive ? "text-white" : ""}`}
                        >
                          {item.label}
                        </span>

                        {isLocked && (
                          <BiSolidLock className="text-yellow-600 text-sm" />
                        )}

                        {isActive && (
                          <motion.div
                            layoutId="activeIndicator"
                            className="absolute right-4 w-1.5 h-6 bg-[#1A1C4B] rounded-full"
                          />
                        )}
                      </div>
                    );
                  })}
                </nav>
              </div>

              <div className="mt-auto border-t-2 pt-5 border-gray-200 flex justify-center w-full">
                <button
                  onClick={async () => {
                    await logout();
                    navigate("/login");
                  }}
                  className="
    w-[60%] h-[50px] rounded-2xl 
    bg-[#f11919] text-white font-[1000] text-xs uppercase tracking-[0.2em] 
    shadow-[
      15px_15px_30px_#d1d9e6,
      -12px_-12px_30px_#ffffff,
      inset_6px_6px_15px_rgba(255,255,255,0.4),
      inset_-8px_-8px_20px_rgba(0,0,0,0.3)
    ] 
    border-[3px] border-white/20
    active:shadow-[inset_12px_12px_25px_rgba(0,0,0,0.4),inset_-10px_-10px_20px_rgba(255,255,255,0.1)] 
    transition-all duration-300 flex items-center justify-center gap-3
  "
                >
                  <FiLogOut className="text-lg" />
                  Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence> */}
    </motion.header>
  );
}
