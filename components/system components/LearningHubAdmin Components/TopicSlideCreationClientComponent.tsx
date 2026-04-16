"use client";
import AddNewTopicSlide from "@/components/system components/LearningHubAdmin Components/AddNewTopicSlide";
import BackArrowComponent from "@/components/system components/LearningHubAdmin Components/BackArrowComponent";
import { useQuery } from "@tanstack/react-query";
import { getLearningWorldTopicDetails } from "@/lib/learningworldTopicsQueryOptions";
const TopicSlideCreationClientComponent = ({ id, topicid }: any) => {
  const { data: learingworldtopicdeatailsData } = useQuery(
    getLearningWorldTopicDetails(topicid),
  );

  const topicDetails = learingworldtopicdeatailsData?.data;
  return (
    <div className="p-5 flex flex-col gap-5 w-full relative">
      <div>
        <BackArrowComponent />
        <h2>{topicDetails?.title}</h2>
        <h3 className="text-xs">{topicDetails?.description}</h3>
      </div>

      <AddNewTopicSlide />
    </div>
  );
};

export default TopicSlideCreationClientComponent;
