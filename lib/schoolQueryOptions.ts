import { queryOptions } from "@tanstack/react-query";
import { getAllSchools, getSchoolDetails } from "@/backend/school";

export const getAllSchoolsQuery = () => {
  return queryOptions({
    queryKey: ["schools"],
    queryFn: getAllSchools,
  });
};

export const getSchoolDetailsQuery = (id: string) => {
  return queryOptions({
    queryKey: ["schools", id],
    queryFn: () => getSchoolDetails(id),
  });
};
