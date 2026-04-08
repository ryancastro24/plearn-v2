type TaskData = {
  description: string;
  category: string;
  points: number;
  deadlineDate: string;
  deadlineTime: string;
  remarks: string;
};

export const createNewTask = async (taskData: TaskData) => {
  const response = await fetch("http://localhost:5000/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(taskData),
  });

  // ✅ parse response body FIRST
  const data = await response.json();

  if (!response.ok) {
    // ✅ create custom error and attach backend data
    const err: any = new Error(data.message || "Request failed");
    err.missingFields = data.missingFields;
    err.status = response.status;

    throw err;
  }

  return data;
};

// get all kids task
export const getAllKidTasks = async (id: string) => {
  const res = await fetch(`http://localhost:5000/api/tasks/${id}`);

  if (!res.ok) throw new Error("Failed to fetch kid tasks");

  return res.json();
};

// delete specific task
export const deleteSpecificTask = async (id: string) => {
  const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
    method: "DELETE",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to delete task");
  }

  return data;
};
