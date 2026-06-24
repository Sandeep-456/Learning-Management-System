import React, { useState } from "react";
import { useCourse } from "../context/CourseContext";
import LeftPanel from "../components/Home/LeftPanel";
import RightPanel from "../components/Home/RightPanel";
import { dateKey } from "../components/Home/utils";
import { useAuth } from "../context/AuthContext";
import profile from "../assets/Home/profile.jpg";

// import {
//   HiHome,
//   HiLightningBolt,
//   HiAcademicCap,
//   HiBriefcase,
//   HiDesktopComputer,
//   HiOutlineCog,
// } from "react-icons/hi";

export default function HomePage() {
  const { calendarSchedule, loading } = useCourse();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { logout, userProfile } = useAuth();

  // Simple mapping if schedule isn't formatted yet
  const formattedSchedule = {};
  // ... (Your existing useEffect for formatting data can stay here)

  const itemsForDay = calendarSchedule.filter(
    (item) => dateKey(new Date(item.scheduledDate)) === dateKey(selectedDate),
  );
  // const itemsForDay = formattedSchedule[dateKey(selectedDate)] || [];
  // console.log(itemsForDay);

  if (loading || !userProfile)
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="flex flex-col h-full pt-6 md:pt-0 md:flex-row bg-[#E8EBF9] font-sans">
      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col order-1 md:order-0 p-3 md:p-6 gap-8 overflow-hidden">
        {/* Top Profile Bar - Claymorphism */}
        <header className="hidden md:block">
          <div className="bg-white/80 rounded-[18px] md:rounded-[40px] p-5 flex justify-between items-center clay-card border border-white/40">
            <div className="flex items-center gap-5">
              {/* Clay-style Avatar Container */}
              <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center overflow-hidden border-4 border-white clay-inset">
                <img
                  src={profile}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="font-black text-[#1A1C4B] text-xl tracking-tight">
                  {userProfile?.user?.username}
                </h2>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
                  Active Course: <span className="text-indigo-600">AIML</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <span className="italic text-slate-400 font-medium text-lg mr-4">
                "Believe in yourself"
              </span>
              {/* Claymorphic Rocket Icon */}
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-xl shadow-lg border border-white clay-card">
                🚀
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Card - Claymorphism */}
        <div className="flex flex-col flex-1 bg-white rounded-4xl md:rounded-[50px] overflow-hidden clay-main shadow-2xl border-4 border-white/50">
          <LeftPanel itemsForDay={itemsForDay} />
        </div>
      </main>

      {/* --- CALENDAR STRIP --- */}
      <div className="w-full md:w-60 md:pb-6 px-3 md:px-0 md:pr-6 order-0 md:order-1 ">
        <div className="pb-6">
          <header className="bg-white/80 flex flex-col block md:hidden rounded-3xl *:md:rounded-[40px] p-2 justify-between items-center clay-card border border-white/40">
            <div className="flex items-center w-full gap-5">
              {/* Clay-style Avatar Container */}
              <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center overflow-hidden border-4 border-white clay-inset">
                <img
                  src={profile}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="font-black text-[#1A1C4B] text-xl tracking-tight">
                  {userProfile?.user?.username}
                </h2>
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">
                  Active Course: <span className="text-indigo-600">AIML</span>
                </p>
              </div>
            </div>
            {/* <div className="flex w-full justify-end items-center gap-2">
              <span className="italic text-slate-400 font-medium text-lg mr-4">
                "Believe in yourself"
              </span>
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-xl shadow-lg border border-white clay-card">
                🚀
              </div>
            </div> */}
          </header>
        </div>

        <RightPanel
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </div>
    </div>
  );
}
