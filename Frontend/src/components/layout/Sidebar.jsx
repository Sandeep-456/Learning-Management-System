import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  HiHome,
  HiCollection,
  HiLightBulb,
  HiClipboardList,
  HiBriefcase,
  HiUser,
  HiLockClosed,
  HiVideoCamera,
} from "react-icons/hi";
import { BiSolidLock } from "react-icons/bi";
import { ImHome } from "react-icons/im";
import { FiLogOut } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { MdOutlineMemory } from "react-icons/md";
import { FaRoute } from "react-icons/fa";

export default function Sidebar() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [classesOpen, setClassesOpen] = useState(false);
  const navigate = useNavigate();
  const { logout, userProfile } = useAuth();

  // --- DYNAMIC LOCKING LOGIC START ---
  // Default State: All restricted routes are LOCKED
  let sidebarLocks = {
    "/": false,
    "/my-tech": false,
    "/journey": false,
    "/tasks": true,
    "/placement-prep": true,
    "/jobs": true,
    "/classes/live": false,
    "/classes/recorded": false,
  };

  if (userProfile && userProfile.user) {
    const mobile = userProfile.user.mobile;

    // CASE 1: Admin / Super User (Unlock Everything)
    // Replace '9876543210' with the actual mobile number
    if (mobile === "9898989898") {
      sidebarLocks = {
        "/": false,
        "/my-tech": false,
        "/journey": false,
        "/tasks": false,
        "/placement-prep": false,
        "/jobs": false,
        "/classes/live": false,
        "/classes/recorded": false,
      };
    }
    // CASE 2: Placement Student (Unlock Prep & Jobs)
    // Replace '1122334455' with the actual mobile number
    else if (mobile === "1122334455") {
      sidebarLocks = {
        ...sidebarLocks,
        "/placement-prep": false,
        "/jobs": false,
      };
    }
    // CASE 3: Task Master (Unlock Tasks only)
    else if (mobile === "5555555555") {
      sidebarLocks = {
        ...sidebarLocks,
        "/tasks": false,
      };
    }
    // Add more else-if blocks here for other numbers...
  }
  // --- DYNAMIC LOCKING LOGIC END ---

  const topLinks = [
    { to: "/", label: "Home", icon: <ImHome className="text-[26px]" /> },
    {
      to: "/my-tech",
      label: "Tech",
      icon: <MdOutlineMemory className="text-[26px]" />,
    },
    {
      to: "/journey",
      label: "Journey",
      icon: <FaRoute className="text-[26px]" />,
    },
    {
      to: "/tasks",
      label: "Tasks",
      icon: <HiClipboardList className="text-[26px]" />,
    },
    {
      to: "/placement-prep",
      label: "Prep",
      icon: <HiLightBulb className="text-[26px]" />,
    },
    {
      to: "/jobs",
      label: "Jobs",
      icon: <HiBriefcase className="text-[26px]" />,
    },
  ];

  if (!userProfile) {
    return <p>Loading...</p>;
  }

  return (
    <div className="hidden lg:block">
      <div
        className="h-[90vh] w-28 bg-[#1A1C4B] flex flex-col justify-between pb-5 pt-8 
  shadow-[2px_4px_28px_rgba(0,0,0,0.4),_inset_0px_0px_rgba(255,255,255,0.25),_inset_-8px_0px_24px_rgba(255,255,255,0.25)]"
      >
        {" "}
        {/* NAVIGATION SECTION */}
        <nav className="w-full space-y-2 flex flex-col overflow-y-auto items-center">
          {topLinks.map((link) => {
            const isLocked = sidebarLocks[link.to];
            return (
              <NavLink
                key={link.to}
                to={!isLocked ? link.to : "#"}
                className={({ isActive }) =>
                  `flex flex-col items-center group transition-all duration-300 ${
                    isLocked
                      ? "opacity-30 cursor-not-allowed"
                      : "cursor-pointer"
                  }`
                }
                onClick={(e) => isLocked && e.preventDefault()}
              >
                {({ isActive }) => (
                  <>
                    <div
                      className={`p-3 rounded-[22px] flex items-center justify-center text-2xl transition-all duration-500 relative
                    ${isActive ? "bg-[#4F46E5] text-white clay-active" : "bg-[#2D317A] text-white/40 group-hover:text-white clay-inactive"}`}
                    >
                      {link.icon}
                      {isLocked && (
                        <BiSolidLock className="absolute text-[30px] text-yellow-600 bg-[#1A1C4B] rounded-full p-0.5" />
                      )}
                    </div>
                    <span
                      className={`mt-2 text-[12px] font-black uppercase tracking-widest text-center transition-all duration-300 ${isActive ? "text-white" : "text-white/20 group-hover:text-white"}`}
                    >
                      {link.label}
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}

          {/* <hr className="b-4 rounded-full border-white w-[80%] m-3 " /> */}

          {/* MY CLASSES SECTION (Floating Menu logic) */}
          {/* <div className="flex flex-col items-center relative">
          <button
            onClick={() => {
              setClassesOpen(!classesOpen);
              setProfileOpen(false); // Close profile if classes is opened
            }}
            className={`p-3 rounded-[22px] flex items-center justify-center text-2xl transition-all duration-500 relative
              ${classesOpen ? "bg-[#4F46E5] text-white clay-active" : "bg-[#2D317A] text-white/40 hover:text-white clay-inactive"}`}
          >
            <HiVideoCamera className="text-lg" />
            <div className="absolute top-1 right-1 w-2.5 h-2.5 flex">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500 border border-[#1A1C4B]"></span>
            </div>
          </button>
          <span className="mt-2 text-[12px] font-black uppercase tracking-widest text-white/20">
            Classes
          </span>

          {/* Floating Submenu - High Z-Index ensures it stays on top */}
          {/* {classesOpen && (
            <div className="z-[500] absolute left-24 top-0 w-52 bg-white/95 backdrop-blur-xl p-2 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/20 animate-in fade-in slide-in-from-left-4 duration-200">
              {[
                {
                  to: "/classes/live",
                  label: "Live Classes",
                  icon: <HiVideoCamera className="text-indigo-600" />,
                },
                {
                  to: "/classes/recorded",
                  label: "Recorded Classes",
                  icon: <HiCollection className="text-indigo-600" />,
                },
              ].map((sub) => {
                const isLocked = sidebarLocks[sub.to];
                return (
                  <NavLink
                    key={sub.to}
                    to={!isLocked ? sub.to : "#"}
                    onClick={() => setClassesOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 w-full p-3 rounded-xl font-bold text-sm transition-colors mb-1
                      ${
                        isLocked ? "text-gray-400 cursor-not-allowed"
                        : isActive ? "bg-indigo-50 text-indigo-700"
                        : "hover:bg-slate-100 text-slate-800"
                      }`
                    }
                  >
                    {sub.icon}
                    {sub.label}
                    {isLocked && (
                      <HiLockClosed className="ml-auto text-xs text-gray-400" />
                    )}
                  </NavLink>
                );
              })}
            </div>
          )}
        </div> */}
        </nav>
        {/* FOOTER SECTION */}
        <div className="border-t w-full border-white/10 flex justify-center pt-6 items-center gap-8">
          <div className="flex justify-center items-center w-full">
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
              <div className="z-[500] absolute left-20 bottom-0 w-44 bg-white p-2 rounded-2xl shadow-2xl border border-slate-100 animate-in fade-in slide-in-from-left-4 duration-200">
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
      </div>
    </div>
  );
}
