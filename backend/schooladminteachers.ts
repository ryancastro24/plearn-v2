export const getSchoolTeachers = async () => {
  try {
    const res = await fetch(
      `http://localhost:5000/api/users/school/employees`,
      {
        credentials: "include",
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to fetch teachers");
    }

    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error("getSchoolTeachers error:", error);
    throw new Error(
      error.message || "Something went wrong while fetching teachers",
    );
  }
};

// delete teachers
// delete item
export const deleteTeacher = async (id: string) => {
  const res = await fetch(`http://localhost:5000/api/users/teacher/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete item");
  }
  return res.json();
};

// deactivate / activate teacher
export const deactivateTeacher = async ({
  id,
  isActive,
  inactiveReason,
}: {
  id: string;
  isActive: boolean;
  inactiveReason?: string;
}) => {
  const res = await fetch(
    `http://localhost:5000/api/users/school/teacher/deactivate/${id}`,
    {
      method: "PATCH", // match backend
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isActive,
        inactiveReason,
      }),
    },
  );

  if (!res.ok) throw new Error("Failed to update teacher");
  return res.json();
};

export const suspendTeacher = async ({
  id,
  isSuspended,
  suspensionDate,
}: {
  id: string;
  isSuspended: boolean;
  suspensionDate?: string;
}) => {
  const res = await fetch(
    `http://localhost:5000/api/users/school/teacher/suspension/${id}`,
    {
      method: "PATCH", // match backend
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isSuspended,
        suspensionDate,
      }),
    },
  );

  if (!res.ok) throw new Error("Failed to update teacher");
  return res.json();
};
