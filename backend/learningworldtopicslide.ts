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
