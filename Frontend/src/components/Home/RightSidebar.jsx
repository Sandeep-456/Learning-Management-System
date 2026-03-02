import React from "react";
import { FaUserGraduate, FaTrophy } from "react-icons/fa";
import { TABS } from "../../data/homePageTabs";
import { progressData } from "../../data/homePageProgressData";
import { useAuth } from "../../context/AuthContext";

const RightSidebar = ({ tab, setTab }) => {
  const { userProfile } = useAuth();
  const p = progressData[tab];
  const streakPercent = Math.min(100, (p.streak / p.to) * 100);
  const getPercentColor = (value) => {
    if (value < 30) return "#6235bd"; // Red
    if (value < 70) return "#2e106b"; // Yellow/Orange
    return "#10506b"; // Green
  };

  const percentColor = getPercentColor(p.value);

  const getInitials = (firstName = "", lastName = "") => {
    const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : "";
    const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : "";
    return `${firstInitial}${lastInitial}`;
  };

  return (
    <aside className="space-y-4">
      {/* PROFILE CARD */}
      <div className="p-5 bg-gradient-to-br from-indigo-50 to-blue-50 border border-blue-600 shadow rounded-2xl">
        {userProfile ? (
          <>
            <div className="flex gap-3 items-center mb-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-600 to-blue-600 text-white flex items-center justify-center font-semibold">
                {getInitials(userProfile.firstName, userProfile.lastName)}
              </div>
              <div>
                <p className="font-semibold text-slate-800">
                  {userProfile.firstName} {userProfile.lastName}
                </p>
                <p className="text-sm text-slate-500">
                  {userProfile.course} - Batch {userProfile.batch}
                </p>
              </div>
            </div>
            <div className="text-medium text-slate-600 space-y-1">
              <p>
                <b>Joined : </b> {userProfile.joiningDate}
              </p>
              <p>
                <b>Course : </b> {userProfile.course}
              </p>
            </div>
          </>
        ) : (
          // Skeleton loader
          <div className="animate-pulse">
            <div className="flex gap-3 items-center mb-4">
              <div className="w-14 h-14 rounded-full bg-slate-300"></div>
              <div>
                <div className="h-4 bg-slate-300 rounded w-32 mb-2"></div>
                <div className="h-3 bg-slate-300 rounded w-48"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-slate-300 rounded w-40"></div>
              <div className="h-3 bg-slate-300 rounded w-36"></div>
            </div>
          </div>
        )}
      </div>

      {/* GOALS CARD */}
      <div className="bg-white border border-blue-200 rounded-2xl shadow p-2">
        <div className="flex gap-1 bg-blue-50 rounded-xl p-1">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={
                "flex-1 py-2 rounded-lg text-sm font-medium transition " +
                (tab === t.key
                  ? "bg-white text-blue-700 shadow border"
                  : "text-blue-700/60 hover:bg-white/50")
              }
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="p-4">
          <div className="flex justify-between items-center text-sm">
            <p className="font-semibold text-slate-800">{tab} Goal</p>
            <span className="text-blue-900">{p.left}</span>
          </div>

          {/* Circular Progress */}
          {/* Vertical Fill Card (percentage = height of purple fill) */}
          <div className="my-6 flex justify-center">
            <div className="relative w-[70px] h-20 rounded-2xl overflow-hidden border border-blue-300 shadow bg-white">
              {/* PURPLE FILL */}
              <div
                className="absolute bottom-0 left-0 w-full bg-blue-600 transition-all duration-700 ease-out "
                style={{ height: `${p.value}%` }}
              ></div>

              {/* CENTERED TEXT WITH DYNAMIC COLOR */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="text-xl font-bold"
                  style={{ color: percentColor }}
                >
                  {p.value}%
                </span>
              </div>
            </div>
          </div>

          {/* Streak */}
          <div className="bg-white border border-blue-200 rounded-xl p-4">
            <p className="font-semibold text-slate-800 mb-2">Streak Goal</p>

            <div className="w-full h-2 bg-blue-100 rounded-full relative">
              <div
                className="absolute top-0 left-0 h-full bg-blue-600 rounded-full"
                style={{ width: `${streakPercent}%` }}
              />
            </div>

            <div className="flex justify-between mt-2 text-xs text-blue-700 font-medium">
              <span className="px-2 py-0.5 rounded bg-blue-100">{p.from}</span>
              <span className="px-2 py-0.5 rounded bg-blue-100">{p.to}</span>
            </div>
          </div>

          <button className="w-full mt-5 py-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 text-sm font-medium">
            Earn {tab} Reward 🪙 +50
          </button>
        </div>
      </div>

      {/* QUICK STATS */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-indigo-50 border border-violet-500 rounded-2xl p-4 shadow text-center">
          <div className="text-indigo-600 text-lg">
            <FaUserGraduate />
          </div>
          <div className="font-semibold text-lg">95%</div>
          <p className="text-sm text-slate-600">Attendance</p>
        </div>

        <div className="bg-purple-50 border border-violet-500 rounded-2xl p-4 shadow text-center">
          <div className="text-purple-600 text-lg">
            <FaTrophy />
          </div>
          <div className="font-semibold text-lg">3</div>
          <p className="text-sm text-slate-600">Certificates</p>
        </div>
        <div className="col-span-2 flex justify-center mt-4">
          <h2 className="h2-belive">
            Believe
            <span className="span-belive">Believe</span>
            <span className="span-belive">Believe</span>
            <span className="span-belive">in yourself</span>
          </h2>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
