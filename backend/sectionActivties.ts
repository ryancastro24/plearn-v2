import { DatabaseBackupIcon } from "lucide-react";

// get sections by school
export const getSectionActivities = async (id: string) => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/sectionactivities/${id}`,
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message || "Failed to fetch section activities",
      );
    }

    return await res.json();
  } catch (error: any) {
    console.error("getSectionsBySchool error:", error);
    throw new Error(
      error.message || "Something went wrong while fetching sections",
    );
  }
};

// add new section activity
export async function createSectionActivity(data: any) {
  try {
    const response = await fetch(
      "http://localhost:5000/api/sectionactivities",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      },
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to create activity");
    }

    return result;
  } catch (error) {
    console.error("createSectionActivity frontend error:", error);
    throw error;
  }
}

export const getSpecificSectionActivity = async (id: string) => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/sectionactivities/section/activity/${id}`,
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message || "Failed to fetch section activities",
      );
    }

    return await res.json();
  } catch (error: any) {
    console.error("getSectionsBySchool error:", error);
    throw new Error(
      error.message || "Something went wrong while fetching sections",
    );
  }
};

export async function deployFinalActivity(payload: any) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/sectionactivities/deploy-final-activity`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    return data;
  } catch (error) {
    console.log(error);

    throw (
      error || {
        success: false,
        message: "Something went wrong",
      }
    );
  }
}
