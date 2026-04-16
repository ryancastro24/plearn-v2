"use client";
import { useQuery } from "@tanstack/react-query";
import LearningWorldContainerCard from "./LearningWorldContainerCard";
import MobileLearningWorldContainerCard from "./MobileLearningWorldContainerCard";
import { getAllLearningWorlds } from "@/lib/learningworldsQueryOptions";
const worldStatusFinished = false;
const UnfinishedLearningWorld = () => {
  const { data: learningworlddata } = useQuery(getAllLearningWorlds());
  return (
    <div className="w-full flex flex-col gap-3">
      <h2>Unfinished Worlds</h2>

      <div className="flex items-center justify-between md:hidden ">
        {learningworlddata?.map((learningworld: any) => (
          <MobileLearningWorldContainerCard
            key={learningworld._id}
            title={learningworld.title}
            description={learningworld.description}
            bgImage={learningworld.worldImage}
            worldStatusFinished={learningworld.isFinished}
          />
        ))}
      </div>

      <div className="md:flex items-center justify-between hidden">
        {learningworlddata?.map((learningworld: any) => (
          <LearningWorldContainerCard
            key={learningworld._id}
            title={learningworld.title}
            description={learningworld.description}
            bgImage={learningworld.worldImage}
            worldStatusFinished={learningworld.isFinished}
            id={learningworld._id}
          />
        ))}
      </div>
    </div>
  );
};

export default UnfinishedLearningWorld;
