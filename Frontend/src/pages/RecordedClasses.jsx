import React, { useState } from "react";
import { FaChevronLeft, FaPlayCircle } from "react-icons/fa";

export default function RecordedClasses() {
  // --- STATIC COURSE DATA ---
  const course = {
    title: "MERN Stack Development",
    instructor: "Rahul Sharma",
    lastUpdated: "March 2025",
    progress: "35%",
    modules: [
      {
        id: "html",
        title: "HTML & Web Foundations",
        lessons: [
          {
            title: "HTML Basics & Boilerplate",
            duration: "32 min",
            date: "2025-01-05",
            url: "/videos/html-1.mp4",
          },
          {
            title: "Forms, Inputs & Semantic Tags",
            duration: "41 min",
            date: "2025-01-07",
            url: "/videos/html-2.mp4",
          },
        ],
      },
      {
        id: "css",
        title: "CSS & Responsive Design",
        lessons: [
          {
            title: "CSS Fundamentals",
            duration: "38 min",
            date: "2025-01-10",
            url: "/videos/css-1.mp4",
          },
          {
            title: "Flexbox & Media Queries",
            duration: "46 min",
            date: "2025-01-11",
            url: "/videos/css-2.mp4",
          },
        ],
      },
      {
        id: "react",
        title: "React.js Core Concepts",
        lessons: [
          {
            title: "Components, Props & JSX",
            duration: "52 min",
            date: "2025-01-20",
            url: "/videos/react-1.mp4",
          },
          {
            title: "State, Hooks & Lifecycle",
            duration: "58 min",
            date: "2025-01-23",
            url: "/videos/react-2.mp4",
          },
        ],
      },
    ],
  };

  // --- STATE ---
  const [activeModule, setActiveModule] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50 flex gap-6 px-6 py-10">
      {/* LEFT SIDEBAR */}
      <aside
        className="
          w-[340px] 
          bg-blue-900 
          text-white 
          rounded-2xl 
          p-6 
          sticky 
          top-[90px] 
          h-[calc(100vh-90px)] 
          overflow-y-auto
          shadow-xl
        "
      >
        {/* COURSE INFO */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold">{course.title}</h2>
          <p className="text-white/80 text-sm mt-1">
            Instructor: {course.instructor}
          </p>
          <p className="text-white/60 text-xs mt-1">
            Last updated: {course.lastUpdated}
          </p>

          {/* Progress */}
          <div className="mt-4">
            <p className="text-sm font-semibold mb-1">Course Progress</p>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full"
                style={{ width: course.progress }}
              />
            </div>
            <p className="text-xs mt-1">{course.progress} completed</p>
          </div>
        </div>

        {/* MODULES */}
        {!activeModule && (
          <div>
            <h3 className="font-semibold mb-3 text-lg">Course Modules</h3>
            <div className="space-y-3">
              {course.modules.map((mod) => (
                <button
                  key={mod.id}
                  onClick={() => setActiveModule(mod)}
                  className="
                    w-full 
                    text-left 
                    p-4 
                    rounded-xl 
                    bg-white/10 
                    hover:bg-white/20 
                    transition
                  "
                >
                  <p className="font-semibold">{mod.title}</p>
                  <p className="text-xs text-white/70 mt-1">
                    {mod.lessons.length} Lessons
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* LESSONS */}
        {activeModule && (
          <div>
            <button
              onClick={() => setActiveModule(null)}
              className="flex items-center gap-2 text-sm mb-4 hover:underline"
            >
              <FaChevronLeft /> Back to Modules
            </button>

            <h3 className="font-semibold text-lg mb-3">{activeModule.title}</h3>

            <div className="space-y-3">
              {activeModule.lessons.map((lesson, i) => (
                <button
                  key={i}
                  onClick={() => setActiveVideo(lesson)}
                  className="
                    w-full 
                    p-3 
                    rounded-xl 
                    bg-white/10 
                    hover:bg-white/20 
                    transition 
                    text-left
                  "
                >
                  <p className="font-semibold text-sm flex items-center gap-2">
                    <FaPlayCircle /> {lesson.title}
                  </p>
                  <p className="text-xs text-white/70 mt-1">
                    {lesson.duration} • {lesson.date}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* RIGHT CONTENT */}
      <main className="flex-1 bg-white rounded-2xl shadow-lg p-6">
        {/* HEADER */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-blue-900">Recorded Classes</h1>
          <p className="text-slate-600 text-sm mt-1">
            Learn at your own pace. Rewatch lessons anytime.
          </p>
        </div>

        {/* VIDEO PLAYER */}
        {activeVideo ?
          <div>
            <video
              src={activeVideo.url}
              controls
              className="w-full h-[460px] rounded-xl bg-black shadow"
            />

            {/* VIDEO META */}
            <div className="mt-4">
              <h2 className="text-xl font-semibold text-slate-800">
                {activeVideo.title}
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Duration: {activeVideo.duration} • Recorded on{" "}
                {activeVideo.date}
              </p>
            </div>
          </div>
        : <div
            className="
              h-[460px] 
              flex 
              flex-col 
              items-center 
              justify-center 
              border-2 
              border-dashed 
              rounded-xl 
              text-slate-500 
              bg-slate-50
            "
          >
            <FaPlayCircle className="text-5xl mb-3 text-blue-600" />
            <p className="font-semibold">Select a lesson to start learning</p>
            <p className="text-sm mt-1">
              Choose a module and lesson from the left panel
            </p>
          </div>
        }
      </main>
    </div>
  );
}
