import { queryOptions } from "@tanstack/react-query";
import { getWorldTopicRewards } from "@/backend/learnginworldtopicreward";

export const getWorldTopicRewardsQuery = (id: string) => {
  return queryOptions({
    queryKey: ["worldtopicrewards", id],
    queryFn: () => getWorldTopicRewards(id),
  });
};
