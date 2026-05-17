export const getStudentActivities = async () => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/studentsectionactivities`,
      {
        credentials: "include",
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message || "Failed to fetch student activities",
      );
    }

    return await res.json();
  } catch (error: any) {
    throw new Error(
      error.message || "Something went wrong while fetching student activities",
    );
  }
};
