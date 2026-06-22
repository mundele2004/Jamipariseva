import React from "react";
import { useNavigate } from "react-router-dom";
const COLORS_POOL = [
  { bgColor: "bg-ufo-green", hoverColor: "hover:bg-ufo-green" },
  { bgColor: "bg-mountain-meadow", hoverColor: "hover:bg-mountain-meadow" },
  { bgColor: "bg-gamboge", hoverColor: "hover:bg-gamboge" },
  { bgColor: "bg-carmine-pink", hoverColor: "hover:bg-carmine-pink" },
  { bgColor: "bg-electric-indigo", hoverColor: "hover:bg-electric-indigo" },
];

// Destructuring props: color, title, description, and path
const ServiceCard = ({ index, title, description, path }) => {
  const navigate = useNavigate();
  const cardColor = COLORS_POOL[index % (COLORS_POOL.length)];
  const handleApplyClick = () => {
    if (path !== "disabled") {
      navigate(path);
    }
  };

  return (
    <div className="flex flex-col justify-between border-[1px] border-solid rounded-xl w-80 h-72 p-3">
      <div
        className={`${cardColor.bgColor} h-1/4 text-white text-lg font-medium flex justify-center items-center`}
      >
        {title}
      </div>
      <div
        className={`flex flex-col group ${cardColor.hoverColor}  hover:text-white transition-all duration-500 justify-between h-3/4`}
      >
        <div className="p-2">{description}</div>
        <button
          className="m-1 p-1 h-12 text-blue-200 transition-all duration-500 group-hover:text-white group-hover:border-white text-[16px]  border-[1px] border-black border-solid font-bold "
          onClick={handleApplyClick}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
