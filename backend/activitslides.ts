export const createActivitySlide = async (data: any) => {
  const res = await fetch("http://localhost:5000/api/activityslides", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to create slide");
  }

  return result;
};

type SlideOrderPayload = {
  slides: {
    id: string;
    order: number;
  }[];
};
export const updateSlidesOrder = async (data: SlideOrderPayload) => {
  const res = await fetch(
    "http://localhost:5000/api/activityslides/slides/reorder",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // keep if using auth cookies
      body: JSON.stringify(data),
    },
  );

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to update order");
  }

  return result;
};

// get all activity slides
export async function getAllActivitySlides(id: string) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/activityslides/${id}`,
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch activity slides");
    }

    return data;
  } catch (error) {
    console.error("fetchActivitySlides error:", error);
    throw error;
  }
}
