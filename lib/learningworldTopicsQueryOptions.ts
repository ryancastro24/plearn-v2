import { queryOptions } from "@tanstack/react-query";
import {
  getLearningworldTopicsDetailsById,
  getLearningworldTopics,
} from "@/backend/learnwingworldtopic";

export const getLearningWorldTopicsData = (id: string) => {
  return queryOptions({
    queryKey: ["learningworldstopics", id],
    queryFn: () => getLearningworldTopics(id),
  });
};

export const getLearningWorldTopicData = (id: string) => {
  return queryOptions({
    queryKey: ["learningworldstopicdetails", id],
    queryFn: () => getLearningworldTopicsDetailsById(id),
    staleTime: Infinity,
  });
};
