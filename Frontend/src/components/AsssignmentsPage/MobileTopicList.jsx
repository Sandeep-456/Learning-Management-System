import React from 'react';
import { FaLayerGroup } from 'react-icons/fa';
import { useCourse } from '../../context/CourseContext';

const MobileTopicList = ({ onTopicSelectForMobile }) => {
  const { courseHierarchy, loading } = useCourse();

  if (loading) {
    return (
      <div className="flex items-center justify-center p-6 text-slate-500">
        Loading topics...
      </div>
    );
  }

  if (!courseHierarchy || courseHierarchy.stages.length === 0) {
    return (
      <div className="flex items-center justify-center p-6 text-slate-500 text-center">
        No course content available.
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Select a Topic</h2>
      {courseHierarchy.stages.map((stage) => (
        <div key={stage._id} className="space-y-3">
          {stage.topics.map((topic) => {
            const firstAssessableSubtopic = topic.subtopics.find(sub => sub.sessions?.assessment);
            return (
              <button
                key={topic._id}
                onClick={() => firstAssessableSubtopic && onTopicSelectForMobile(firstAssessableSubtopic._id)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-white shadow-sm hover:bg-gray-50 transition-colors duration-200"
                disabled={!firstAssessableSubtopic}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                    <FaLayerGroup className="text-sm" />
                  </div>
                  <span className="font-semibold text-gray-700 text-left">{topic.name}</span>
                </div>
                {firstAssessableSubtopic && (
                  <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                    {topic.subtopics.filter(sub => sub.sessions?.assessment).length} Assessments
                  </span>
                )}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default MobileTopicList;
