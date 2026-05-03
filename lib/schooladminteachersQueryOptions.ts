import { queryOptions } from "@tanstack/react-query";
import {
  getSchoolTeachers,
  getSchoolTeachersForSection,
} from "@/backend/schooladminteachers";

export const getSchoolTeachersQuery = () => {
  return queryOptions({
    queryKey: ["schoolteachers"],
    queryFn: getSchoolTeachers,
  });
};
export const getSchoolTeachersForSectionQuery = () => {
  return queryOptions({
    queryKey: ["schoolteacherssection"],
    queryFn: getSchoolTeachersForSection,
  });
};
