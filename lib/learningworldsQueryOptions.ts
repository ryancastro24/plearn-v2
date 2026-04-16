import { queryOptions } from "@tanstack/react-query";
import {
  getAllLearningworldsData,
  getLearningworldDataById,
} from "@/backend/learningworlds";

export const getAllLearningWorlds = () => {
  return queryOptions({
    queryKey: ["learningworlds"],
    queryFn: getAllLearningworldsData,
  });
};

export const getLearningWorldById = (id: string) => {
  return queryOptions({
    queryKey: ["learningworlds", id],
    queryFn: () => getLearningworldDataById(id),
  });
};
