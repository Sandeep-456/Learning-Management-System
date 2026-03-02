import React, { useState, useEffect } from "react";
import AssignmentSidebar from "../components/AsssignmentsPage/AssignmentSidebar";
import AssignmentMCQTestDisplay from "../components/AsssignmentsPage/AssignmentMCQTestDisplay";
import { useCourse } from "../context/CourseContext";
import useMediaQuery from "../hooks/useMediaQuery";
import { FaArrowLeft } from "react-icons/fa"; // Import for the back button

export default function AssignmentsPage() {
  const [activeSubtopicId, setActiveSubtopicId] = useState(null);
  const { loading: courseLoading, courseHierarchy } = useCourse();
  const isMobile = useMediaQuery("(max-width: 1023px)"); // Tailwind's 'lg' breakpoint is 1024px
  const [showSidebarMobile, setShowSidebarMobile] = useState(true); // Control sidebar visibility on mobile

  // Effect to reset mobile view state if screen size changes from mobile to desktop
  useEffect(() => {
    if (!isMobile && !showSidebarMobile) {
      setShowSidebarMobile(true);
    }
  }, [isMobile, showSidebarMobile]);

  const handleSubtopicSelect = (subtopicId) => {
    setActiveSubtopicId(subtopicId);
    if (isMobile) {
      setShowSidebarMobile(false); // Hide sidebar on mobile after selecting a subtopic
    }
  };

  const handleBackToTopics = () => {
    setShowSidebarMobile(true); // Show sidebar on mobile
    setActiveSubtopicId(null); // Clear active subtopic
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {isMobile ? (
        // Mobile View
        <>
          {showSidebarMobile ? (
            <div className="flex-1">
              <AssignmentSidebar
                onSubtopicSelect={handleSubtopicSelect}
                activeSubtopicId={activeSubtopicId}
                isMobileView={isMobile}
              />
            </div>
          ) : (
            <div className="flex-1 p-4 overflow-y-auto h-screen">
              <div className="max-w-5xl mx-auto space-y-8">
                <button
                  onClick={handleBackToTopics}
                  className="flex items-center text-blue-600 hover:text-blue-800 font-semibold mb-4"
                >
                  <FaArrowLeft className="mr-2" /> Back to Topics
                </button>
                {courseLoading ? (
                  <div className="text-center p-10">Loading assignments...</div>
                ) : activeSubtopicId ? (
                  <AssignmentMCQTestDisplay subtopicId={activeSubtopicId} />
                ) : (
                  <div className="text-center p-10 text-slate-500 bg-white rounded-lg shadow-sm border border-slate-100">
                    <h2 className="text-xl font-bold mb-3">Welcome to Assignments</h2>
                    <p>
                      Select a subtopic from the sidebar to view its associated
                      assessments and practice modules.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        // Laptop View (existing)
        <>
          {/* Sidebar */}
          <AssignmentSidebar
            onSubtopicSelect={handleSubtopicSelect}
            activeSubtopicId={activeSubtopicId}
            isMobileView={isMobile}
          />

          {/* Main Content Area */}
          <div className="flex-1 p-6 lg:p-10 overflow-y-auto h-screen">
            <div className="max-w-5xl mx-auto space-y-8">
              {courseLoading ? (
                <div className="text-center p-10">Loading assignments...</div>
              ) : activeSubtopicId ? (
                <AssignmentMCQTestDisplay subtopicId={activeSubtopicId} />
              ) : (
                <div className="text-center p-10 text-slate-500 bg-white rounded-lg shadow-sm border border-slate-100">
                  <h2 className="text-xl font-bold mb-3">Welcome to Assignments</h2>
                  <p>
                    Select a subtopic from the sidebar to view its associated
                    assessments and practice modules.
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
