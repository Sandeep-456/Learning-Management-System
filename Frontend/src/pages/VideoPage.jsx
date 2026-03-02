import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useCourse } from "../context/CourseContext";
import VideoPlayer from "../components/Video/VideoPlayer";
import CheatSheetDisplay from "../components/Video/CheatSheetDisplay";
import VideoMCQTestDisplay from "../components/Video/VideoMCQTestDisplay";
import VideoSidebar from "../components/Video/VideoSidebar";
// import AskDoubtSection from "../components/Video/AskDoubtSection";
import LiveClassLobby from "../components/Video/LiveClassLobby";
import CodingAssignments from "../components/LabCodingQuestions/CodingAssignments";
import { FaListUl, FaTimes } from "react-icons/fa"; // Using List icon instead of Hamburger

export default function Video() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { courseHierarchy, loading } = useCourse();

  const [activeContent, setActiveContent] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // ----------------------------------------------------------------------
  // AUTO-NAVIGATE EFFECT
  // ----------------------------------------------------------------------
  useEffect(() => {
    if (!loading && courseHierarchy && id) {
      let foundSubtopic = null;
      courseHierarchy.stages.forEach((stage) => {
        stage.topics.forEach((topic) => {
          const sub = topic.subtopics.find((s) => s._id === id);
          if (sub) foundSubtopic = sub;
        });
      });

      if (foundSubtopic) {
        const requestedType = location.state?.activeContentType;
        if (requestedType) {
          let data = null;
          if (requestedType === "LAB") data = foundSubtopic.sessions.lab;
          if (requestedType === "MCQ") data = foundSubtopic.sessions.assessment;
          if (requestedType === "RECORDING")
            data = foundSubtopic.sessions.recording;
          if (requestedType === "LIVE") data = foundSubtopic.sessions.live;
          if (requestedType === "PDF")
            data = { cheatSheetUrl: foundSubtopic.cheatSheetUrl };

          if (data) {
            setActiveContent({
              type: requestedType,
              data: {
                ...data,
                subtopicId: foundSubtopic._id,
                title: foundSubtopic.name,
              },
            });
          }
        } else if (!activeContent) {
          if (foundSubtopic.sessions?.recording) {
            setActiveContent({
              type: "RECORDING",
              data: {
                ...foundSubtopic.sessions.recording,
                subtopicId: foundSubtopic._id,
                title: foundSubtopic.name,
              },
            });
          }
        }
      }
    }
  }, [id, courseHierarchy, loading, location.state]);

  // ----------------------------------------------------------------------
  // HANDLERS
  // ----------------------------------------------------------------------

  const handleContentSelection = (type, data) => {
    setIsSidebarOpen(false); // Close mobile drawer

    // 3. KEY FIX: Navigate to the new URL instead of setting state directly.
    // Replace '/video/' with your actual route path (e.g., /course/video/ or just relative path)
    // We pass the 'type' in state so the useEffect knows to open LAB/MCQ/etc instead of default recording.

    if (data.subtopicId !== id) {
      // If changing subtopic, change URL
      navigate(`/video/${data.subtopicId}`, {
        state: { activeContentType: type },
      });
    } else {
      // If same subtopic but changing type (e.g. Recording -> Lab), just replace state
      // This prevents a full URL reload but triggers the useEffect via location.state
      navigate(`/video/${data.subtopicId}`, {
        state: { activeContentType: type },
        replace: true,
      });
    }
  };

  const demoVideoUrl =
    "https://drive.google.com/file/d/1Z9QPFf382nAI0ISbNMDxMWiNiz82esc6/preview";

  // 1. Remove the 'demoVideoUrl' variable completely.

  const renderCenterContent = () => {
    // if (!activeContent) return <VideoPlayer videoUrl={demoVideoUrl} />;

    // 2. NEW EMPTY STATE
    if (!activeContent) {
      return (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6">
          {/* Decorative Inset Circle */}
          <div
            className="w-32 h-32 rounded-full flex items-center justify-center transition-all"
            style={{
              backgroundColor: "#F0F4F8",
              boxShadow:
                "inset 8px 8px 16px #cedbe7, inset -8px -8px 16px #ffffff",
            }}
          >
            <FaListUl className="text-5xl text-slate-300" />
          </div>

          <div>
            <h2 className="text-3xl font-black text-slate-700 tracking-tight">
              Content Not Selected
            </h2>
            <p className="text-slate-400 font-medium mt-2 max-w-xs mx-auto">
              Please select a topic or session from the{" "}
              <strong>Course Content</strong> sidebar to begin.
            </p>
          </div>
        </div>
      );
    }

    const { type, data } = activeContent;

    switch (type) {
      case "RECORDING":
        return <VideoPlayer videoUrl={data.recordingUrl} title={data.title} />;
      case "LIVE":
        return <LiveClassLobby session={data} />;
      case "PDF":
        return (
          <CheatSheetDisplay url={data.cheatSheetUrl} subtopicId={data._id} />
        );
      case "MCQ":
        return <VideoMCQTestDisplay session={data} />;
      case "LAB":
        return <CodingAssignments session={data} />;
      default:
        return <div>Content Not Found</div>;
    }
  };

  if (loading)
    return <div className="p-10 text-center">Loading Course Content...</div>;
  if (!courseHierarchy)
    return <div className="p-10 text-center">No Course Data Found</div>;

  return (
    <div className="flex flex-col  lg:flex-row  w-full h-[90vh]  lg:pl-6 lg:pt-4  overflow-hidden relative">
      {/* =========================================================
          DESKTOP SIDEBAR (Hidden on Mobile, Visible on LG)
          - Keeps original layout, no extra wrappers affecting size.
      ========================================================= */}
      <div className="hidden lg:block relative z-10 h-full">
        <VideoSidebar
          stages={courseHierarchy.stages}
          activeContent={activeContent}
          handleContentSelection={handleContentSelection}
        />
      </div>

      {/* =========================================================
          MOBILE SIDEBAR DRAWER (Visible Only When Open)
          - Slides in from left
          - Uses Backdrop
      ========================================================= */}
      {isSidebarOpen && (
        <div className="fixed h-full inset-0 z-50 lg:hidden flex">
          {/* Backdrop (Click to close) */}
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
            onClick={() => setIsSidebarOpen(false)}
          ></div>

          {/* Sidebar Content (Maintains w-80 width) */}
          <div className="relative w-80 my-auto rounded-r-[30px] lg:rounded-[40px] bg-[#F0F4F8] shadow-2xl animate-slideInLeft overflow-y-auto">
            {/* Close Button for Mobile */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="absolute top-4 right-4 z-50 p-1 bg-white rounded-full shadow-md text-slate-500"
            >
              <FaTimes size={12} />
            </button>

            {/* Render the Sidebar Component Inside */}
            <VideoSidebar
              stages={courseHierarchy.stages}
              activeContent={activeContent}
              handleContentSelection={handleContentSelection}
            />
          </div>
        </div>
      )}

      {/* =========================================================
          RIGHT CONTENT AREA
      ========================================================= */}
      <div className="flex-1 flex flex-col  overflow-hidden relative w-full">
        {/* --- MOBILE TOP BAR (TRIGGER) --- */}
        <div className="lg:hidden p-4 mt-3 flex items-center justify-between">
          {/* Clay Button: "Course Content" */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-slate-600 active:scale-95 transition-transform"
            style={{
              backgroundColor: "#F0F4F8",
              boxShadow: "6px 6px 12px #cedbe7, -6px -6px 12px #ffffff",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.5)",
            }}
          >
            <FaListUl className="text-indigo-500" />
            <span>Course Content</span>
          </button>
        </div>

        {/* --- SCROLLABLE CONTENT --- */}
        <div className="flex-1 p-4 pt-0 lg:p-10  overflow-y-auto bg-transparent [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          <div className="max-w-5xl mx-auto space-y-8 pb-20 ">
            {renderCenterContent()}

            {/* Ask Doubt Section (Optional) */}
            {/* {activeContent && <AskDoubtSection doubt={doubt} setDoubt={setDoubt} />} */}
          </div>
        </div>
      </div>
    </div>
  );
}
