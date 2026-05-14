import { queryOptions } from "@tanstack/react-query";
import {
  getSectionsBySchool,
  fetchTeacherSections,
  fetchSectionsDetails,
} from "@/backend/sections";

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

export const fetchSectionsDetailsQuery = (id: string) => {
  return queryOptions({
    queryKey: ["sectionDetails", id],
    queryFn: () => fetchSectionsDetails(id),
  });
};
