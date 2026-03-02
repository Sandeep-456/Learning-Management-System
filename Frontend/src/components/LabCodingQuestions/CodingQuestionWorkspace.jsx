import React, { useState, useEffect } from "react";
import {
  FaArrowLeft,
  FaChevronDown,
  FaCloudDownloadAlt,
  FaGoogleDrive,
  FaFileUpload,
  FaCheckCircle,
  FaLock,
  FaCodeBranch,
  FaListOl,
} from "react-icons/fa";
import api from "../../utils/api";

const CodingQuestionWorkspace = ({ set, onBack }) => {
  const [openQuestionId, setOpenQuestionId] = useState(
    set.questions[0]?._id || null,
  );
  const [inputs, setInputs] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // --- INIT INPUTS ---
  useEffect(() => {
    const initialInputs = {};
    if (set.questions) {
      set.questions.forEach((q) => {
        if (q.savedUrl) {
          initialInputs[q._id] = q.savedUrl;
        }
      });
    }
    setInputs(initialInputs);
  }, [set]);

  const toggleQuestion = (id) => {
    setOpenQuestionId((prev) => (prev === id ? null : id));
  };

  const handleInputChange = (qId, value) => {
    setInputs((prev) => ({ ...prev, [qId]: value }));
  };

  const handleSubmit = async (qId) => {
    const url = inputs[qId];
    if (!url) return alert("Please enter a valid Google Drive link.");

    try {
      setSubmitting(true);
      await api.post("/coding/submit", {
        codingSetId: set._id,
        responses: [{ questionId: qId, submissionUrl: url }],
      });
      alert("Solution submitted for review!");
      window.location.reload();
    } catch (error) {
      alert("Submission failed.");
    } finally {
      setSubmitting(false);
    }
  };

  // --- REFINED CLAY STYLES ---

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

  // 1. OLD BLUE (Indigo) for Active Submit
  const clayBlueButtonStyle = {
    background: "linear-gradient(145deg, #6366f1, #4f46e5)", // Indigo Gradient
    color: "white",
    borderRadius: "14px",
    boxShadow: "6px 6px 15px rgba(99, 102, 241, 0.4), -6px -6px 15px #ffffff",
    transition: "transform 0.1s ease, box-shadow 0.1s ease",
    border: "1px solid rgba(255,255,255,0.2)",
  };

  // 2. STRONG GREEN (Emerald) for Locked/Submitted
  const clayGreenLockedStyle = {
    background: "linear-gradient(145deg, #06bf55, #02a849)", // Emerald Gradient
    color: "white",
    borderRadius: "14px",
    boxShadow:
      "inset 4px 4px 8px rgba(0,0,0,0.2), inset -4px -4px 8px rgba(255,255,255,0.2)", // Pressed In Look
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
          <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500 rounded-full blur-[60px] opacity-20 -mr-10 -mt-10 pointer-events-none"></div>

          <div className="flex items-center gap-5 z-10">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 hover:text-white hover:bg-indigo-600 transition-all shadow-lg"
            >
              <FaArrowLeft size={16} />
            </button>
            <div>
              <h2 className="text-xl font-black tracking-tight">
                {set.level} Challenges
              </h2>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2 mt-1">
                <FaCodeBranch size={14} />
                {set.questions.length} Active Tasks
              </p>
            </div>
          </div>
        </div>

        {/* --- QUESTIONS LIST --- */}
        <div className="p-6 space-y-6 flex-1 overflow-y-auto bg-[#F0F4F8]">
          {set.questions.map((q, index) => {
            const isOpen = openQuestionId === q._id;
            const isLocked = !!q.savedUrl;

            return (
              <div
                key={q._id}
                className={`transition-all duration-300 overflow-hidden ${isOpen ? "pb-2" : ""}`}
                style={clayCardStyle}
              >
                {/* ACCORDION HEADER */}
                <button
                  onClick={() => toggleQuestion(q._id)}
                  className="w-full flex items-center justify-between p-5 text-left group"
                >
                  <div className="flex items-center gap-5">
                    {/* Number Badge */}
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black transition-colors duration-300 ${
                        isLocked
                          ? "bg-emerald-500 text-white shadow-md"
                          : isOpen
                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                            : "bg-[#F1F5F9] text-slate-400 shadow-inner"
                      }`}
                    >
                      {isLocked ? <FaCheckCircle /> : index + 1}
                    </div>

                    <span
                      className={`text-lg font-bold tracking-tight transition-colors duration-300 ${
                        isOpen
                          ? "text-indigo-900"
                          : "text-slate-600 group-hover:text-slate-800"
                      }`}
                    >
                      {q.title || `Problem Statement #${index + 1}`}
                    </span>
                  </div>

                  {/* Chevron Button */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? "bg-indigo-50 text-indigo-600 shadow-sm rotate-180"
                        : "text-slate-300"
                    }`}
                  >
                    <FaChevronDown size={12} />
                  </div>
                </button>

                {/* ACCORDION BODY */}
                {isOpen && (
                  <div className="px-6 pb-4 mt-2 animate-fadeIn">
                    {/* 1. PROBLEM STATEMENT */}
                    <div
                      className="p-5 mb-8 text-slate-600 leading-relaxed font-medium text-xs lg:text-sm"
                      style={clayInsetWell}
                    >
                      <p>{q.problemStatement}</p>
                    </div>

                    {/* 2. INSTRUCTIONS & RESOURCES GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-6 lg:ml-12 mb-8">
                      {/* LEFT: INSTRUCTIONS */}
                      <div>
                        <h4 className="text-[14px] font-black uppercase text-slate-400 tracking-widest mb-3 flex items-center gap-2">
                          <FaListOl /> Instructions
                        </h4>
                        <ol className="text-[12px] lg:text-base text-slate-600 space-y-2 list-decimal pl-6 lg:pl-4 marker:text-indigo-400 marker:font-bold">
                          <li>Download the resources provided.</li>
                          <li>Write your code in Colab or VS Code.</li>
                          <li>Upload the file to Google Drive.</li>
                          <li>
                            <strong>
                              Change access to "Anyone with link".
                            </strong>
                          </li>
                          <li>Paste the link below and submit.</li>
                        </ol>
                      </div>

                      {/* RIGHT: RESOURCES */}
                      <div>
                        <h4 className="text-[14px] font-black uppercase text-slate-400 tracking-widest mb-3 flex items-center gap-2">
                          <span className="text-indigo-600 text-xl">●</span>
                          Resources
                        </h4>
                        <div className="flex flex-col gap-2">
                          {q.resources.map((res, i) => (
                            <a
                              key={i}
                              href={res.url}
                              target="_blank"
                              rel="noreferrer"
                              className="w-[90%] flex items-center gap-3 px-4 py-3 text-base font-bold text-slate-600 hover:text-indigo-600 transition-all hover:scale-[1.02] active:scale-95"
                              style={clayResourceStyle}
                            >
                              <FaCloudDownloadAlt />
                              {res.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* 3. SUBMISSION AREA */}
                    <div
                      className="rounded-2xl p-6 transition-colors relative"
                      style={{
                        // Background: Green tint if locked, Indigo tint if active
                        backgroundColor: isLocked ? "#ecfdf5" : "#eef2ff",
                        borderRadius: "24px",
                        // Outer Shadow: Greenish if locked, Bluish if active
                        boxShadow: isLocked
                          ? "6px 6px 12px #d1fae5, -6px -6px 12px #ffffff"
                          : "6px 6px 12px #c7d2fe, -6px -6px 12px #ffffff",
                        border: "2px solid #FFFFFF",
                      }}
                    >
                      <label
                        className={`flex items-center gap-2 ml-2 text-base font-black uppercase tracking-wide mb-4 ${
                          isLocked ? "text-emerald-700" : "text-indigo-700"
                        }`}
                      >
                        <FaGoogleDrive className="text-base" />{" "}
                        {isLocked ? "Submission Locked" : "Submit Drive Link"}
                      </label>

                      <div className="flex flex-col md:flex-row gap-4">
                        {/* INPUT FIELD */}
                        <input
                          type="url"
                          placeholder={
                            isLocked
                              ? inputs[q._id]
                              : "https://drive.google.com/..."
                          }
                          className={`flex-1 p-4 text-sm font-medium focus:outline-none transition-all ${
                            isLocked
                              ? "text-emerald-700 placeholder-emerald-400 cursor-not-allowed opacity-80"
                              : "text-indigo-700 placeholder-indigo-300 focus:ring-2 focus:ring-indigo-200"
                          }`}
                          style={{
                            backgroundColor: "#FFFFFF",
                            borderRadius: "14px",
                            // Inset Shadow: Greenish if locked, Bluish if active
                            boxShadow: isLocked
                              ? "inset 4px 4px 8px #d1fae5, inset -4px -4px 8px #ffffff"
                              : "inset 4px 4px 8px #c7d2fe, inset -4px -4px 8px #ffffff",
                            border: "none",
                          }}
                          value={inputs[q._id] || ""}
                          onChange={(e) =>
                            handleInputChange(q._id, e.target.value)
                          }
                          disabled={isLocked}
                        />

                        {/* SUBMIT BUTTON */}
                        <button
                          onClick={() => handleSubmit(q._id)}
                          disabled={submitting || isLocked}
                          className="px-6 py-3 rounded-xl font-bold text-base tracking-wide transition-all transform flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed active:scale-95"
                          // Conditionally apply Strong Blue OR Strong Green style
                          style={
                            isLocked
                              ? clayGreenLockedStyle
                              : clayBlueButtonStyle
                          }
                        >
                          {submitting ? (
                            "..."
                          ) : isLocked ? (
                            <>
                              <FaCheckCircle /> Submitted
                            </>
                          ) : (
                            <>
                              <FaFileUpload className="text-sm" /> Submit
                            </>
                          )}
                        </button>
                      </div>

                      {isLocked && (
                        <div className="mt-4 ml-4 flex items-center gap-2 text-[12px] font-bold text-emerald-600">
                          <FaLock size={12} /> Successfully submitted for
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

export default CodingQuestionWorkspace;
