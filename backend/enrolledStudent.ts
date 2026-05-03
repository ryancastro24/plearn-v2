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

export const getEnrolledStudentByParentId = async () => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/enrolledstudents/parent/data`,
      {
        cache: "no-store", // ✅ prevents 304
        credentials: "include",
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

// approve enrollment
export async function approveEnrollment(id: string) {
  try {
    const res = await fetch(
      `http://localhost:5000/api/enrolledstudents/students/${id}/approve`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to approve enrollment");
    }

    return data;
  } catch (error: any) {
    console.error("Approve Enrollment Error:", error.message);
    throw error;
  }
}

export const getStudentPerSchoolYearLevel = async (gradeLevel?: string) => {
  try {
    const query =
      gradeLevel && gradeLevel !== "All"
        ? `?gradeLevel=${encodeURIComponent(gradeLevel)}`
        : "";

    const res = await fetch(
      `http://localhost:5000/api/enrolledstudents/students/section/selection${query}`,
      {
        method: "GET",
        credentials: "include", // ✅ IMPORTANT (for req.user)
        cache: "no-store",
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to fetch students");
    }

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("getStudentPerSchoolYearLevel error:", error);
    throw new Error(
      error.message || "Something went wrong while fetching students",
    );
  }
};
