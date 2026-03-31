"use client";

import { useEffect, useState } from "react";
import ClassesContainer from "./ClassesContainer";
import ClassCardContainer from "./ClassCardContainer";
const TeacherDashboardContainer = () => {
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const formatted = now.toLocaleString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });

      setDateTime(formatted);
    };

    updateTime(); // initial
    const interval = setInterval(updateTime, 60000); // update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div className="border border-black/10 shadow shadow-black/20 flex items-center justify-between p-4 rounded-lg bg-white w-150">
        <div>
          <span className="text-sm text-gray-600">
            {dateTime.replace(",", " |")}
          </span>
        </div>

        <h2 className="font-medium text-green-600">Regular working day</h2>
      </div>

      <div className="flex items-center gap-5">
        <div className="p-2 px-4 flex flex-col  items-center justify-center gap-1 bg-[#ff5b5b] rounded text-white">
          <h2 className="text-3xl font-bold">205</h2>
          <h3 className="text-xs">total students</h3>
        </div>

        <div className="p-2 px-4 flex flex-col items-center justify-center gap-1 bg-[#00E059] rounded text-white">
          <h2 className="text-3xl font-bold">125</h2>
          <h3 className="text-xs">advance students</h3>
        </div>

        <div className="p-2 px-4 flex flex-col items-center justify-center gap-1 bg-[#E0A000] rounded text-white">
          <h2 className="text-3xl font-bold">75</h2>
          <h3 className="text-xs">improving students</h3>
        </div>

        <div className="p-2 px-4 flex flex-col items-center justify-center gap-1 bg-[#E03800] rounded text-white">
          <h2 className="text-3xl font-bold">5</h2>
          <h3 className="text-xs">struggling students</h3>
        </div>
      </div>

      <div>
        <ClassesContainer />
      </div>

      <div>
        <ClassCardContainer />
      </div>
    </div>
  );
};

export default TeacherDashboardContainer;
