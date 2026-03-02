import React from "react";
import { useNavigate } from "react-router-dom";
import { typeToTone } from "./utils";
import Pill from "./Pill";

const ScheduleItem = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (item.link) {
      navigate(item.link);
    } else if (item.zoomLink) {
      window.open(item.zoomLink, "_blank");
    }
  };

  const { tone, label } = typeToTone(item.type);

  return (
    <div
      className={`p-4 rounded-lg mb-4 ${
        item.link || item.zoomLink ? "cursor-pointer" : ""
      }`}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between">
        <Pill tone={tone} label={label} />
        {item.duration && (
          <span className="text-sm text-gray-500">{item.duration}</span>
        )}
      </div>
      <h3 className="text-lg font-semibold mt-2">{item.title}</h3>
      <p className="text-gray-600">{item.description}</p>
    </div>
  );
};

export default ScheduleItem;
