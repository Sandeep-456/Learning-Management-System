import React from "react";
import { NavLink } from "react-router-dom";
import { HiClipboardList, HiBriefcase } from "react-icons/hi";
import { BiSolidLock } from "react-icons/bi";
import { ImHome } from "react-icons/im";
import { FaRoute } from "react-icons/fa";

export default function BottomBar() {
  // Syncing with your Sidebar locking logic
  const sidebarLocks = {
    "/": false,
    "/journey": false,
    "/tasks": true,
    "/jobs": true,
  };

  const navLinks = [
    { to: "/", label: "Home", icon: <ImHome size={22} /> },
    { to: "/journey", label: "Journey", icon: <FaRoute size={22} /> },
    { to: "/tasks", label: "Tasks", icon: <HiClipboardList size={22} /> },
    { to: "/jobs", label: "Jobs", icon: <HiBriefcase size={22} /> },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-150 bg-[#E8EBf9]">
      <nav
        className="bg-[#1A1C4B] h-23 pt-1 rounded-t-4xl flex items-center justify-around px-4 border-t-2 border-white/10
        shadow-[0_-12px_28px_rgba(0,0,0,0.3),inset_0px_10px_20px_rgba(255,255,255,0.05)]"
      >
        {navLinks.map((link) => {
          const isLocked = sidebarLocks[link.to];

          return (
            <NavLink
              key={link.to}
              to={!isLocked ? link.to : "#"}
              onClick={(e) => isLocked && e.preventDefault()}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center transition-all duration-300 relative ${
                  isLocked ? "opacity-30 grayscale" : "active:scale-90"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 relative
                    ${
                      isActive && !isLocked
                        ? "bg-[#4F46E5] text-white shadow-[inset_-3px_-3px_7px_rgba(0,0,0,0.3),inset_3px_3px_7px_rgba(255,255,255,0.2),0_8px_15px_rgba(79,70,229,0.4)]"
                        : "text-white/40"
                    }`}
                  >
                    {link.icon}

                    {/* Synchronized Locking Icon */}
                    {isLocked && (
                      <BiSolidLock className="absolute -top-1 -right-1 text-[18px] text-yellow-600 bg-[#1A1C4B] rounded-full p-0.5 shadow-md" />
                    )}
                  </div>

                  <span
                    className={`text-[9px] font-black uppercase tracking-tighter mt-1 transition-all duration-300 ${
                      isActive && !isLocked ? "text-white" : "text-white/20"
                    }`}
                  >
                    {link.label}
                  </span>

                  {/* Visual Indicator for Active Tab */}
                  {isActive && !isLocked && (
                    <div className="absolute -bottom-1 w-1 h-1 bg-white rounded-full" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
