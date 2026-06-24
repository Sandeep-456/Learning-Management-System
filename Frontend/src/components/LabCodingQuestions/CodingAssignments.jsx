import React, { useState, useEffect } from "react";
import {
  FaSpinner,
  FaLaptopCode,
  FaRegFolderOpen,
  FaLayerGroup,
} from "react-icons/fa";
import api from "../../utils/api";
import CodingLevelCard from "./CodingLevelCard";
import CodingQuestionWorkspace from "./CodingQuestionWorkspace";

const CodingAssignments = ({ session }) => {
  const [loading, setLoading] = useState(true);
  const [codingSets, setCodingSets] = useState([]);
  const [activeSet, setActiveSet] = useState(null);
  const [loadingSet, setLoadingSet] = useState(false);

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchSets = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(
          `/coding/subtopic/${session.subtopicId}`,
        );
        setCodingSets(data);
      } catch (error) {
        console.error("Failed to load coding sets", error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.subtopicId) fetchSets();
  }, [session]);

  // --- HANDLE OPEN SET ---
  const handleOpenSet = async (setId) => {
    try {
      setLoadingSet(true);
      const { data } = await api.get(`/coding/${setId}`);
      setActiveSet(data);
    } catch (error) {
      alert("Failed to load questions.");
    } finally {
      setLoadingSet(false);
    }
  };

  // --- STYLE OBJECTS (For accurate Claymorphism) ---
  const clayContainerStyle = {
    backgroundColor: "#F2F5F9", // Matte Base
    borderRadius: "40px",
    // 1. Tighter Outer Shadow (Float)
    // 2. Strong Inner Highlight (Volume Top-Left)
    // 3. Soft Inner Shadow (Volume Bottom-Right)
    boxShadow: `
      12px 12px 24px rgba(163, 177, 198, 0.6), 
      -12px -12px 24px rgba(255, 255, 255, 1), 
      inset 6px 6px 10px rgba(255, 255, 255, 0.8), 
      inset -6px -6px 10px rgba(163, 177, 198, 0.15)
    `,
    border: "1px solid rgba(255,255,255,0.4)",
  };

  const clayIconStyle = {
    background: "linear-gradient(145deg, #6366f1, #4f46e5)",
    boxShadow: `
      6px 6px 12px rgba(99, 102, 241, 0.4), 
      -6px -6px 12px rgba(255, 255, 255, 0.8),
      inset 2px 2px 4px rgba(255, 255, 255, 0.5)
    `,
  };

  const clayInsetWell = {
    backgroundColor: "#EBF0F6",
    borderRadius: "30px",
    // Deep pressed look for empty/loading states
    boxShadow: `
      inset 8px 8px 16px rgba(163, 177, 198, 0.5), 
      inset -8px -8px 16px rgba(255, 255, 255, 0.8)
    `,
  };

  // --- RENDER: LOADING ---
  if (loading || loadingSet) {
    return (
      <div className="flex h-[450px] items-center justify-center p-8">
        <div
          className="w-full h-full flex flex-col items-center justify-center"
          style={clayInsetWell}
        >
          <div className="relative">
            {/* Puffy Spinner Background */}
            <div className="w-20 h-20 rounded-full bg-[#F2F5F9] shadow-[8px_8px_16px_rgba(163,177,198,0.4),-8px_-8px_16px_rgba(255,255,255,1)] flex items-center justify-center">
              <FaSpinner className="text-3xl text-indigo-500 animate-spin" />
            </div>
          </div>
          <p className="mt-6 text-slate-400 font-bold tracking-widest text-xs uppercase animate-pulse">
            Loading Challenges...
          </p>
        </div>
      </div>
    );
  }

  // --- RENDER: ACTIVE WORKSPACE ---
  if (activeSet) {
    return (
      <CodingQuestionWorkspace
        set={activeSet}
        onBack={() => setActiveSet(null)}
      />
    );
  }

  // --- RENDER: DASHBOARD ---
  return (
    <div className="font-sans py-4">
      {/* MAIN CLAY CONTAINER */}
      <div className="p-10 md:p-12" style={clayContainerStyle}>
        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-12">
          {/* 3D Floating Icon */}
          <div
            className="w-20 h-20 rounded-[24px] flex items-center justify-center text-white transform rotate-[-3deg] transition-transform hover:rotate-0 duration-500"
            style={clayIconStyle}
          >
            <FaLaptopCode className="text-3xl drop-shadow-md" />
          </div>

          <div>
            <div className="flex items-center gap-3 mb-1">
              <span className="h-3 w-3 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.6)] animate-pulse"></span>
              <p className="text-xs font-black text-indigo-400 uppercase tracking-[0.2em]">
                Practice Arena
              </p>
            </div>
            <h2 className="text-4xl font-black text-slate-700 tracking-tight">
              Coding Assignments
            </h2>
            <p className="text-slate-500 font-medium mt-2 max-w-lg leading-relaxed">
              Select a difficulty tier below to access the problem statements
              and start coding.
            </p>
          </div>
        </div>

        {/* CONTENT AREA */}
        {codingSets.length === 0 ? (
          // EMPTY STATE (Pressed In)
          <div
            className="flex flex-col items-center justify-center py-24 text-center"
            style={clayInsetWell}
          >
            <div className="w-24 h-24 bg-[#F2F5F9] rounded-full flex items-center justify-center mb-6 shadow-[8px_8px_16px_rgba(163,177,198,0.3),-8px_-8px_16px_rgba(255,255,255,1)]">
              <FaRegFolderOpen className="text-4xl text-slate-300" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-600">
              No Assignments Found
            </h3>
            <p className="text-slate-400 font-medium text-sm mt-2">
              We are currently curating new problems for this topic.
            </p>
          </div>
        ) : (
          // GRID (Cards float above the clay container)
          <div className="grid grid-cols-1  xl:grid-cols-2 gap-8">
            {codingSets.map((set) => (
              <div key={set._id} className="h-full">
                <CodingLevelCard
                  set={set}
                  onClick={() => handleOpenSet(set._id)}
                />
              </div>
            ))}
          </div>
        )}

        {/* DECORATIVE FOOTER ELEMENT */}
        <div className="mt-12 flex items-center justify-center gap-2 opacity-30">
          <FaLayerGroup className="text-slate-400" />
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            RUNE Coding Environment
          </span>
        </div>
      </div>
    </div>
  );
};

export default CodingAssignments;
