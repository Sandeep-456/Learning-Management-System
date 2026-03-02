import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";

const ClayDropdown = ({
  label,
  name,
  value,
  options,
  onChange,
  disabled,
  placeholder = "Select...",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue, e) => {
    e.stopPropagation(); // Prevent bubbling issues

    // Construct a standard event object so handleInputChange accepts it
    const fakeEvent = {
      target: {
        name: name,
        value: optionValue,
      },
    };

    onChange(fakeEvent); // Trigger parent update
    setIsOpen(false); // Close menu
  };

  // Styles
  const clayInputStyle = {
    backgroundColor: "#F0F4F8",
    borderRadius: "16px",
    boxShadow: "inset 6px 6px 10px #cedbe7, inset -6px -6px 10px #ffffff",
    border: "1px solid rgba(255,255,255,0.6)",
  };

  const clayMenuStyle = {
    backgroundColor: "#FFFFFF",
    borderRadius: "16px",
    boxShadow:
      "10px 10px 30px rgba(163, 177, 198, 0.4), -10px -10px 30px rgba(255, 255, 255, 0.8)", // Stronger float shadow
    border: "1px solid #f1f5f9",
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-slate-500 font-bold text-xs uppercase tracking-wider mb-3 ml-1">
        {label}
      </label>

      {/* TRIGGER BUTTON */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full p-4 flex items-center justify-between text-left transition-all ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        style={clayInputStyle}
      >
        <span
          className={`font-medium truncate mr-2 ${value ? "text-slate-800" : "text-slate-400"}`}
        >
          {value || placeholder}
        </span>
        <FaChevronDown
          className={`text-slate-400 text-xs shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* DROPDOWN MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute z-[100] w-full mt-2 left-0" // High Z-Index is crucial
            style={clayMenuStyle}
          >
            <ul className="max-h-60 overflow-y-auto py-2 custom-scrollbar">
              {options.map((opt) => (
                <li
                  key={opt}
                  onClick={(e) => handleSelect(opt, e)}
                  className={`px-5 py-3 text-sm font-bold cursor-pointer transition-colors
                    ${value === opt ? "bg-blue-50 text-blue-600" : "text-slate-600 hover:bg-slate-50 hover:text-blue-500"}
                  `}
                >
                  {opt}
                </li>
              ))}
              {options.length === 0 && (
                <li className="px-5 py-3 text-sm text-slate-400 italic">
                  No options available
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClayDropdown;
