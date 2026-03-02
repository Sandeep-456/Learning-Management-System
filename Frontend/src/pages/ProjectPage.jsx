import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api"; // Your Axios instance
import ProjectWorkspace from "../components/LabCodingQuestions/ProjectWorkspace";
import { FaSpinner, FaExclamationTriangle } from "react-icons/fa";

const ProjectPage = () => {
  const { subtopicId } = useParams(); // Get ID from URL
  const navigate = useNavigate();

  //   console.log(subtopicId);

  const [projectSet, setProjectSet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setLoading(true);
        // Fetch projects related to the week
        const { data } = await api.get(`/projects/subtopic/${subtopicId}`);

        console.log(data);

        // The API returns an array of matching projects. We take the first one.
        if (data && data.length > 0) {
          setProjectSet(data[0]);
        } else {
          setError("No project assigned to this topic.");
        }
      } catch (err) {
        console.error("Failed to fetch project:", err);
        setError("Failed to load project data.");
      } finally {
        setLoading(false);
      }
    };

    if (subtopicId) {
      fetchProjectData();
    }
  }, [subtopicId]);

  // --- RENDER: LOADING STATE ---
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <FaSpinner className="animate-spin text-4xl text-pink-600 mb-4" />
        <p className="text-slate-500 font-medium">Loading Project...</p>
      </div>
    );
  }

  // --- RENDER: ERROR STATE ---
  if (error || !projectSet) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-6">
        <div className="bg-white p-8 rounded-3xl shadow-sm text-center max-w-md border border-slate-200">
          <FaExclamationTriangle className="text-4xl text-amber-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-800 mb-2">
            Project Unavailable
          </h2>
          <p className="text-slate-500 mb-6">
            {error || "This content is not assigned yet."}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // --- RENDER: MAIN WORKSPACE ---
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Pass the fetched data to your UI component */}
        <ProjectWorkspace set={projectSet} onBack={() => navigate(-1)} />
      </div>
    </div>
  );
};

export default ProjectPage;
