import { queryOptions } from "@tanstack/react-query";
import {
  getEnrolledStudentByParentId,
  getStudentPerSchool,
} from "@/backend/enrolledStudent";

export const getEnrolledStudentByParentIdQuery = (id: string) => {
  return queryOptions({
    queryKey: ["enrolledStudents", id],
    queryFn: () => getEnrolledStudentByParentId(id),
  });
};

export const getStudentPerSchoolQuery = (id: string) => {
  return queryOptions({
    queryKey: ["studentsPerSchool", id],
    queryFn: () => getStudentPerSchool(id),
  });
};
