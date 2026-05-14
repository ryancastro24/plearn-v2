type SectionPayload = {
  title: string;
  description?: string;
  grade: string;
  subject: string;
  teacherId: string;
  students: string[];
  startTime: string;
  endTime: string;
  workingdays: string[];
};

export const createSection = async (payload: SectionPayload) => {
  try {
    const res = await fetch(`http://localhost:5000/api/sections`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // required for req.user.schoolId
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to create section");
    }

    return await res.json();
  } catch (error: any) {
    console.error("createSection error:", error);
    throw new Error(
      error.message || "Something went wrong while creating section",
    );
  }
};

// get sections by school
export const getSectionsBySchool = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/sections", {
      method: "GET",
      credentials: "include", // ✅ important if you're using cookies (auth)
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to fetch sections");
    }

    return await res.json();
  } catch (error: any) {
    console.error("getSectionsBySchool error:", error);
    throw new Error(
      error.message || "Something went wrong while fetching sections",
    );
  }
};

// fetch teacher sections
export async function fetchTeacherSections() {
  try {
    const response = await fetch(
      "http://localhost:5000/api/sections/teacher/sections",
      {
        credentials: "include",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch sections");
    }

    return data;
  } catch (error) {
    console.error("fetchTeacherSections error:", error);
    throw error;
  }
}
export async function updateSectionStudents(sectionId: string, students: any) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/sections/${sectionId}/students`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",

        body: JSON.stringify({
          students,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to update students");
    }

    return data;
  } catch (error) {
    console.error("updateSectionStudents error:", error);

    throw error;
  }
}

//
export async function fetchSectionsDetails(id: string) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/sections/sections/details/${id}`,
      {
        credentials: "include",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch sections");
    }

    return data;
  } catch (error) {
    console.error("fetchTeacherSections error:", error);
    throw error;
  }
}
