import React from "react";
import { FaSpinner } from "react-icons/fa";

const Loading = ({ h = "h-screen", w = "w-full", isButtonLoader = false }) => {
  return (
    <div
      className={`flex items-center justify-center ${h} ${w} ${
        !isButtonLoader ? "bg-gradient-to-br from-blue-50 to-purple-50" : "bg-transparent"
      }`}
    >
      <div className="text-center">
        <FaSpinner
          className={`animate-spin ${isButtonLoader ? "text-white" : "text-blue-500"} mx-auto mb-4 text-6xl`}
        />
      </div>
    </div>
  );
};

export default Loading;
