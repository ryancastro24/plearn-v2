import { queryOptions } from "@tanstack/react-query";
import { getSchoolStudents } from "@/backend/schooladminstudents";

export const getSchoolStudentsQuery = () => {
  return queryOptions({
    queryKey: ["schoolstudents"],
    queryFn: getSchoolStudents,
  });
};
