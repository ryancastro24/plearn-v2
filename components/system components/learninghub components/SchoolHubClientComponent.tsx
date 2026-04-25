"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import SchoolHubContainer from "@/components/system components/learninghub components/SchoolHubContainer";
import { getStudentPerSchoolQuery } from "@/lib/enrolledStudentQueryOptions";

const SchoolHubClientComponent = ({ schoolid }: any) => {
  const {
    data: enrolledStudents,
    isLoading,
    isError,
  } = useQuery(getStudentPerSchoolQuery(schoolid));

  // 🔥 Loading state
  if (isLoading) {
    return <div className="p-4">Loading school data...</div>;
  }

  // 🔥 Error state
  if (isError) {
    return <div className="p-4 text-red-500">Failed to load data</div>;
  }

  // 🔥 Empty state
  if (!enrolledStudents || enrolledStudents.length === 0) {
    return <div className="p-4">No students found in this school</div>;
  }

  // 🔥 Safe extraction (first item only used as reference)
  const school = enrolledStudents[0]?.schoolId;

  return (
    <div className="flex flex-col gap-5 p-4 w-full">
      {/* School Header */}
      <div className="flex items-center gap-4 mb-6">
        <Image
          src={school?.logo || "/fallback.png"}
          alt="school logo"
          width={60}
          height={60}
        />

        <div className="flex flex-col">
          <h2 className="text-lg font-bold">
            {school?.name || "Unknown School"}
          </h2>
          <h3 className="text-sm text-gray-500">
            {"ID#: " + school?.schoolId || "No ID"}
          </h3>
        </div>
      </div>

      {/* Pass safe data */}
      <SchoolHubContainer enrolledStudents={enrolledStudents} />
    </div>
  );
};

export default SchoolHubClientComponent;
