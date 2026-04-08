import { queryOptions } from "@tanstack/react-query";
import { getAllKidTasks } from "@/backend/tasks";

export const getKidsTasks = (id: string) => {
  return queryOptions({
    queryKey: ["kidtasks", id],
    queryFn: () => getAllKidTasks(id),
  });
};
