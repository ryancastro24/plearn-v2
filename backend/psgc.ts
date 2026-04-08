export const getProvince = async () => {
  const response = await fetch("https://psgc.gitlab.io/api/provinces");
  const data = await response.json();
  return data;
};

export const getMunicipality = async (provinceCode: string) => {
  const response = await fetch(
    `https://psgc.gitlab.io/api/provinces/${provinceCode}/cities-municipalities/`,
  );
  const data = await response.json();

  console.log("Municipalities:", data); // Log the fetched municipalities data
  return data;
};

export const getBarangay = async (municipalityCode: string) => {
  const response = await fetch(
    `https://psgc.gitlab.io/api/cities-municipalities/${municipalityCode}/barangays/`,
  );
  const data = await response.json();
  return data;
};
