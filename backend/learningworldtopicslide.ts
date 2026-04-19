export const createSlide = async (data: any) => {
  const res = await fetch("http://localhost:5000/api/worldtopicslides", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to create slide");
  }

  return result;
};

//get topic details
export const getLearningworldTopicsSlidesData = async (id: string) => {
  const res = await fetch(`http://localhost:5000/api/worldtopicslides/${id}`);

  if (!res.ok) throw new Error("Failed to fetch learning worlds");

  return res.json();
};

type SlideOrderPayload = {
  slides: {
    id: string;
    order: number;
  }[];
};

export const updateSlidesOrder = async (data: SlideOrderPayload) => {
  const res = await fetch(
    "http://localhost:5000/api/worldtopicslides/slides/reorder",
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

// update specific slide
export const updateSlide = async (data: any, id: string) => {
  const res = await fetch(`http://localhost:5000/api/worldtopicslides/${id}`, {
    method: "PUT",
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

// delete slide
export async function deleteTopicSlide(id: string) {
  const res = await fetch(`http://localhost:5000/api/worldtopicslides/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete item");
  return res.json();
}
