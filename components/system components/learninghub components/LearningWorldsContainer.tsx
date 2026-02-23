import React from "react";
import LearninWorlds from "./LearninWorlds";

const sampleLearningWorldsData = [
  {
    id: 1,
    coverImage: "/learninghub page assets/learningworld1.png",
    title: "Math Meadow Kingdom",
    decription: "Bright forest world where numbers grow like magic!",
    ages: "Ages 6-10",
  },

  {
    id: 2,
    coverImage: "/learninghub page assets/learningworld2.png",
    title: "Logic Lava Lands",
    decription:
      "Fiery world of puzzles, problem-solving, and brain challenges!",
    ages: "Ages 6-10",
  },

  {
    id: 3,
    coverImage: "/learninghub page assets/learningworld3.png",
    title: "Sky Science Sanctuary",
    decription: "Floating crystal world full of discovery and experiments!",
    ages: "Ages 6-10",
  },
];
const LearningWorldsContainer = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 p-2">
      {sampleLearningWorldsData.map((world) => (
        <LearninWorlds key={world.id} {...world} />
      ))}
    </div>
  );
};

export default LearningWorldsContainer;
