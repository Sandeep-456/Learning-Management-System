import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/api";
import { data } from "react-router-dom";
import { useAuth } from "./AuthContext";

const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const { userProfile } = useAuth();
  const [dashboardData, setDashboardData] = useState({
    courseHierarchy: null,
    calendarSchedule: [],
    loading: true,
  });

  const fetchDashboard = async () => {
    try {
      const { data } = await api.get("/student/course-schedule");
      // console.log(data);
      setDashboardData({
        courseHierarchy: data.courseHierarchy,
        calendarSchedule: data.calendarSchedule,
        loading: false,
      });
    } catch (error) {
      console.error("Failed to load dashboard:", error);
      setDashboardData((prev) => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    // Only fetch if a user is actually logged in
    if (userProfile) {
      fetchDashboard();
    } else {
      // Clear data on logout so next login starts fresh
      setDashboardData({
        courseHierarchy: null,
        calendarSchedule: [],
        loading: true,
      });
    }
  }, [userProfile]);

  return (
    <CourseContext.Provider value={dashboardData}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => useContext(CourseContext);
