import { queryOptions } from "@tanstack/react-query";
import { getStudentSectionAttendancesDate } from "@/backend/studentAttendance";

export const getStudentSectionAttendancesDateQuery = (id: string) => {
  return queryOptions({
    queryKey: ["sectionattendacedates", id],
    queryFn: () => getStudentSectionAttendancesDate(id),
  });
};
