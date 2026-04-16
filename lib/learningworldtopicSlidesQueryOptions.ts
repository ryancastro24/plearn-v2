import { queryOptions } from "@tanstack/react-query";
import { getLearningworldTopicsSlidesData } from "@/backend/learningworldtopicslide";

export const getLearningWorldTopicSlides = (id: string) => {
  return queryOptions({
    queryKey: ["worldtopicslides", id],
    queryFn: () => getLearningworldTopicsSlidesData(id),
  });
};
