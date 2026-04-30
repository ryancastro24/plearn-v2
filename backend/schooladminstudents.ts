export const getSchoolStudents = async () => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/enrolledstudents/students`,
      {
        credentials: "include",
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to fetch students");
    }

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("getSchoolStudents error:", error);
    throw new Error(
      error.message || "Something went wrong while fetching teachers",
    );
  }
};
