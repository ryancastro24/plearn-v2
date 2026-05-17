import { queryOptions } from "@tanstack/react-query";
import { getStudentActivities } from "@/backend/studentActivities";

export const getStudentActivitiesQuery = () => {
  return queryOptions({
    queryKey: ["studentactivities"],
    queryFn: getStudentActivities,
  });
};
