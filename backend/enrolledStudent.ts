export const enrollNewStudents = async (payload: any) => {
  try {
    const res = await fetch("http://localhost:5000/api/enrolledstudents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // ✅ important
      },
      body: JSON.stringify(payload), // ✅ send JSON
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to create reward");
    }

    return data;
  } catch (error: any) {
    console.error("createReward error:", error);
    throw new Error(
      error.message || "Something went wrong while creating reward",
    );
  }
};

// get enrolled students by parent

export const getEnrolledStudentByParentId = async (parentId: string) => {
  try {
    if (!parentId) return []; // ✅ prevent bad request

    const res = await fetch(
      `http://localhost:5000/api/enrolledstudents/parent/${parentId}`,
      {
        cache: "no-store", // ✅ prevents 304
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to fetch enrolled students");
    }

    return await res.json();
  } catch (error: any) {
    console.error("getEnrolledStudentByParentId error:", error);
    throw new Error(
      error.message || "Something went wrong while fetching enrolled students",
    );
  }
};

export const getStudentPerSchool = async (schoolId: string) => {
  try {
    if (!schoolId) return []; // ✅ prevent bad request

    const res = await fetch(
      `http://localhost:5000/api/enrolledstudents/school/${schoolId}`,
      {
        cache: "no-store", // ✅ prevents 304
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to fetch enrolled students");
    }

    return await res.json();
  } catch (error: any) {
    console.error("getEnrolledStudentByParentId error:", error);
    throw new Error(
      error.message || "Something went wrong while fetching enrolled students",
    );
  }
};
