import { useState, useEffect, useMemo } from "react";
import {
  FaChevronDown,
  FaChevronRight,
  FaRegFolderOpen,
  FaLayerGroup,
  FaClipboardList,
} from "react-icons/fa";
import { useCourse } from "../../context/CourseContext";

const topicPalette = {
  closed: "bg-white text-[#1A1C4B] hover:bg-[#F3F4F6]",
  open: "bg-[#1A1C4B] text-white",
  pill: "bg-white/90 text-[#1A1C4B]",
};

const subPalette = {
  closed: "bg-[#E6E9F5] text-[#1A1C4B] hover:bg-[#DDE2F2]",
  active: "bg-[#1A1C4B] text-white",
};

const AssignmentSidebar = ({ onSubtopicSelect, activeSubtopicId, isMobileView }) => {
  const { courseHierarchy, loading } = useCourse();
  const [expandedItems, setExpandedItems] = useState({});

  const toggleItem = (id) => {
    setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    if (activeSubtopicId && courseHierarchy && !loading) {
      const targetSubtopicId = activeSubtopicId;
      const newExpandedState = { ...expandedItems };
      let found = false;

      for (const stage of courseHierarchy.stages) {
        for (const topic of stage.topics) {
          const subtopicExists = topic.subtopics.find(
            (sub) => sub._id === targetSubtopicId,
          );

          if (subtopicExists) {
            newExpandedState[topic._id] = true;
            newExpandedState[targetSubtopicId] = true;
            found = true;
            break;
          }
        }
        if (found) break;
      }

      if (found) {
        setExpandedItems(newExpandedState);
      }
    }
  }, [activeSubtopicId, courseHierarchy, loading]);

  const stageMeta = useMemo(() => {
    if (!courseHierarchy) return [];

    return courseHierarchy.stages.map((stage) => {
      const assessmentCount = stage.topics.reduce((acc, topic) => {
        const count = topic.subtopics.filter(
          (sub) => sub.sessions?.assessment,
        ).length;
        return acc + count;
      }, 0);

      return {
        ...stage,
        assessmentCount,
      };
    });
  }, [courseHierarchy]);

  if (loading) {
    return (
      <div className="w-80 bg-white border-r border-slate-200 h-screen sticky top-0 flex flex-col items-center justify-center text-slate-500">
        Loading Course...
      </div>
    );
  }

  if (!courseHierarchy || courseHierarchy.stages.length === 0) {
    return (
      <div className="w-80 bg-white border-r border-slate-200 h-screen sticky top-0 flex flex-col items-center justify-center text-slate-500 p-4 text-center">
        <FaRegFolderOpen className="text-4xl mb-4" />
        No course content available.
      </div>
    );
  }

  return (
    <aside className={`h-screen sticky top-0 z-10 flex flex-col ${isMobileView ? "w-full p-4" : "w-80 my-4 ml-4"}`}>
      <div className="bg-gradient-to-br  rounded-[28px] border border-slate-200 shadow-[0_24px_60px_rgba(17,24,39,0.18)] overflow-hidden flex flex-col h-full">
        <div className="p-6 sticky top-0 z-20 bg-[#1A1C4B] border-b border-[#11142F]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">
                Assignments
              </h2>
              <p className="text-sm text-white mt-1 font-medium">
                Choose a module to begin
              </p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-white text-[#1A1C4B] flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.18)]">
              <FaClipboardList />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200 scrollbar-hide">
          <div className="p-4 space-y-6">
            {stageMeta.map((stage) => (
              <div key={stage._id} className="space-y-3">
                <div className="space-y-3">
                  {stage.topics.map((topic, index) => (
                    <TopicItem
                      key={topic._id}
                      topic={topic}
                      topicIndex={index}
                      expandedItems={expandedItems}
                      toggleItem={toggleItem}
                      onSubtopicSelect={onSubtopicSelect}
                      activeSubtopicId={activeSubtopicId}
                      isLast={index === stage.topics.length - 1}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

// --- LEVEL 1: TOPIC ITEM ---
const TopicItem = ({
  topic,
  expandedItems,
  toggleItem,
  onSubtopicSelect,
  activeSubtopicId,
  isLast,
  topicIndex,
}) => {
  const isOpen = expandedItems[topic._id];
  const palette = topicPalette;

  return (
    <div className={`relative ${isLast ? "" : "mb-4"}`}>
      <button
        onClick={() => toggleItem(topic._id)}
        className={`w-full flex items-center justify-between px-4 py-3.5 rounded-[26px] transition-all duration-200 border border-slate-200 shadow-[0_10px_20px_rgba(17,24,39,0.12)]
          ${isOpen ? palette.open : palette.closed}
        `}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-white text-slate-900 flex items-center justify-center ">
            <FaLayerGroup className="text-[12px]" />
          </div>
          <span className="font-black text-sm text-left">{topic.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`text-[10px] font-black px-2.5 py-1 rounded-xl ${palette.pill}`}
          >
            {topic.subtopics.filter((sub) => sub.sessions?.assessment).length}
          </span>
          {isOpen ?
            <FaChevronDown className="text-[10px] text-white" />
          : <FaChevronRight className="text-[10px] text-slate-500" />}
        </div>
      </button>

      {isOpen && (
        <div className="mt-3 ml-5 space-y-2 relative">
          {topic.subtopics.map((sub, subIndex) =>
            // Only render subtopics that have an assessment session
            sub.sessions?.assessment ?
              <SubtopicItem
                key={sub._id}
                sub={sub}
                subIndex={subIndex}
                onSubtopicSelect={onSubtopicSelect}
                activeSubtopicId={activeSubtopicId}
              />
            : null,
          )}
        </div>
      )}
    </div>
  );
};

// --- LEVEL 2: SUBTOPIC ITEM ---
const SubtopicItem = ({
  sub,
  onSubtopicSelect,
  activeSubtopicId,
  subIndex,
}) => {
  const isActive = activeSubtopicId === sub._id;
  const colorClass = subPalette.closed;

  return (
    <div className="relative">
      <button
        onClick={() => onSubtopicSelect(sub._id)}
        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-xs font-bold transition-all border border-slate-200 
          ${isActive ? subPalette.active : colorClass}
        `}
      >
        <span className="text-left">{sub.name}</span>
      </button>
    </div>
  );
};

export default AssignmentSidebar;
