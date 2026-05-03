import { queryOptions } from "@tanstack/react-query";
import { getSectionsBySchool, fetchTeacherSections } from "@/backend/sections";

export const getSectionsBySchoolQuery = () => {
  return queryOptions({
    queryKey: ["sections"],
    queryFn: getSectionsBySchool,
  });
};

export const getTeacherSectionsQuery = () => {
  return queryOptions({
    queryKey: ["teachersections"],
    queryFn: fetchTeacherSections,
  });
};
