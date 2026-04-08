import { queryOptions } from "@tanstack/react-query";
import { getBarangay, getMunicipality, getProvince } from "@/backend/psgc";

export const getAllProvinces = () => {
  return queryOptions({
    queryKey: ["provinces"],
    queryFn: getProvince,
  });
};

export const getAllMunicipalities = (provinceCode: string) => {
  return queryOptions({
    queryKey: ["municipalities", provinceCode],
    queryFn: () => getMunicipality(provinceCode),
  });
};

export const getAllBarangays = (municipalityCode: string) => {
  return queryOptions({
    queryKey: ["barangays", municipalityCode],
    queryFn: () => getBarangay(municipalityCode),
  });
};
