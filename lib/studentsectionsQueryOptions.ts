import { queryOptions } from "@tanstack/react-query";
import {
  getAllStudentSections,
  getAllStudentSectionsData,
} from "@/backend/studentSections";

export const getSectionsBySchoolQuery = (id: string) => {
  return queryOptions({
    queryKey: ["sectiondetails", id],
    queryFn: () => getAllStudentSections(id),
  });
};

export const getAllStudentSectionsDataQuery = (id: string) => {
  return queryOptions({
    queryKey: ["studentsectiondata", id],
    queryFn: () => getAllStudentSectionsData(id),
  });
};
