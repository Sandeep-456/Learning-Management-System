import React, { useRef, useState, useEffect } from "react";
import { HiChevronDown } from "react-icons/hi";
import {
  FaUser,
  FaIdCard,
  FaPhone,
  FaUserFriends,
  FaMapMarkerAlt,
  FaStar,
  FaLayerGroup,
  FaGraduationCap,
  FaUniversity,
  FaSchool,
  FaCertificate,
  FaBriefcase,
  FaBuilding,
  FaUpload,
  FaCamera,
  FaTimes,
} from "react-icons/fa";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import ClayDropdown from "../components/Profile/ClayDropdown";

export default function ProfilePage() {
  const { userProfile, fetchUserProfile } = useAuth();
  const [editableProfile, setEditableProfile] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  // REFERENCES FOR RIGHT SCROLL SECTIONS (BASIC GROUP)
  const profileRef = useRef(null);
  const contactRef = useRef(null);
  const parentRef = useRef(null);
  const addressRef = useRef(null);
  const expertiseRef = useRef(null);
  const preferenceRef = useRef(null);

  // EDUCATION INNER BLOCKS
  const educationMainRef = useRef(null);
  const highestRef = useRef(null);
  const tenthRef = useRef(null);
  const interRef = useRef(null);
  const degreeRef = useRef(null);

  // WORK
  const workRef = useRef(null);

  // WHICH MAIN GROUP IS VISIBLE ON THE RIGHT
  const [activeSection, setActiveSection] = useState("basic"); // "basic" | "education" | "work"

  // WHICH SUB-ITEM IS ACTIVE IN LEFT CARD
  const [activeTab, setActiveTab] = useState("profile"); // "highest" | "tenth" | "inter" | "degree"

  // WHICH LEFT CARD IS OPEN
  const [openSection, setOpenSection] = useState("basic"); // "basic" | "education" | "work"

  useEffect(() => {
    if (userProfile) {
      setEditableProfile(userProfile);
    }
  }, [userProfile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableProfile({ ...editableProfile, [name]: value });
  };

  const handleSave = async () => {
    try {
      // console.log(editableProfile);
      await api.put("/auth/profile", editableProfile);
      await fetchUserProfile(); // Refresh data in context
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  const profile = editableProfile;

  // Helper to switch main section + scroll to ref
  const goTo = (sectionKey, ref) => {
    setActiveSection(sectionKey);
    // allow React to render new section first
    setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  // console.log("User Profile:", userProfile);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  const ClayRadio = ({ label, name, value, checked, onChange, disabled }) => {
    return (
      <label
        className={`flex items-center gap-4 cursor-pointer group ${disabled ? "opacity-60 pointer-events-none" : ""}`}
      >
        {/* Hidden Native Input */}
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="hidden"
        />

        {/* Custom 3D Indicator */}
        <div
          className="w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            // If checked: It pops OUT (Float). If unchecked: It is pressed IN (Well).
            backgroundColor: checked ? "#3b82f6" : "#E2E8F0",
            boxShadow:
              checked ?
                "4px 4px 8px #cedbe7, -4px -4px 8px #ffffff" // Pop out
              : "inset 3px 3px 6px #cbd5e1, inset -3px -3px 6px #ffffff", // Pressed in
            border: checked ? "2px solid #ffffff" : "1px solid #e3e3e3",
          }}
        >
          {/* The inner dot (only shows when checked) */}
          <div
            className={`w-2.5 h-2.5 rounded-full bg-white transition-transform duration-300 ${checked ? "scale-100" : "scale-0"}`}
            style={{ boxShadow: "1px 1px 2px rgba(0,0,0,0.2)" }}
          />
        </div>

        {/* Label Text */}
        <span
          className={`font-bold text-sm transition-colors ${checked ? "text-blue-600" : "text-slate-500 group-hover:text-blue-500"}`}
        >
          {label}
        </span>
      </label>
    );
  };

  // --- HELPER: CLAY CHECKBOX ---
  const ClayCheckbox = ({ label, checked, onChange, disabled }) => (
    <label
      className={`flex items-center gap-4 cursor-pointer group ${disabled ? "opacity-60 pointer-events-none" : ""}`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="hidden"
      />
      <div
        className="w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-300"
        style={{
          backgroundColor: checked ? "#3b82f6" : "#E2E8F0",
          boxShadow:
            checked ?
              "4px 4px 8px #cedbe7, -4px -4px 8px #ffffff"
            : "inset 3px 3px 6px #cbd5e1, inset -3px -3px 6px #ffffff",
        }}
      >
        <svg
          className={`w-3.5 h-3.5 text-white transition-transform duration-200 ${checked ? "scale-100" : "scale-0"}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      <span
        className={`font-bold text-sm transition-colors ${checked ? "text-blue-600" : "text-slate-500 group-hover:text-blue-500"}`}
      >
        {label}
      </span>
    </label>
  );

  // 1. Main Card: White bg with strong outer shadows for "floating" effect
  const clayCardStyle = {
    backgroundColor: "#FFFFFF",
    borderRadius: "24px",
    // 1. Bottom-Right: Deep, heavy gray for strong lift (#d1d5db)
    // 2. Top-Left: Light Cool Gray (#eef2f6) instead of White (To be visible on white bg)
    // 3. Inset Highlight: Creates the "puffy" top-left curve
    // 4. Inset Shadow: Creates the bottom-right curvature
    boxShadow: `
      16px 16px 40px #d1d5db, 
      -12px -12px 40px #eef2f6, 
      inset 5px 5px 10px rgba(255, 255, 255, 1),
      inset -5px -5px 10px rgba(0, 0, 0, 0.02)
    `,
    // A faint border ensures the edge is crisp against the white background
    border: "1px solid #f3f4f6",
  };

  // 2. Input Fields (Inset Wells)
  const clayInputStyle = {
    backgroundColor: "#F0F4F8",
    borderRadius: "16px",
    // Inset shadow creates the "sunken" look
    boxShadow: "inset 6px 6px 10px #cedbe7, inset -6px -6px 10px #ffffff",
    border: "1px solid rgba(255,255,255,0.6)",
    transition: "all 0.2s ease-in-out",
  };

  // 3. Buttons (3D Pop-out)
  // --- HELPER: 3D CLAY BUTTON STYLE ---
  const clayButtonStyle = (color) => {
    const isGreen = color === "green";

    return {
      // Gradient Backgrounds
      background:
        isGreen ?
          "linear-gradient(145deg, #22c55e, #16a34a)" // Green (Save)
        : "linear-gradient(145deg, #3b82f6, #2563eb)", // Blue (Edit)

      color: "white",
      borderRadius: "16px",
      border: "none",

      // --- THE 4-SIDED 3D DEPTH ---
      boxShadow: `
      8px 8px 16px #cedbe7,             /* 1. Outer Shadow (Lift) */
      -8px -8px 16px #ffffff,           /* 2. Outer Highlight (Lift) */
      inset 4px 4px 8px rgba(255, 255, 255, 0.4),  /* 3. Inner Top-Left (Gloss) */
      inset -4px -4px 8px rgba(0, 0, 0, 0.2)       /* 4. Inner Bottom-Right (Depth) */
    `,

      transition: "transform 0.1s ease, box-shadow 0.1s ease",
    };
  };

  // 2. Button Hover/Active: "Pressed" effect (Inner Shadow)
  const clayPressedStyle =
    "shadow-[inset_4px_4px_8px_#dcfce7,inset_-4px_-4px_8px_#ffffff] bg-green-50 text-green-700";
  const clayHoverStyle =
    "hover:bg-gray-50 hover:shadow-[6px_6px_12px_#f3f4f6,-6px_-6px_12px_#ffffff] transition-all transform hover:-translate-y-0.5";

  // Helper component for buttons to keep code clean
  const SidebarBtn = ({ onClick, label, icon, isActive }) => (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
        isActive ? clayPressedStyle : `text-gray-600 ${clayHoverStyle}`
      }`}
    >
      <span
        className={`text-lg ${isActive ? "text-green-600" : "text-gray-400"}`}
      >
        {icon}
      </span>
      {label}
    </button>
  );
  return (
    <div className="flex w-full py-6 md:pl-8 gap-8 bg-transparent">
      {/* ---------------- LEFT SIDE CARDS (ACCORDION STYLE) ---------------- */}
      <div className="w-80 hidden lg:block space-y-8 sticky top-6 h-max px-2 py-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        {/* --- BASIC DETAILS CARD --- */}
        <div style={clayCardStyle} className="p-6 transition-all duration-300">
          <div
            className="flex items-center justify-between cursor-pointer group"
            onClick={() =>
              setOpenSection(openSection === "basic" ? "" : "basic")
            }
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-3 rounded-full shadow-inner ${openSection === "basic" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"}`}
              >
                <FaUser className="text-lg" />
              </div>
              <p className="font-bold text-gray-800 text-lg">Basic Details</p>
            </div>
            <div
              className={`p-2 rounded-full shadow-sm transition-all duration-300 ${openSection === "basic" ? "bg-green-50 rotate-180 text-green-600" : "bg-white text-gray-400"}`}
            >
              <HiChevronDown className="text-xl" />
            </div>
          </div>

          {openSection === "basic" && (
            <div className="mt-6 space-y-2 animate-fadeIn">
              <SidebarBtn
                onClick={() => {
                  setActiveTab("profile");
                  goTo("basic", profileRef);
                }}
                label="Profile"
                icon={<FaIdCard />}
                isActive={activeTab === "profile"}
              />
              <SidebarBtn
                onClick={() => {
                  setActiveTab("contact");
                  goTo("basic", contactRef);
                }}
                label="Contact Details"
                icon={<FaPhone />}
                isActive={activeTab === "contact"}
              />
              <SidebarBtn
                onClick={() => {
                  setActiveTab("parent");
                  goTo("basic", parentRef);
                }}
                label="Parent / Guardian"
                icon={<FaUserFriends />}
                isActive={activeTab === "parent"}
              />
              <SidebarBtn
                onClick={() => {
                  setActiveTab("address");
                  goTo("basic", addressRef);
                }}
                label="Current Address"
                icon={<FaMapMarkerAlt />}
                isActive={activeTab === "address"}
              />
              <SidebarBtn
                onClick={() => {
                  setActiveTab("expertise");
                  goTo("basic", expertiseRef);
                }}
                label="Current Expertise"
                icon={<FaStar />}
                isActive={activeTab === "expertise"}
              />
              <SidebarBtn
                onClick={() => {
                  setActiveTab("preference");
                  goTo("basic", preferenceRef);
                }}
                label="Your Preference"
                icon={<FaLayerGroup />}
                isActive={activeTab === "preference"}
              />
            </div>
          )}
        </div>

        {/* --- EDUCATION CARD --- */}
        <div style={clayCardStyle} className="p-6 transition-all duration-300">
          <div
            className="flex items-center justify-between cursor-pointer group"
            onClick={() =>
              setOpenSection(openSection === "education" ? "" : "education")
            }
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-3 rounded-full shadow-inner ${openSection === "education" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"}`}
              >
                <FaGraduationCap className="text-lg" />
              </div>
              <p className="font-bold text-gray-800 text-lg">Education</p>
            </div>
            <div
              className={`p-2 rounded-full shadow-sm transition-all duration-300 ${openSection === "education" ? "bg-green-50 rotate-180 text-green-600" : "bg-white text-gray-400"}`}
            >
              <HiChevronDown className="text-xl" />
            </div>
          </div>

          {openSection === "education" && (
            <div className="mt-6 space-y-2 animate-fadeIn">
              <SidebarBtn
                onClick={() => {
                  setActiveTab("highest");
                  goTo("education", highestRef);
                }}
                label="Highest Education"
                icon={<FaUniversity />}
                isActive={activeTab === "highest"}
              />
              <SidebarBtn
                onClick={() => {
                  setActiveTab("tenth");
                  goTo("education", tenthRef);
                }}
                label="10th Standard"
                icon={<FaSchool />}
                isActive={activeTab === "tenth"}
              />
              <SidebarBtn
                onClick={() => {
                  setActiveTab("inter");
                  goTo("education", interRef);
                }}
                label="Inter / Diploma"
                icon={<FaCertificate />}
                isActive={activeTab === "inter"}
              />
              <SidebarBtn
                onClick={() => {
                  setActiveTab("degree");
                  goTo("education", degreeRef);
                }}
                label="Bachelor's Degree"
                icon={<FaGraduationCap />}
                isActive={activeTab === "degree"}
              />
            </div>
          )}
        </div>

        {/* --- WORK EXPERIENCE CARD --- */}
        <div style={clayCardStyle} className="p-6 transition-all duration-300">
          <div
            className="flex items-center justify-between cursor-pointer group"
            onClick={() => setOpenSection(openSection === "work" ? "" : "work")}
          >
            <div className="flex items-center gap-3">
              <div
                className={`p-3 rounded-full shadow-inner ${openSection === "work" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-500"}`}
              >
                <FaBriefcase className="text-lg" />
              </div>
              <p className="font-bold text-gray-800 text-lg">Work Exp.</p>
            </div>
            <div
              className={`p-2 rounded-full shadow-sm transition-all duration-300 ${openSection === "work" ? "bg-green-50 rotate-180 text-green-600" : "bg-white text-gray-400"}`}
            >
              <HiChevronDown className="text-xl" />
            </div>
          </div>

          {openSection === "work" && (
            <div className="mt-6 space-y-2 animate-fadeIn">
              <SidebarBtn
                onClick={() => {
                  setActiveTab("work");
                  goTo("work", workRef);
                }}
                label="Work Details"
                icon={<FaBuilding />}
                isActive={activeTab === "work"}
              />
            </div>
          )}
        </div>
      </div>

      {/* ---------------- RIGHT SIDE (SCROLLABLE) ---------------- */}
      <div className="flex-1 h-[calc(100vh-60px)] overflow-y-auto space-y-10 bg-transparent [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        {/* ========== BASIC DETAILS GROUP ========== */}

        <div
          className={`${activeSection === "basic" ? "block" : "block lg:hidden"} px-6 lg:px-10`}
        >
          {/* ------------------ PROFILE CARD ------------------ */}
          <section
            id="profile"
            ref={profileRef}
            className="p-10 space-y-10"
            style={clayCardStyle}
          >
            {/* HEADER */}
            <div className="flex justify-between items-center border-b border-slate-100 pb-6">
              <div>
                <h2 className="text-3xl font-black text-slate-800 tracking-tight">
                  Profile
                </h2>
                <p className="text-slate-400 text-sm mt-1 font-medium">
                  Information used for certificates & verification.
                </p>
              </div>
              <div>
                {isEditing ?
                  <button
                    onClick={handleSave}
                    // Added hover:-translate-y-1 to make it float up when hovered
                    className="px-8 py-3 font-bold uppercase tracking-wider text-xs transition-transform transform hover:-translate-y-1 active:translate-y-0 active:scale-95"
                    style={clayButtonStyle("green")}
                  >
                    Save Changes
                  </button>
                : <button
                    onClick={() => setIsEditing(true)}
                    // Added hover:-translate-y-1 to make it float up when hovered
                    className="px-8 py-3 font-bold uppercase tracking-wider text-xs transition-transform transform hover:-translate-y-1 active:translate-y-0 active:scale-95"
                    style={clayButtonStyle("blue")}
                  >
                    Edit Profile
                  </button>
                }
              </div>
            </div>

            {/* PHOTO UPLOAD */}
            <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
              {/* Photo Placeholder (Sunken Clay) */}
              <div
                className="w-48 h-48 rounded-[24px] flex items-center justify-center bg-slate-100"
                style={{
                  boxShadow:
                    "inset 8px 8px 16px #cedbe7, inset -8px -8px 16px #ffffff",
                }}
              >
                <span className="text-4xl text-slate-300">📷</span>
              </div>

              <div className="flex flex-col gap-4 pt-4">
                <label className="cursor-pointer flex items-center gap-3 px-6 py-3 rounded-xl bg-white text-blue-600 font-bold text-sm shadow-[6px_6px_12px_#cedbe7,-6px_-6px_12px_#ffffff] hover:scale-105 transition-transform">
                  <FaUpload /> Upload Photo
                  <input type="file" className="hidden" />
                </label>

                <button className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white text-slate-600 font-bold text-sm shadow-[6px_6px_12px_#cedbe7,-6px_-6px_12px_#ffffff] hover:scale-105 transition-transform">
                  <FaCamera /> Take Selfie
                </button>

                <button className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white text-red-500 font-bold text-sm shadow-[6px_6px_12px_#cedbe7,-6px_-6px_12px_#ffffff] hover:scale-105 transition-transform">
                  <FaTimes /> Remove
                </button>
              </div>
            </div>

            {/* --- FORM FIELDS --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Course (Disabled) */}
              <div>
                <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-3 ml-1">
                  Course
                </label>
                <input
                  className="w-full p-4 text-slate-600 font-semibold focus:outline-none"
                  style={clayInputStyle}
                  value={profile.course || ""}
                  disabled
                />
              </div>

              {/* Course Type (Disabled) */}
              <div>
                <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-3 ml-1">
                  Course Type
                </label>
                <input
                  className="w-full p-4 text-slate-600 font-semibold focus:outline-none"
                  style={clayInputStyle}
                  value={profile.courseType || ""}
                  disabled
                />
              </div>

              {/* Username */}
              <div>
                <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-3 ml-1">
                  Username
                </label>
                <input
                  name="username"
                  value={profile.user?.username || ""}
                  disabled
                  className="w-full p-4 text-slate-600 font-semibold focus:outline-none"
                  style={clayInputStyle}
                />
              </div>

              {/* First Name */}
              <div>
                <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-3 ml-1">
                  First Name
                </label>
                <input
                  name="firstName"
                  value={profile.firstName || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-4 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 transition-shadow"
                  style={clayInputStyle}
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-3 ml-1">
                  Surname / Last Name
                </label>
                <input
                  name="lastName"
                  value={profile.lastName || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-4 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 transition-shadow"
                  style={clayInputStyle}
                />
              </div>

              {/* Certificate Name */}
              <div className="md:col-span-2">
                <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-3 ml-1">
                  Name on Certificate (Govt ID)
                </label>
                <input
                  name="certificateName"
                  value={profile.certificateName || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-4 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 transition-shadow"
                  style={clayInputStyle}
                />
              </div>
            </div>

            {/* --- RADIO & CHECKBOX SECTIONS --- */}

            {/* Gender */}
            <div>
              <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-4 ml-1">
                Gender
              </label>
              <div className="flex flex-wrap gap-6">
                {["Male", "Female", "Transgender"].map((g) => (
                  <ClayRadio
                    key={g}
                    label={g}
                    name="gender"
                    value={g}
                    checked={profile.gender === g}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                ))}
              </div>
            </div>

            {/* Teaching Language */}
            <div className="mt-6">
              <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-4 ml-1">
                Teaching Language
              </label>
              <div className="flex flex-wrap gap-6">
                {["Telugu", "English", "Hindi"].map((lang) => (
                  <ClayRadio
                    key={lang}
                    label={lang}
                    name="teachingLanguage"
                    value={lang}
                    checked={profile.teachingLanguage === lang}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                ))}
              </div>
            </div>

            {/* For Checkboxes, you can use similar logic but change type="checkbox" */}
            <div className="mt-6">
              <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-4 ml-1">
                Communication Language
              </label>
              <div className="flex flex-wrap gap-6">
                {["Telugu", "English", "Hindi"].map((lang) => {
                  const isChecked =
                    profile.preferredLanguage?.includes(lang) || false;
                  return (
                    <label
                      key={lang}
                      className={`flex items-center gap-4 cursor-pointer group ${!isEditing ? "opacity-60 pointer-events-none" : ""}`}
                    >
                      <input
                        type="checkbox"
                        name="preferredLanguage"
                        value={lang}
                        checked={isChecked}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="hidden"
                      />
                      {/* Square styling for Checkbox */}
                      <div
                        className="w-6 h-6 rounded-lg flex items-center justify-center transition-all duration-300  border border-[#e3e3e3]"
                        style={{
                          backgroundColor: isChecked ? "#3b82f6" : "#E2E8F0",
                          boxShadow:
                            isChecked ?
                              "4px 4px 8px #cedbe7, -4px -4px 8px #ffffff"
                            : "inset 3px 3px 6px #cbd5e1, inset -3px -3px 6px #ffffff",
                        }}
                      >
                        {/* Checkmark Icon */}
                        <svg
                          className={`w-3.5 h-3.5 text-white transition-transform duration-200 ${isChecked ? "scale-100" : "scale-0"}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <span
                        className={`font-bold text-sm transition-colors ${isChecked ? "text-blue-600" : "text-slate-500 group-hover:text-blue-500"}`}
                      >
                        {lang}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* DOB */}
            <div>
              <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-3 ml-1">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={profile.dob || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full md:w-1/2 p-4 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 transition-shadow"
                style={clayInputStyle}
              />
            </div>

            {/* SOCIAL LINKS */}
            <div className="space-y-6">
              <div>
                <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-3 ml-1">
                  GitHub Link
                </label>
                <input
                  type="url"
                  name="github"
                  value={profile.github || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="github.com/username"
                  className="w-full p-4 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 transition-shadow"
                  style={clayInputStyle}
                />
              </div>
              <div>
                <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-3 ml-1">
                  LinkedIn Profile
                </label>
                <input
                  type="url"
                  name="linkedin"
                  value={profile.linkedin || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="linkedin.com/in/username"
                  className="w-full p-4 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 transition-shadow"
                  style={clayInputStyle}
                />
              </div>
              <div>
                <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-3 ml-1">
                  CodeChef Link
                </label>
                <input
                  type="url"
                  name="codechef"
                  value={profile.codechef || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="codechef.com/users/username"
                  className="w-full p-4 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 transition-shadow"
                  style={clayInputStyle}
                />
              </div>
            </div>

            {/* RESUME UPLOAD */}
            <div>
              <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-4 ml-1">
                Resume
              </label>
              <div
                className={`rounded-2xl p-10 flex flex-col items-center justify-center text-center transition-all ${!isEditing ? "opacity-60 grayscale cursor-not-allowed" : "cursor-pointer hover:bg-slate-50"}`}
                style={{
                  backgroundColor: "#F8FAFC",
                  border: "2px dashed #CBD5E1",
                  boxShadow:
                    "inset 4px 4px 8px #e2e8f0, inset -4px -4px 8px #ffffff",
                }}
              >
                <div className="text-5xl mb-4">📄</div>
                <label className="text-blue-600 font-bold cursor-pointer">
                  Click to Upload Resume
                  <input
                    type="file"
                    className="hidden"
                    disabled={!isEditing}
                    onChange={handleInputChange}
                  />
                </label>
                <p className="text-slate-400 text-xs mt-2 font-medium">
                  PDF, DOC, DOCX (Max: 10MB)
                </p>
              </div>
            </div>
          </section>

          {/* ------------------ CONTACT DETAILS ------------------ */}
          <section
            ref={contactRef}
            className="p-10 space-y-8 mt-10"
            style={clayCardStyle}
          >
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">
                Contact Details
              </h2>
              <p className="text-slate-400 text-sm mt-1 font-medium">
                We will use these details to send important program updates.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* Registered Phone Number */}
              <div>
                <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-3 ml-1">
                  Registered Phone Number
                </label>
                <div className="flex gap-4">
                  <div
                    className="w-21 p-4 rounded-2xl font-bold text-slate-500 bg-[#F0F4F8]"
                    style={{
                      boxShadow:
                        "inset 4px 4px 8px #cedbe7, inset -4px -4px 8px #ffffff",
                    }}
                  >
                    IN 🇮🇳
                  </div>
                  <input
                    type="tel"
                    className="w-full p-4 text-slate-600 font-semibold focus:outline-none"
                    style={clayInputStyle}
                    value={profile.user?.mobile || ""}
                    disabled
                  />
                </div>
              </div>

              {/* WhatsApp same as Phone */}
              <div>
                <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-4 ml-1">
                  Is this your WhatsApp number?
                </label>
                <div className="flex items-center gap-8 h-14">
                  <ClayRadio
                    label="Yes"
                    checked={profile.whatsappSameAsPhone === true}
                    onChange={() =>
                      setEditableProfile({
                        ...editableProfile,
                        whatsappSameAsPhone: true,
                      })
                    }
                    disabled={!isEditing}
                  />
                  <ClayRadio
                    label="No"
                    checked={profile.whatsappSameAsPhone === false}
                    onChange={() =>
                      setEditableProfile({
                        ...profile,
                        whatsappSameAsPhone: false,
                      })
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ------------------ EMAIL & UPDATES ------------------ */}
          <section className="p-10 space-y-8 mt-10" style={clayCardStyle}>
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">
                Email & Updates
              </h2>
            </div>

            <div>
              <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-3 ml-1">
                Email ID
              </label>
              <input
                type="email"
                name="email"
                value={profile.email || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-4 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 transition-shadow"
                style={clayInputStyle}
                placeholder="example@gmail.com"
              />
            </div>

            <div className="pt-2">
              <ClayCheckbox
                label="I would like to receive updates on WhatsApp."
                checked={profile.updatesOnWhatsapp}
                onChange={(e) =>
                  setEditableProfile({
                    ...profile,
                    updatesOnWhatsapp: e.target.checked,
                  })
                }
                disabled={!isEditing}
              />
            </div>
          </section>

          {/* ------------------ PARENT DETAILS ------------------ */}
          <section
            ref={parentRef}
            className="p-10 space-y-8 mt-10"
            style={clayCardStyle}
          >
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">
                Parent / Guardian
              </h2>
              <p className="text-slate-400 text-sm mt-1 font-medium">
                The person who supports your journey (Father, Mother, etc.)
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-3 ml-1">
                  First Name
                </label>
                <input
                  name="parentFirstName"
                  value={profile.parentFirstName || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-4 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 transition-shadow"
                  style={clayInputStyle}
                />
              </div>

              <div>
                <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-3 ml-1">
                  Last Name
                </label>
                <input
                  name="parentLastName"
                  value={profile.parentLastName || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-4 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 transition-shadow"
                  style={clayInputStyle}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-3 ml-1">
                  Relation with student
                </label>
                <select
                  name="parentRelation"
                  value={profile.parentRelation || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-4 text-slate-800 font-medium focus:outline-none bg-transparent appearance-none"
                  style={clayInputStyle}
                >
                  <option value="" disabled>
                    Select Relation
                  </option>
                  <option>Father</option>
                  <option>Mother</option>
                  <option>Guardian</option>
                </select>
              </div>
            </div>
          </section>

          {/* ------------------ CURRENT ADDRESS ------------------ */}
          <section
            ref={addressRef}
            className="p-10 space-y-8 mt-10"
            style={clayCardStyle}
          >
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">
                Current Address
              </h2>
              <p className="text-slate-400 text-sm mt-1 font-medium">
                Shared with companies for offer letters.
              </p>
            </div>

            <div className="space-y-6">
              {/* Address Lines */}
              <div>
                <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-3 ml-1">
                  Address Line 1
                </label>
                <input
                  name="address1"
                  value={profile.address1 || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-4 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 transition-shadow"
                  style={clayInputStyle}
                />
              </div>

              <div>
                <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-3 ml-1">
                  Address Line 2
                </label>
                <input
                  name="address2"
                  value={profile.address2 || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-4 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 transition-shadow"
                  style={clayInputStyle}
                />
              </div>

              {/* Country & Pin */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-3 ml-1">
                    Country
                  </label>
                  <select
                    name="country"
                    value={profile.country || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full p-4 text-slate-800 font-medium focus:outline-none bg-transparent appearance-none"
                    style={clayInputStyle}
                  >
                    <option>India</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-3 ml-1">
                    Postal / Pin Code
                  </label>
                  <input
                    name="postalCode"
                    value={profile.postalCode || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full p-4 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 transition-shadow"
                    style={clayInputStyle}
                  />
                </div>
              </div>

              {/* State & District Grid */}
              {/* 'relative z-20' ensures this grid sits above the 'Address' fields if they overlap */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-20">
                {/* State Dropdown */}
                <ClayDropdown
                  label="State"
                  name="state"
                  value={profile.state}
                  disabled={!isEditing}
                  placeholder="Select State"
                  options={["Telangana", "Andhra Pradesh"]}
                  onChange={handleInputChange}
                />

                {/* District Dropdown */}
                <ClayDropdown
                  label="District"
                  name="district"
                  value={profile.district}
                  disabled={!isEditing || !profile.state}
                  placeholder="Select District"
                  options={
                    profile.state === "Telangana" ?
                      [
                        "Hyderabad",
                        "Ranga Reddy",
                        "Medchal-Malkajgiri",
                        "Warangal",
                        "Karimnagar",
                      ]
                    : profile.state === "Andhra Pradesh" ?
                      [
                        "Visakhapatnam",
                        "Krishna",
                        "Guntur",
                        "Chittoor",
                        "Nellore",
                      ]
                    : []
                  }
                  onChange={handleInputChange}
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-3 ml-1">
                  City / Town
                </label>
                <input
                  name="city"
                  value={profile.city || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-4 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 transition-shadow"
                  style={clayInputStyle}
                />
              </div>
            </div>
          </section>

          {/* ------------------ CURRENT EXPERTISE ------------------ */}
          <section
            ref={expertiseRef}
            className="p-10 space-y-8 mt-10"
            style={clayCardStyle}
          >
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">
                Current Expertise
              </h2>
              <p className="text-slate-400 text-sm mt-1 font-medium">
                Provide details to help us mentor you better.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-3 ml-1">
                  Current Coding Level
                </label>
                <select
                  name="codingLevel"
                  value={profile.codingLevel || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-4 text-slate-800 font-medium focus:outline-none bg-transparent appearance-none"
                  style={clayInputStyle}
                >
                  <option value="" disabled>
                    Select Level
                  </option>
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-4 ml-1">
                  Do you have a Laptop?
                </label>
                <div className="flex items-center gap-8 h-14">
                  <ClayRadio
                    label="Yes"
                    checked={profile.hasLaptop === true}
                    onChange={() =>
                      setEditableProfile({ ...profile, hasLaptop: true })
                    }
                    disabled={!isEditing}
                  />
                  <ClayRadio
                    label="No"
                    checked={profile.hasLaptop === false}
                    onChange={() =>
                      setEditableProfile({ ...profile, hasLaptop: false })
                    }
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>

            {/* Technical Skills */}
            <div>
              <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-3 ml-1">
                Technical Skills
              </label>
              <input
                type="text"
                name="technicalSkills"
                value={profile.technicalSkills || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="e.g. React, Node.js, Python"
                className="w-full p-4 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 transition-shadow"
                style={clayInputStyle}
              />

              <div className="flex flex-wrap gap-3 mt-4">
                {profile.technicalSkillsTags?.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-xl bg-blue-50 text-blue-600 font-bold text-xs flex items-center gap-2 shadow-sm border border-blue-100"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center hover:bg-blue-200 text-blue-700 transition-colors"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* ------------------ PREFERENCES ------------------ */}
          <section
            ref={preferenceRef}
            className="p-10 space-y-8 mt-10 mb-20"
            style={clayCardStyle}
          >
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">
                Your Preference
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-3 ml-1">
                  Active Job Search?
                </label>
                <select
                  name="lookingForJobs"
                  value={profile.lookingForJobs || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-4 text-slate-800 font-medium focus:outline-none bg-transparent appearance-none"
                  style={clayInputStyle}
                >
                  <option value="" disabled>
                    Select Option
                  </option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-3 ml-1">
                  Expected CTC
                </label>
                <select
                  name="expectedCTC"
                  value={profile.expectedCTC || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-4 text-slate-800 font-medium focus:outline-none bg-transparent appearance-none"
                  style={clayInputStyle}
                >
                  <option>3 - 4.5 Lakh Per Annum</option>
                  <option>4.5 - 6 Lakh Per Annum</option>
                  <option>6+ Lakh Per Annum</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-3 ml-1">
                Preferred Job Location
              </label>
              <input
                name="preferredLocation"
                value={profile.preferredLocation || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
                placeholder="e.g. Bangalore, Chennai"
                className="w-full p-4 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 transition-shadow"
                style={clayInputStyle}
              />
            </div>

            <div className="hidden lg:flex justify-start mt-8 pt-4">
              <button
                onClick={() => goTo("education", educationMainRef)}
                className="px-10 py-4 text-sm font-black uppercase tracking-widest transition-transform hover:-translate-y-1 active:scale-95"
                style={{
                  background: "linear-gradient(145deg, #7e22ce, #6b21a8)", // Purple
                  color: "white",
                  borderRadius: "16px",
                  boxShadow: "8px 8px 16px #cedbe7, -8px -8px 16px #ffffff",
                  border: "none",
                }}
              >
                Next Step ➔
              </button>
            </div>
          </section>
        </div>

        {/* ------------------ EDUCATION DETAILS ------------------ */}

        <div
          className={`${activeSection === "education" ? "block" : "block lg:hidden"} px-6`}
        >
          <section
            ref={educationMainRef}
            className="space-y-10 mt-10" // Removed bg-white, added spacing between cards
          >
            {/* 1. HIGHEST EDUCATION CARD */}
            <div
              ref={highestRef}
              className="p-10 space-y-6"
              style={clayCardStyle}
            >
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-3xl font-black text-slate-800 tracking-tight">
                  Education Details
                </h2>
                <p className="text-slate-400 text-sm mt-1 font-medium">
                  Provide accurate info for verification.
                </p>
              </div>

              <div>
                <ClayDropdown
                  label="What was your highest Education?"
                  name="highestEducation"
                  value={profile.highestEducation}
                  options={[
                    "Bachelor's Degree",
                    "Intermediate / 12th",
                    "10th Standard",
                  ]}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
                <p className="text-xs text-slate-400 mt-2 font-bold ml-1">
                  Mention your current education (if studying)
                </p>
              </div>
            </div>

            {/* 2. 10th STANDARD CARD */}
            <div
              ref={tenthRef}
              className="p-10 space-y-6"
              style={clayCardStyle}
            >
              <div className="border-b border-slate-100 pb-2">
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">
                  10th Standard
                </h3>
              </div>

              <div className="flex flex-col md:flex-row gap-5 lg:gap-10">
                <ClayRadio
                  label="Grade/CGPA"
                  name="tenth_marking"
                  checked={true} // Logic needed if you have a state for this
                  disabled={!isEditing}
                  onChange={() => {}}
                />
                <ClayRadio
                  label="Percentage"
                  name="tenth_marking"
                  checked={false}
                  disabled={!isEditing}
                  onChange={() => {}}
                />
              </div>

              <div>
                <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-3 ml-1">
                  CGPA / Percentage
                </label>
                <input
                  name="tenthCGPA"
                  value={profile.tenthCGPA || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full p-4 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 transition-shadow"
                  style={clayInputStyle}
                  placeholder="Enter 0 if not available"
                />
              </div>
            </div>

            {/* 3. INTERMEDIATE / 12TH CARD */}
            <div
              ref={interRef}
              className="p-10 space-y-8"
              style={clayCardStyle}
            >
              <div className="border-b border-slate-100 pb-2">
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">
                  Intermediate / 12th / Diploma
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ClayDropdown
                  label="What did you study after 10th?"
                  name="interCourse"
                  value={profile.interCourse}
                  options={["Intermediate / 12th", "Diploma"]}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />

                <div>
                  <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-4 ml-1">
                    Marking Scheme
                  </label>
                  <div className="flex flex-col md:flex-row gap-5 md:gap-8 items-start md:items-center">
                    <ClayRadio
                      label="Grade/CGPA"
                      name="inter_marking"
                      value="CGPA"
                      checked={profile.interMarking === "CGPA"}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                    <ClayRadio
                      label="Percentage"
                      name="inter_marking"
                      value="Percentage"
                      checked={profile.interMarking === "Percentage"}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-3 ml-1">
                    Percentage / CGPA
                  </label>
                  <input
                    name="interPercentage"
                    value={profile.interPercentage || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full p-4 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 transition-shadow"
                    style={clayInputStyle}
                  />
                </div>

                <div>
                  <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-3 ml-1">
                    Year of Completion
                  </label>
                  <input
                    name="interCompletionYear"
                    value={profile.interCompletionYear || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full p-4 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 transition-shadow"
                    style={clayInputStyle}
                  />
                </div>
              </div>
            </div>

            {/* 4. BACHELOR'S DEGREE CARD */}
            <div
              ref={degreeRef}
              className="p-10 space-y-8"
              style={clayCardStyle}
            >
              <div className="border-b border-slate-100 pb-2">
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">
                  Bachelor's Degree
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ClayDropdown
                  label="Degree"
                  name="bachelorDegree"
                  value={profile.bachelorDegree}
                  options={["B Tech", "BSc", "BCom", "BA", "Other"]}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />

                <ClayDropdown
                  label="Status"
                  name="degreeStatus"
                  value={profile.degreeStatus}
                  options={["Currently Studying", "Completed"]}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ClayDropdown
                  label="Department / Branch"
                  name="degreeBranch"
                  value={profile.degreeBranch}
                  options={["CSE", "ECE", "EEE", "MECH", "CIVIL", "Other"]}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />

                <div>
                  <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-4 ml-1">
                    Marking Scheme
                  </label>
                  <div className="flex flex-col md:flex-row gap-5 md:gap-8 items-start md:items-center">
                    <ClayRadio
                      label="CGPA"
                      name="degree_marking"
                      value="CGPA"
                      checked={profile.degreeMarking === "CGPA"}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                    <ClayRadio
                      label="Percentage"
                      name="degree_marking"
                      value="Percentage"
                      checked={profile.degreeMarking === "Percentage"}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-3 ml-1">
                    Value
                  </label>
                  <input
                    name="degreePercentage"
                    value={profile.degreePercentage || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="CGPA/ %"
                    className="w-full p-4 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 transition-shadow"
                    style={clayInputStyle}
                  />
                </div>

                <div>
                  <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-3 ml-1">
                    Start Year
                  </label>
                  <input
                    name="degreeStartYear"
                    value={profile.degreeStartYear || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full p-4 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 transition-shadow"
                    style={clayInputStyle}
                  />
                </div>

                <div>
                  <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-3 ml-1">
                    End Year
                  </label>
                  <input
                    name="degreeEndYear"
                    value={profile.degreeEndYear || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full p-4 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 transition-shadow"
                    style={clayInputStyle}
                  />
                </div>
              </div>
            </div>

            {/* 5. INSTITUTE DETAILS CARD */}
            <div className="p-10 space-y-8" style={clayCardStyle}>
              <div className="border-b border-slate-100 pb-2">
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">
                  Institute Details
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ClayDropdown
                  label="Institute Country"
                  name="instituteCountry"
                  value={profile.instituteCountry}
                  options={["India"]}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />

                <div>
                  <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-3 ml-1">
                    Institute Pincode
                  </label>
                  <input
                    name="institutePincode"
                    value={profile.institutePincode || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full p-4 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 transition-shadow"
                    style={clayInputStyle}
                  />
                </div>

                <div className="md:col-span-2">
                  <ClayDropdown
                    label="Institute Name"
                    name="instituteName"
                    value={profile.instituteName}
                    options={[
                      "Rajiv Gandhi University of Knowledge Technologies",
                      "Other",
                    ]}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>

                <ClayDropdown
                  label="Institute District"
                  name="instituteDistrict"
                  value={profile.instituteDistrict}
                  options={["Prakasam", "Guntur", "Krishna", "Other"]}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />

                <div>
                  <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-3 ml-1">
                    Institute City
                  </label>
                  <input
                    name="instituteCity"
                    value={profile.instituteCity || ""}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full p-4 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 transition-shadow"
                    style={clayInputStyle}
                  />
                </div>
              </div>

              <div className="hidden lg:flex justify-start mt-8 pt-4">
                <button
                  onClick={() => goTo("work", workRef)}
                  className="px-10 py-4 text-sm font-black uppercase tracking-widest transition-transform hover:-translate-y-1 active:scale-95"
                  style={{
                    background: "linear-gradient(145deg, #7e22ce, #6b21a8)", // Purple
                    color: "white",
                    borderRadius: "16px",
                    boxShadow: "8px 8px 16px #cedbe7, -8px -8px 16px #ffffff",
                    border: "none",
                  }}
                >
                  Next Step ➔
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* WORK EXPERIENCE */}

        <div
          className={`${activeSection === "work" ? "block" : "block lg:hidden"} px-6`}
        >
          <section
            ref={workRef}
            className="p-10 space-y-8 mt-10 mb-20"
            style={clayCardStyle}
          >
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-3xl font-black text-slate-800 tracking-tight">
                Work Experience
              </h2>
              <p className="text-slate-400 text-sm mt-1 font-medium">
                Tell us about your past or current work experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Fresher Dropdown (Logic adapted for custom dropdown) */}
              <ClayDropdown
                label="Are you a Fresher?"
                name="isFresher"
                // Convert boolean to readable string for the dropdown value
                value={
                  profile.isFresher ?
                    "Yes, I am a Fresher"
                  : "No, I have Experience"
                }
                options={["Yes, I am a Fresher", "No, I have Experience"]}
                onChange={(e) => {
                  // Custom logic to handle the boolean conversion
                  const isFresherBool =
                    e.target.value === "Yes, I am a Fresher";
                  setEditableProfile({
                    ...profile,
                    isFresher: isFresherBool,
                    // Optional: Reset other fields if they become fresher
                    yearsOfExperience:
                      isFresherBool ? "" : profile.yearsOfExperience,
                    lastCompany: isFresherBool ? "" : profile.lastCompany,
                    jobRole: isFresherBool ? "" : profile.jobRole,
                    noticePeriod: isFresherBool ? "" : profile.noticePeriod,
                  });
                }}
                disabled={!isEditing}
              />

              {/* Years of Experience */}
              <div>
                <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-3 ml-1">
                  Total Years of Experience
                </label>
                <input
                  name="yearsOfExperience"
                  value={profile.yearsOfExperience || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing || profile.isFresher}
                  placeholder="e.g. 1.5"
                  className="w-full p-4 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                  style={clayInputStyle}
                />
              </div>
            </div>

            {/* Current / Last Company */}
            <div>
              <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-3 ml-1">
                Current / Last Company
              </label>
              <input
                name="lastCompany"
                value={profile.lastCompany || ""}
                onChange={handleInputChange}
                disabled={!isEditing || profile.isFresher}
                placeholder="Company Name"
                className="w-full p-4 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                style={clayInputStyle}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Job Role */}
              <div>
                <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-3 ml-1">
                  Job Role / Position
                </label>
                <input
                  name="jobRole"
                  value={profile.jobRole || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing || profile.isFresher}
                  placeholder="e.g. Full Stack Developer"
                  className="w-full p-4 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                  style={clayInputStyle}
                />
              </div>

              {/* Notice Period */}
              <ClayDropdown
                label="Notice Period"
                name="noticePeriod"
                value={profile.noticePeriod}
                options={[
                  "Immediate",
                  "15 Days",
                  "30 Days",
                  "60 Days",
                  "90 Days",
                ]}
                onChange={handleInputChange}
                disabled={!isEditing || profile.isFresher}
                placeholder="Select Period"
              />
            </div>

            {/* SUBMIT BUTTON */}
            <div className="flex justify-start mt-8 pt-4 border-t border-slate-100">
              <button
                onClick={handleSave}
                disabled={!isEditing}
                className={`px-12 py-4 text-sm font-black uppercase tracking-widest transition-all transform 
    ${
      !isEditing ?
        "opacity-60 cursor-not-allowed"
      : "hover:-translate-y-1 hover:shadow-lg active:translate-y-0 active:scale-95"
    }
  `}
                style={{
                  background:
                    !isEditing ?
                      "#cbd5e1" // Grey if disabled
                    : "linear-gradient(145deg, #7e22ce, #6b21a8)", // Purple gradient if active
                  color: "white",
                  borderRadius: "16px",
                  border: "none",
                  // THE 4-SIDED 3D SHADOW EFFECT
                  boxShadow:
                    !isEditing ?
                      // Disabled State: Slight "pressed-in" look
                      "inset 3px 3px 6px #94a3b8, inset -3px -3px 6px #ffffff"
                      // Active State: Strong 3D Volumetric look (4 sides)
                    : `
          8px 8px 16px #cedbe7, /* Outer Bottom-Right (Dark Lift) */
          -8px -8px 16px #ffffff, /* Outer Top-Left (Light Lift) */
          inset 4px 4px 8px rgba(255, 255, 255, 0.4), /* Inner Top-Left (Highlight Edge) */
          inset -4px -4px 8px rgba(0, 0, 0, 0.2) /* Inner Bottom-Right (Dark Thickness) */
        `,
                }}
              >
                Submit Profile 🚀
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
