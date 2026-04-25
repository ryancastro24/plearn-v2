export const createReward = async (payload: any) => {
  try {
    const res = await fetch("http://localhost:5000/api/worldtopicrewards", {
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

// get all world topic rewards for a specific learning world
export const getWorldTopicRewards = async (learningworldId: string) => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/worldtopicrewards/${learningworldId}`,
    );

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

// update a reward by id
export const updateReward = async (payload: any, id: string) => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/worldtopicrewards/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // ✅ important
        },
        body: JSON.stringify(payload), // ✅ send JSON
      },
    );

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

// delete a reward by id
export const deleteReward = async (id: string) => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/worldtopicrewards/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json", // ✅ important
        },
      },
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to delete reward");
    }

    return data;
  } catch (error: any) {
    console.error("deleteReward error:", error);
    throw new Error(
      error.message || "Something went wrong while deleting reward",
    );
  }
};
