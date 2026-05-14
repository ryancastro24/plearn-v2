import { queryOptions } from "@tanstack/react-query";
import {
  getSectionActivities,
  getSpecificSectionActivity,
} from "@/backend/sectionActivties";
export const getSectionActivitiesQuery = (id: string) => {
  return queryOptions({
    queryKey: ["sectionsActivities", id],
    queryFn: () => getSectionActivities(id),
  });
};

export const getSpecificSectionActivityQuery = (id: string) => {
  return queryOptions({
    queryKey: ["activity", id],
    queryFn: () => getSpecificSectionActivity(id),
  });
};
