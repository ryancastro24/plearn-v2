export async function getAllStudentSections(id: string) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/studentsections/${id}`,
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch student sections");
    }

    return data;
  } catch (error) {
    console.error("fetchTeacherSections error:", error);
    throw error;
  }
}

export async function getAllStudentSectionsData(id?: string) {
  try {
    // ✅ Prevent invalid request
    if (!id) {
      return null;
    }

    const response = await fetch(
      `http://localhost:5000/api/studentsections/student/data/${id}`,
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch student sections data");
    }

    return data;
  } catch (error: any) {
    console.error("getAllStudentSectionsData error:", error);

    throw new Error(
      error?.message || "Something went wrong while fetching data",
    );
  }
}
