import { queryOptions } from "@tanstack/react-query";
import { getSchoolTeachers } from "@/backend/schooladminteachers";

export const getSchoolTeachersQuery = () => {
  return queryOptions({
    queryKey: ["schoolteachers"],
    queryFn: getSchoolTeachers,
  });
};
