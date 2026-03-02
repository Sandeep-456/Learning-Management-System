import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  FaCheck,
  FaTimes,
  FaChevronRight,
  FaTerminal,
  FaLightbulb,
  FaSpinner,
  FaLayerGroup,
  FaFlagCheckered,
  FaExclamationTriangle, // Warning icon for popup
} from "react-icons/fa";

import api from "../../utils/api";

export default function AssignmentWorkspace() {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  // State
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [mcqSetId, setMcqSetId] = useState(null);

  // Modal State
  const [showFinishModal, setShowFinishModal] = useState(false);

  // Track context for submission
  const [examContext, setExamContext] = useState({
    level: "EASY",
    type: "ASSIGNMENT",
  });

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submissionResult, setSubmissionResult] = useState(null);

  const isPractice = state?.type === "PRACTICE";
  const topicName = state?.topic || "Module Test";

  // 1. FETCH QUESTIONS
  useEffect(() => {
    const startAssessment = async () => {
      try {
        setLoading(true);
        const level = state?.level || "EASY";
        const type = state?.type || "ASSIGNMENT";

        setExamContext({ level, type });

        const { data } = await api.post("/mcq/start", {
          subtopicId: id,
          level: level,
          type: type,
        });

        const formattedQuestions = data.questions.map((q) => ({
          id: q._id,
          question: q.questionText,
          codeSnippet: q.questionCodeSnippet,
          options: q.options.map((opt) => opt.content),
          optionKeys: q.options.map((opt) => opt.key),
          correctKey: q.correctOptionKey,
          explanation: q.explanation,
        }));

        setQuestions(formattedQuestions);
        setMcqSetId(data._id);
      } catch (error) {
        console.error("Failed to start exam", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) startAssessment();
  }, [id, state]);

  // 2. SUBMIT EXAM
  const handleSubmitExam = async () => {
    setShowFinishModal(false); // Close modal
    try {
      setLoading(true);

      const answerPayload = {};
      questions.forEach((q, idx) => {
        const selectedOptIdx = selectedAnswers[idx];
        if (selectedOptIdx !== undefined) {
          answerPayload[q.id] = q.optionKeys[selectedOptIdx];
        }
      });

      const { data } = await api.post("/mcq/submit", {
        mcqSetId: mcqSetId,
        answers: answerPayload,
        type: examContext.type,
        level: examContext.level,
      });

      setSubmissionResult(data);
    } catch (error) {
      alert("Submission failed. Please check internet connection.");
    } finally {
      setLoading(false);
    }
  };

  // 3. NAVIGATION HANDLER (Fix for redirect)
  const handleReturnToDashboard = () => {
    // Navigate back to the Video/Subtopic page
    // Pass 'activeContentType' or 'activeTab' depending on what your Parent component expects
    navigate(`/video/${id}`, {
      state: {
        activeContentType: "MCQ", // Ensuring it selects MCQ/Assessment view
        activeTab: "ASSIGNMENT", // If your component uses this prop
      },
    });
  };

  // --- WHITE THEME CLAY STYLES ---
  const clayContainerStyle = {
    backgroundColor: "#FFFFFF",
    borderRadius: "32px",
    boxShadow: "20px 20px 60px #e2e8f0, -20px -20px 60px #ffffff",
    border: "1px solid #f1f5f9",
  };

  const clayOptionStyle = {
    backgroundColor: "#FFFFFF",
    borderRadius: "16px",
    boxShadow: "6px 6px 12px #e2e8f0, -6px -6px 12px #ffffff",
    border: "1px solid #f8fafc",
    transition: "all 0.2s ease",
  };

  const clayOptionActiveStyle = {
    background: "linear-gradient(145deg, #6366f1, #4f46e5)",
    color: "white",
    borderRadius: "16px",
    boxShadow:
      "inset 4px 4px 8px rgba(0,0,0,0.2), inset -4px -4px 8px rgba(255,255,255,0.2)",
    border: "1px solid transparent",
  };

  const clayButtonStyle = {
    background: "linear-gradient(145deg, #1e293b, #0f172a)",
    color: "white",
    borderRadius: "16px",
    boxShadow: "6px 6px 12px #cbd5e1, -6px -6px 12px #ffffff",
  };

  const clayFinishButtonStyle = {
    background: "linear-gradient(145deg, #ef4444, #dc2626)",
    color: "white",
    borderRadius: "12px",
    boxShadow: "4px 4px 8px #fca5a5, -4px -4px 8px #ffffff",
  };

  // --- MODAL STYLES ---
  const modalOverlayStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    backdropFilter: "blur(8px)",
  };

  const clayModalStyle = {
    backgroundColor: "#FFFFFF",
    borderRadius: "32px",
    boxShadow: "20px 20px 60px #cbd5e1, -20px -20px 60px #ffffff",
    border: "2px solid #f1f5f9",
  };

  // --- RENDER LOADING ---
  if (loading && !submissionResult) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#FAFAFA]">
        <div className="p-10 rounded-3xl flex flex-col items-center bg-white shadow-2xl">
          <FaSpinner className="animate-spin text-4xl text-indigo-500 mb-4" />
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
            Loading Assessment...
          </p>
        </div>
      </div>
    );
  }

  // --- RENDER RESULT SCREEN ---
  if (submissionResult) {
    const { percentage, isPassed, attemptNumber } = submissionResult;
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-6 font-sans">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-xl w-full p-12 flex flex-col items-center text-center"
          style={clayContainerStyle}
        >
          <div
            className={`w-28 h-28 rounded-[30px] flex items-center justify-center mb-8 transition-transform hover:scale-105 ${
              isPassed
                ? "text-emerald-500 bg-emerald-50"
                : "text-indigo-500 bg-indigo-50"
            }`}
            style={{
              boxShadow: "10px 10px 20px #e2e8f0, -10px -10px 20px #ffffff",
            }}
          >
            <FaCheck className="text-5xl drop-shadow-sm" />
          </div>

          <h2 className="text-3xl font-black mb-2 text-slate-800 tracking-tight">
            {isPassed ? "Assessment Passed!" : "Assessment Complete"}
          </h2>
          <p className="text-slate-400 mb-10 font-bold text-sm uppercase tracking-wide">
            Attempt #{attemptNumber} • Synced Successfully
          </p>

          <div
            className="mb-10 w-full p-8 flex flex-col items-center bg-[#F8FAFC] rounded-[24px]"
            style={{
              boxShadow:
                "inset 6px 6px 12px #e2e8f0, inset -6px -6px 12px #ffffff",
            }}
          >
            <div
              className={`text-6xl font-black mb-1 ${
                isPassed ? "text-emerald-500" : "text-indigo-500"
              }`}
            >
              {percentage}%
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">
              Score Percentage
            </p>
          </div>

          <button
            onClick={handleReturnToDashboard} // <--- UPDATED NAVIGATION
            className="w-full py-4 text-sm font-black uppercase tracking-widest transition-transform active:scale-95 hover:-translate-y-1"
            style={clayButtonStyle}
          >
            Return to Dashboard
          </button>
        </motion.div>
      </div>
    );
  }

  const currentQ = questions[currentIdx];
  const userAnsIdx = selectedAnswers[currentIdx];
  const hasAnswered = userAnsIdx !== undefined;

  // --- MAIN RENDER ---
  return (
    <div className="h-screen bg-[#FAFAFA] flex flex-col font-sans text-slate-700 overflow-hidden relative">
      {/* --- FINISH CONFIRMATION POPUP (MODAL) --- */}
      <AnimatePresence>
        {showFinishModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={modalOverlayStyle}
          >
            <motion.div
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              className="p-10 w-full max-w-md mx-4 text-center"
              style={clayModalStyle}
            >
              <div className="w-20 h-20 mx-auto bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mb-6 shadow-inner">
                <FaExclamationTriangle className="text-3xl" />
              </div>

              <h3 className="text-2xl font-black text-slate-800 mb-2">
                Finish Assessment?
              </h3>

              <p className="text-slate-500 font-medium text-sm mb-8 px-4">
                You have answered{" "}
                <strong className="text-indigo-600">
                  {Object.keys(selectedAnswers).length}
                </strong>{" "}
                out of{" "}
                <strong className="text-indigo-600">{questions.length}</strong>{" "}
                questions. Are you sure you want to submit?
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowFinishModal(false)}
                  className="flex-1 py-3.5 rounded-2xl text-slate-500 font-bold text-sm bg-white hover:bg-slate-50 transition-colors"
                  style={{
                    boxShadow: "4px 4px 8px #e2e8f0, -4px -4px 8px #ffffff",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitExam}
                  className="flex-1 py-3.5 rounded-2xl text-white font-bold text-sm transition-transform active:scale-95 hover:-translate-y-1"
                  style={{
                    background: "linear-gradient(145deg, #1e293b, #0f172a)",
                    boxShadow: "6px 6px 12px #cbd5e1, -6px -6px 12px #ffffff",
                  }}
                >
                  Yes, Submit
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HEADER */}
      <header className="h-22 shrink-0 px-8 flex items-center justify-between z-40 bg-white border-b border-slate-100 shadow-sm">
        <div className="flex items-center gap-5">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-lg"
            style={{
              background: "linear-gradient(145deg, #6366f1, #4f46e5)",
              boxShadow: "4px 4px 8px rgba(99, 102, 241, 0.3)",
            }}
          >
            <FaTerminal size={20} />
          </div>
          <div>
            <h1 className="text-base font-black uppercase tracking-widest text-slate-800">
              {topicName}
            </h1>
            <p className="text-[12px] text-indigo-500 font-bold uppercase tracking-wider flex items-center gap-2">
              <FaLayerGroup className="text-[14px]" />
              {isPractice ? "Practice Lab" : "Official Assessment"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:block w-48 h-2.5 rounded-full overflow-hidden relative bg-slate-100 shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${((currentIdx + 1) / questions.length) * 100}%`,
              }}
              className="h-full bg-indigo-500 rounded-full"
            />
          </div>

          <button
            onClick={() => setShowFinishModal(true)} // Opens Modal
            className="flex items-center gap-2 px-5 py-2 text-sm font-bold uppercase tracking-wider hover:scale-105 active:scale-95 transition-transform"
            style={clayFinishButtonStyle}
          >
            Finish <FaFlagCheckered />
          </button>
        </div>
      </header>

      {/* 2. MIDDLE CONTENT */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden z-0">
        {/* LEFT PANEL */}
        <section className="flex-1 overflow-y-auto p-6 lg:p-10 bg-[#f5f5f5]">
          <div className="max-w-3xl mx-auto w-full">
            <span className="inline-block px-4 py-3 rounded-xl text-indigo-600 text-[12px] font-black uppercase tracking-widest mb-6 bg-white shadow-sm border border-slate-100">
              Question {currentIdx + 1} / {questions.length}
            </span>

            <h2 className="text-2xl md:text-3xl font-black leading-tight text-slate-800 mb-8">
              {currentQ?.question}
            </h2>

            {currentQ?.codeSnippet && (
              <div className="mb-8 rounded-[20px] overflow-hidden border-4 border-white shadow-lg">
                <div className="bg-[#1e293b] p-6 text-base relative">
                  <div className="absolute top-4 right-4 flex gap-1.5 opacity-50">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  </div>
                  <SyntaxHighlighter
                    language="python"
                    style={atomDark}
                    customStyle={{
                      margin: 0,
                      background: "transparent",
                      fontSize: "1rem",
                    }}
                  >
                    {currentQ.codeSnippet}
                  </SyntaxHighlighter>
                </div>
              </div>
            )}

            <AnimatePresence>
              {isPractice && hasAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 p-8 rounded-2xl text-white relative overflow-hidden"
                  style={{
                    background: "linear-gradient(145deg, #6366f1, #4f46e5)",
                    boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.4)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-3 font-black uppercase tracking-widest text-xs opacity-80">
                    <FaLightbulb /> Explanation
                  </div>
                  <p className="text-lg font-medium leading-relaxed opacity-95">
                    {currentQ.explanation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* RIGHT PANEL */}
        <section className="w-full lg:w-[450px] shrink-0 bg-white border-l border-slate-100 overflow-y-auto p-6 lg:p-8 flex flex-col shadow-[inset_10px_0px_20px_-15px_rgba(0,0,0,0.05)]">
          <div className="w-full space-y-5 my-auto">
            {currentQ?.options.map((optContent, i) => {
              const isSelected = userAnsIdx === i;

              let currentStyle = clayOptionStyle;
              let textColor = "text-slate-600";
              let badgeColor = "bg-slate-100 text-slate-400 shadow-inner";

              if (isSelected) {
                currentStyle = clayOptionActiveStyle;
                textColor = "text-white";
                badgeColor = "bg-white/20 text-white border-none";
              }

              if (isPractice && hasAnswered) {
                if (currentQ.optionKeys[i] === currentQ.correctKey) {
                  currentStyle = {
                    ...clayOptionStyle,
                    backgroundColor: "#ecfdf5",
                    border: "2px solid #10b981",
                    color: "#065f46",
                  };
                  textColor = "text-emerald-800";
                  badgeColor = "bg-emerald-200 text-emerald-700";
                } else if (isSelected) {
                  currentStyle = {
                    ...clayOptionStyle,
                    backgroundColor: "#fff1f2",
                    border: "2px solid #f43f5e",
                    color: "#881337",
                  };
                  textColor = "text-rose-800";
                  badgeColor = "bg-rose-200 text-rose-700";
                } else {
                  currentStyle = { ...clayOptionStyle, opacity: 0.5 };
                }
              }

              return (
                <button
                  key={i}
                  disabled={hasAnswered && isPractice}
                  onClick={() =>
                    setSelectedAnswers({
                      ...selectedAnswers,
                      [currentIdx]: i,
                    })
                  }
                  className={`w-full px-6 py-6 text-left font-bold flex justify-between items-center group relative overflow-hidden ${textColor}`}
                  style={currentStyle}
                >
                  <div className="flex items-center gap-5 relative z-10 w-full">
                    <span
                      className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center text-sm font-black transition-colors ${badgeColor}`}
                    >
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="text-lg leading-snug">{optContent}</span>
                  </div>

                  {isPractice && hasAnswered && (
                    <div className="text-xl relative z-10 pl-3">
                      {currentQ.optionKeys[i] === currentQ.correctKey && (
                        <FaCheck className="text-emerald-600" />
                      )}
                      {isSelected &&
                        currentQ.optionKeys[i] !== currentQ.correctKey && (
                          <FaTimes className="text-rose-600" />
                        )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </section>
      </main>

      {/* 3. FOOTER */}
      <footer className="h-20 shrink-0 px-6 bg-white border-t border-slate-100 flex items-center justify-between z-40 shadow-[0_-5px_15px_rgba(0,0,0,0.02)]">
        <div
          className="flex gap-2 p-3 rounded-full overflow-x-auto max-w-[50%] no-scrollbar bg-[#F8FAFC]"
          style={{
            boxShadow: "inset 3px 3px 6px #e2e8f0, inset -3px -3px 6px #ffffff",
          }}
        >
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIdx(i)}
              className={`h-2.5 rounded-full transition-all flex-shrink-0 ${
                currentIdx === i
                  ? "bg-indigo-500 w-8 shadow-sm"
                  : selectedAnswers[i] !== undefined
                    ? "bg-slate-400 w-2.5"
                    : "bg-slate-200 w-2.5"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => {
            if (currentIdx < questions.length - 1) {
              setCurrentIdx(currentIdx + 1);
            } else {
              setShowFinishModal(true); // Triggers Modal instead of submit
            }
          }}
          className="px-8 py-3 text-sm font-black uppercase tracking-widest flex items-center gap-3 transition-transform active:scale-95 hover:-translate-y-1"
          style={clayButtonStyle}
        >
          {currentIdx === questions.length - 1
            ? "Submit Assessment"
            : "Next Question"}
          <FaChevronRight className="text-xs" />
        </button>
      </footer>
    </div>
  );
}
