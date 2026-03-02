import React, { useState, useEffect } from "react";
import {
  FaArrowLeft,
  FaChevronDown,
  FaCloudDownloadAlt,
  FaGoogleDrive,
  FaFileUpload,
  FaCheckCircle,
  FaLock,
  FaFlask,
  FaListOl,
  FaGithub, // Added Github icon
} from "react-icons/fa";
import api from "../../utils/api";

const ProjectWorkspace = ({ set, onBack }) => {
  // State for Accordion
  const [openProjectId, setOpenProjectId] = useState(
    set.projects?.[0]?._id || null,
  );

  // State for Inputs { "projectId": "url..." }
  const [inputs, setInputs] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // 1. PRE-FILL INPUTS
  useEffect(() => {
    const initialInputs = {};
    if (set.projects) {
      set.projects.forEach((p) => {
        if (p.savedSubmissionUrl) {
          initialInputs[p._id] = p.savedSubmissionUrl;
        }
      });
    }
    setInputs(initialInputs);
  }, [set]);

  // Toggle Accordion
  const toggleProject = (id) => {
    setOpenProjectId((prev) => (prev === id ? null : id));
  };

  // Handle URL Input Change
  const handleInputChange = (pId, value) => {
    setInputs((prev) => ({ ...prev, [pId]: value }));
  };

  // Submit Logic
  const handleSubmit = async (pId) => {
    const url = inputs[pId];
    if (!url) return alert("Please enter a valid Google Drive or GitHub link.");

    try {
      setSubmitting(true);
      await api.post("/projects/submit", {
        projectSetId: set._id,
        responses: [
          {
            projectId: pId,
            submissionUrl: url,
          },
        ],
      });
      alert("Project submitted for review!");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Submission failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // --- CLAY STYLES ---

  const clayCardStyle = {
    backgroundColor: "#FFFFFF",
    borderRadius: "20px",
    boxShadow: "8px 8px 16px #cedbe7, -8px -8px 16px #ffffff",
    border: "2px solid #FFFFFF",
  };

  const clayInsetWell = {
    backgroundColor: "#F1F5F9",
    borderRadius: "16px",
    boxShadow: "inset 6px 6px 10px #e2e8f0, inset -6px -6px 10px #ffffff",
    border: "1px solid rgba(255,255,255,0.4)",
  };

  // PINK for Active Submit (Projects Theme)
  const clayPinkButtonStyle = {
    background: "linear-gradient(145deg, #db2777, #ec4899)", // Pink 600 -> 500
    color: "white",
    borderRadius: "14px",
    boxShadow: "6px 6px 15px rgba(219, 39, 119, 0.4), -6px -6px 15px #ffffff",
    transition: "transform 0.1s ease, box-shadow 0.1s ease",
    border: "1px solid rgba(255,255,255,0.2)",
  };

  // GREEN for Locked/Submitted
  const clayGreenLockedStyle = {
    background: "linear-gradient(145deg, #10b981, #059669)",
    color: "white",
    borderRadius: "14px",
    boxShadow:
      "inset 4px 4px 8px rgba(0,0,0,0.2), inset -4px -4px 8px rgba(255,255,255,0.2)",
    border: "1px solid rgba(255,255,255,0.2)",
    cursor: "default",
  };

  const clayResourceStyle = {
    backgroundColor: "#F8FAFC",
    borderRadius: "12px",
    boxShadow: "4px 4px 8px #e2e8f0, -4px -4px 8px #ffffff",
    border: "1px solid #FFFFFF",
  };

  return (
    <div className="font-sans py-6">
      {/* MAIN CONTAINER */}
      <div
        className="flex flex-col overflow-hidden min-h-[600px] relative"
        style={{
          backgroundColor: "#F0F4F8",
          borderRadius: "30px",
          boxShadow: "15px 15px 30px #cedbe7, -15px -15px 30px #ffffff",
        }}
      >
        {/* --- HEADER --- */}
        <div className="bg-[#1e293b] text-white p-6 flex items-center justify-between relative overflow-hidden z-10">
          {/* Background Texture (Pinkish for Projects) */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-pink-500 rounded-full blur-[60px] opacity-20 -mr-10 -mt-10 pointer-events-none"></div>

          <div className="flex items-center gap-5 z-10">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-pink-600 transition-all shadow-lg"
            >
              <FaArrowLeft size={14} />
            </button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <FaFlask className="text-pink-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-pink-200">
                  {set.projectType} PROJECT
                </span>
              </div>
              <h2 className="text-xl font-black tracking-tight leading-none">
                {set.title}
              </h2>
            </div>
          </div>

          <div className="text-xs font-mono bg-white/10 px-3 py-1 rounded hidden md:block border border-white/5">
            {set.projects?.length || 0} Tasks
          </div>
        </div>

        {/* --- PROJECTS LIST --- */}
        <div className="p-6 space-y-6 flex-1 overflow-y-auto bg-[#F0F4F8]">
          {set.projects?.map((proj, index) => {
            const isOpen = openProjectId === proj._id;
            const isLocked = !!proj.savedSubmissionUrl;

            return (
              <div
                key={proj._id}
                className={`transition-all duration-300 overflow-hidden ${isOpen ? "pb-2" : ""}`}
                style={clayCardStyle}
              >
                {/* ACCORDION HEADER */}
                <button
                  onClick={() => toggleProject(proj._id)}
                  className="w-full flex items-center justify-between p-5 text-left group"
                >
                  <div className="flex items-center gap-5">
                    {/* Number Badge */}
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black transition-colors duration-300 ${
                        isLocked
                          ? "bg-emerald-500 text-white shadow-md"
                          : isOpen
                            ? "bg-pink-600 text-white shadow-lg shadow-pink-200"
                            : "bg-[#F1F5F9] text-slate-400 shadow-inner"
                      }`}
                    >
                      {isLocked ? <FaCheckCircle /> : index + 1}
                    </div>

                    <span
                      className={`text-base lg:text-lg font-bold tracking-tight transition-colors duration-300 ${
                        isOpen
                          ? "text-pink-900"
                          : "text-slate-600 group-hover:text-slate-800"
                      }`}
                    >
                      {proj.title || `Project Task #${index + 1}`}
                    </span>
                  </div>

                  {/* Chevron Button */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? "bg-pink-50 text-pink-600 shadow-sm rotate-180"
                        : "text-slate-300"
                    }`}
                  >
                    <FaChevronDown size={12} />
                  </div>
                </button>

                {/* ACCORDION BODY */}
                {isOpen && (
                  <div className="px-6 pb-4 animate-fadeIn">
                    {/* 1. PROBLEM STATEMENT */}
                    <div
                      className="p-5 mb-6 text-slate-600 leading-relaxed font-medium text-xs lg:text-sm"
                      style={clayInsetWell}
                    >
                      <p>{proj.problemStatement}</p>
                    </div>

                    {/* 2. INSTRUCTIONS & RESOURCES GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-2 ml-6 lg:ml-12 mb-8">
                      {/* LEFT: INSTRUCTIONS */}
                      <div>
                        <h4 className="text-[14px] font-black uppercase text-slate-400 tracking-widest mb-3 flex items-center gap-2">
                          <FaListOl /> Instructions
                        </h4>
                        <ol className="text-[12px] lg:text-base text-slate-600 space-y-2 list-decimal pl-6 lg:pl-4 marker:text-pink-400 marker:font-bold">
                          <li>Download the assets provided below.</li>
                          <li>Initialize your project locally or on Colab.</li>
                          <li>Implement the features described above.</li>
                          <li>
                            Upload to <strong>GitHub</strong> or{" "}
                            <strong>Google Drive</strong>.
                          </li>
                          <li>Submit the public link below.</li>
                        </ol>
                      </div>

                      {/* RIGHT: RESOURCES */}
                      <div>
                        <h4 className="text-[14px] font-black uppercase text-slate-400 tracking-widest mb-3 flex items-center gap-2">
                          <span className="text-pink-400 text-xl">●</span>
                          Resources
                        </h4>
                        <div className="flex flex-col gap-2">
                          {proj.resources.map((res, i) => (
                            <a
                              key={i}
                              href={res.url}
                              target="_blank"
                              rel="noreferrer"
                              className="w-[90%] flex items-center gap-3 px-6 py-3 text-base font-bold text-slate-600 hover:text-pink-600 transition-all hover:scale-[1.02] active:scale-95"
                              style={clayResourceStyle}
                            >
                              <FaCloudDownloadAlt />
                              {res.label}
                            </a>
                          ))}
                          {proj.resources.length === 0 && (
                            <div className="px-4 py-3 text-xs text-slate-400 italic bg-slate-50 rounded-xl border border-dashed border-slate-200">
                              No resources attached.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* 3. SUBMISSION AREA (Consistent Theming) */}
                    <div
                      className="rounded-2xl p-6 transition-colors relative"
                      style={{
                        // Green tint if locked, Pink tint if active
                        backgroundColor: isLocked ? "#ecfdf5" : "#fdf2f8", // fdf2f8 is pink-50
                        borderRadius: "24px",
                        boxShadow: isLocked
                          ? "6px 6px 12px #d1fae5, -6px -6px 12px #ffffff"
                          : "6px 6px 12px #fbcfe8, -6px -6px 12px #ffffff",
                        border: "2px solid #FFFFFF",
                      }}
                    >
                      <label
                        className={`flex items-center gap-2 text-base font-black uppercase tracking-wide mb-4 ${
                          isLocked ? "text-emerald-700" : "text-pink-700"
                        }`}
                      >
                        {/* Dynamic Icon based on lock state */}
                        {isLocked ? <FaCheckCircle /> : <FaGithub />}
                        {isLocked
                          ? " Project Submitted"
                          : " Submit Link (GitHub/Drive)"}
                      </label>

                      <div className="flex flex-col md:flex-row gap-4">
                        {/* INPUT FIELD */}
                        <input
                          type="url"
                          placeholder={
                            isLocked
                              ? inputs[proj._id]
                              : "https://github.com/username/repo..."
                          }
                          className={`flex-1 p-4 text-sm font-medium focus:outline-none transition-all ${
                            isLocked
                              ? "text-emerald-700 placeholder-emerald-400 cursor-not-allowed opacity-80"
                              : "text-pink-700 placeholder-pink-300 focus:ring-2 focus:ring-pink-200"
                          }`}
                          style={{
                            backgroundColor: "#FFFFFF",
                            borderRadius: "14px",
                            // Inset Shadow: Greenish if locked, Pinkish if active
                            boxShadow: isLocked
                              ? "inset 4px 4px 8px #d1fae5, inset -4px -4px 8px #ffffff"
                              : "inset 4px 4px 8px #fbcfe8, inset -4px -4px 8px #ffffff",
                            border: "none",
                          }}
                          value={inputs[proj._id] || ""}
                          onChange={(e) =>
                            handleInputChange(proj._id, e.target.value)
                          }
                          disabled={isLocked}
                        />

                        {/* SUBMIT BUTTON */}
                        <button
                          onClick={() => handleSubmit(proj._id)}
                          disabled={submitting || isLocked}
                          className="px-8 py-3 rounded-xl font-bold text-base tracking-wide transition-all transform flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed active:scale-95"
                          // Conditionally apply Strong Pink OR Strong Green style
                          style={
                            isLocked
                              ? clayGreenLockedStyle
                              : clayPinkButtonStyle
                          }
                        >
                          {submitting ? (
                            "..."
                          ) : isLocked ? (
                            <>
                              <FaLock /> Submitted
                            </>
                          ) : (
                            <>
                              <FaFileUpload className="text-sm" /> Submit
                            </>
                          )}
                        </button>
                      </div>

                      {isLocked && (
                        <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-emerald-600">
                          <FaCheckCircle size={10} /> Your project is under
                          review.
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectWorkspace;
