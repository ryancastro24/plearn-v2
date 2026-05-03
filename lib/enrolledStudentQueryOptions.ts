import { queryOptions } from "@tanstack/react-query";
import {
  getEnrolledStudentByParentId,
  getStudentPerSchool,
  getStudentPerSchoolYearLevel,
} from "@/backend/enrolledStudent";

export const getEnrolledStudentByParentIdQuery = () => {
  return queryOptions({
    queryKey: ["enrolledStudents"],
    queryFn: getEnrolledStudentByParentId,
  });
};

export const getStudentPerSchoolQuery = (id: string) => {
  return queryOptions({
    queryKey: ["studentsPerSchool", id],
    queryFn: () => getStudentPerSchool(id),
  });
};

export const getStudentPerSchoolYearLevelQuery = (gradeLevel?: string) => {
  return queryOptions({
    queryKey: ["enrolledStudents", gradeLevel],
    queryFn: () => getStudentPerSchoolYearLevel(gradeLevel),
  });
};
