type WorldDataProp = {
  title: string;
  subject: string;
  description: string;
  worldImage: string;
  world: string;
};

// add new learning world
export const addNewWorld = async (worldData: WorldDataProp) => {
  const res = await fetch("http://localhost:5000/api/learningworlds", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(worldData),
  });

  if (!res.ok) throw new Error("Failed to create item");
  return res.json();
};

// get all learning worlds
export const getAllLearningworldsData = async () => {
  const res = await fetch(`http://localhost:5000/api/learningworlds/`);

  if (!res.ok) throw new Error("Failed to fetch learning worlds");

  return res.json();
};

// get world by id
export const getLearningworldDataById = async (id: string) => {
  const res = await fetch(`http://localhost:5000/api/learningworlds/${id}`);

  if (!res.ok) throw new Error("Failed to fetch learning worlds");

  return res.json();
};
