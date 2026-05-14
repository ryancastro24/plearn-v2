import { queryOptions } from "@tanstack/react-query";
import { getAllActivitySlides } from "@/backend/activitslides";
export const getAllActivitySlidesQuery = (id: string) => {
  return queryOptions({
    queryKey: ["activityslides", id],
    queryFn: () => getAllActivitySlides(id),
  });
};
