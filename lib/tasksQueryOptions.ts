import { queryOptions } from "@tanstack/react-query";
import { getAllKidTasks, getKidsUpdatedTasks } from "@/backend/tasks";

export const getKidsTasks = (id: string) => {
  return queryOptions({
    queryKey: ["kidtasks", id],
    queryFn: () => getAllKidTasks(id),
  });
};

export const getAllKidsTasksData = () => {
  return queryOptions({
    queryKey: ["allkidstasks"],
    queryFn: getKidsUpdatedTasks,
  });
};
