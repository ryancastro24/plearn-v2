export const addNewShoolForm = async (form: any) => {
  const fd = new FormData();

  Object.entries(form).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      fd.append(key, value as any);
    }
  });

  try {
    const res = await fetch("http://localhost:5000/api/schools", {
      method: "POST",
      body: fd, // ❗ DO NOT set Content-Type manually
    });

    // ✅ Handle non-OK responses
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Failed to create school");
    }

    const data = await res.json();

    console.log("✅ School created:", data);

    return data;
  } catch (error: any) {
    console.error("❌ Error creating school:", error.message);
    throw error;
  }
};

// get schools
export const getAllSchools = async () => {
  try {
    const res = await fetch(`http://localhost:5000/api/schools`);

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to fetch rewards");
    }

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("getWorldTopicRewards error:", error);
    throw new Error(
      error.message || "Something went wrong while fetching rewards",
    );
  }
};

export const getSchoolDetails = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:5000/api/schools/${id}`);

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to fetch rewards");
    }

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("getWorldTopicRewards error:", error);
    throw new Error(
      error.message || "Something went wrong while fetching rewards",
    );
  }
};
