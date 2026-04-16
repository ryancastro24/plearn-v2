"use client";
import AddNewTopicSlide from "@/components/system components/LearningHubAdmin Components/AddNewTopicSlide";
import BackArrowComponent from "@/components/system components/LearningHubAdmin Components/BackArrowComponent";
import { useQuery } from "@tanstack/react-query";
import { getLearningWorldTopicData } from "@/lib/learningworldTopicsQueryOptions";
import { getLearningWorldTopicSlides } from "@/lib/learningworldtopicSlidesQueryOptions";
import SlideCardComponent from "./SlideCardComponent";
const TopicSlideCreationClientComponent = ({ id, topicid }: any) => {
  const { data: learingworldtopicdeatailsData } = useQuery(
    getLearningWorldTopicData(topicid),
  );

  const { data: worldtopicslides } = useQuery(
    getLearningWorldTopicSlides(topicid),
  );

  const topicDetails = learingworldtopicdeatailsData?.data;
  const slides = worldtopicslides;
  console.log("slides", slides);
  return (
    <div className="p-5 flex flex-col gap-5 w-full relative">
      <div>
        <BackArrowComponent />
        <h2>{topicDetails?.title}</h2>
        <h3 className="text-xs">{topicDetails?.description}</h3>
      </div>

      {slides ? (
        <div>
          <h2>Available slides</h2>

          <div className="flex flex-col gap-4 mt-2">
            {slides?.map((slide: any) => (
              <SlideCardComponent key={slide._id} slide={slide} />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h2>No slides available</h2>
        </div>
      )}

      <div className="fixed bottom-6 right-6 z-20">
        <AddNewTopicSlide topicid={topicid} />
      </div>
    </div>
  );
};

export default TopicSlideCreationClientComponent;
