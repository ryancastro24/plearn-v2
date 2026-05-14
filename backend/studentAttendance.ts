export const submitStudentAttendance = async ({
  sectionId,
  students,
}: {
  sectionId: string;
  students: string[];
}) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/studentsectionattendances/`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          sectionId,
          students,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to submit attendance");
    }

    return data;
  } catch (error: any) {
    console.error("Submit Attendance Error:", error);

    throw error;
  }
};

// get student attendance dates
export const getStudentSectionAttendancesDate = async (id: string) => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/studentsectionattendances/attendance/${id}`,
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to get student attendance dates");
    }

    return data;
  } catch (error: any) {
    throw error;
  }
};

// get section attendance by date
export async function getSectionAttendanceByDate({
  sectionId,
  selectedDate,
}: {
  sectionId: string;
  selectedDate: string;
}) {
  const response = await fetch(
    `http://localhost:5000/api/studentsectionattendances/section/attendance/data?sectionId=${sectionId}&selectedDate=${selectedDate}`,
    {
      method: "GET",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch attendance");
  }

  return response.json();
}
