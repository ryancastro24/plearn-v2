"use client";
import Image from "next/image";
import TopicLinksContainer from "@/components/system components/LearningHubAdmin Components/TopicLinksContainer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LearningHubRewards from "@/components/system components/LearningHubAdmin Components/LearningHubRewards";
import { useQuery } from "@tanstack/react-query";
import { getLearningWorldById } from "@/lib/learningworldsQueryOptions";
import { getLearningWorldTopicsData } from "@/lib/learningworldTopicsQueryOptions";
import TopicCreationModal from "./TopicCreationModal";
const LearningHubDetailsClientComponent = ({ id }: any) => {
  const { data: learningworldData } = useQuery(getLearningWorldById(id));

  const { data: learnginworldtopics } = useQuery(
    getLearningWorldTopicsData(id),
  );
  const learningworld = learningworldData?.data;
  const topics = learnginworldtopics?.data;
  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-center  h-50 relative overflow-hidden">
        {learningworld?.worldImage ? (
          <Image
            src={learningworld.worldImage}
            alt="world backdrop"
            fill
            className="object-cover"
          />
        ) : null}

        <div className="absolute flex flex-col items-center gap-2">
          <h2 className="text-white font-bold text-6xl drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)]">
            Welcome to
          </h2>
          <h2 className="text-white font-bold drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)] text-3xl">
            {learningworld?.title.toUpperCase()}
          </h2>
        </div>
      </div>

      <div className="p-3 flex flex-col gap-4">
        <p className="text-sm">
          <strong>About the subject:</strong> {learningworld?.description}
        </p>

        <div className="grid grid-cols-5 gap-5 w-full px-5 ">
          <div className="flex flex-col gap-4 w-full col-span-3">
            <h2>Topics Available</h2>

            <div className="w-fit flex flex-col gap-5 ">
              {topics?.map((topic: any, index: number) => (
                <TopicLinksContainer
                  key={topic._id}
                  title={topic?.title}
                  description={topic?.description}
                  id={id}
                  topicid={topic._id}
                  index={index}
                />
              ))}
            </div>

            <div>
              <TopicCreationModal id={learningworld?._id} />
            </div>
          </div>

          <LearningHubRewards />
        </div>
      </div>
    </div>
  );
};

export default LearningHubDetailsClientComponent;
