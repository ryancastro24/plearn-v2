import { queryOptions } from "@tanstack/react-query";
import {
  getUserKidsData,
  getKidData,
  getUserData,
  getSchoolAdminEmployees,
} from "@/backend/user";

export const getUserLoginData = () => {
  return queryOptions({
    queryKey: ["me"],
    queryFn: getUserData,
    staleTime: Infinity,
  });
};

export const getUserKids = () => {
  return queryOptions({
    queryKey: ["userkids"],
    queryFn: getUserKidsData,
  });
};

export const getKidsData = (id: string) => {
  return queryOptions({
    queryKey: ["kiddata", id],
    queryFn: () => getKidData(id),
    staleTime: Infinity,
  });
};

export const getSchoolAdminEmployeesQuery = (id: string) => {
  return queryOptions({
    queryKey: ["schooladmins", id],
    queryFn: () => getSchoolAdminEmployees(id),
    staleTime: Infinity,
  });
};
