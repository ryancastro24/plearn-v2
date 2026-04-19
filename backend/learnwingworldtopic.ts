// add new  learning world topic
type LearningWorldTopicDataProp = {
  title: string;
  description: string;
  learningWorldId: string;
};

type LearningWorldTopicSlideDataProp = {
  title: string;
  descrption: string;
  learningworldId: string;
};

export async function addNewLearningWorldTopic(
  LearningWorldTopicData: LearningWorldTopicDataProp,
) {
  const res = await fetch("http://localhost:5000/api/learningworldstopics", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(LearningWorldTopicData),
  });

  if (!res.ok) throw new Error("Failed to create item");
  return res.json();
}

export async function addNewLearningWorldTopicSlide(
  LearningWorldTopicSlideData: LearningWorldTopicSlideDataProp,
) {
  const res = await fetch("http://localhost:5000/api/learningworldstopics", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(LearningWorldTopicSlideData),
  });

  if (!res.ok) throw new Error("Failed to create item");
  return res.json();
}

// get topic details
export const getLearningworldTopicsDetailsById = async (id: string) => {
  const res = await fetch(
    `http://localhost:5000/api/learningworldstopics/details/${id}`,
  );

  if (!res.ok) throw new Error("Failed to fetch learning worlds");

  return res.json();
};

// get all learning world topics
export const getLearningworldTopics = async (id: string) => {
  const res = await fetch(
    `http://localhost:5000/api/learningworldstopics/${id}`,
  );

  if (!res.ok) throw new Error("Failed to fetch learning worlds");

  return res.json();
};

// update the learning world topic
export async function updateLearningWorldTopic(
  LearningWorldTopicData: LearningWorldTopicDataProp,
  id: string,
) {
  const res = await fetch(
    `http://localhost:5000/api/learningworldstopics/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(LearningWorldTopicData),
    },
  );

  if (!res.ok) throw new Error("Failed to create item");
  return res.json();
}

// update the learning world topic
export async function deleteLearningWorldTopic(id: string) {
  const res = await fetch(
    `http://localhost:5000/api/learningworldstopics/${id}`,
    {
      method: "DELETE",
    },
  );

  if (!res.ok) throw new Error("Failed to delete item");
  return res.json();
}
