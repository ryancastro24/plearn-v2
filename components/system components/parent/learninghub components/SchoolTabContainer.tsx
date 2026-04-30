"use client";
import SchoolTab from "./SchoolTab";
import { useQuery } from "@tanstack/react-query";
import { getEnrolledStudentByParentIdQuery } from "@/lib/enrolledStudentQueryOptions";
import { useUser } from "@/lib/userContext";
const SchoolTabContainer = () => {
  const { user } = useUser();

  const { data: enrolledSchools } = useQuery(
    getEnrolledStudentByParentIdQuery(),
  );

  console.log("enrolled stores", enrolledSchools);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {enrolledSchools?.map((val: any) => (
        <SchoolTab
          key={val._id}
          logo={val.schoolId.logo}
          name={val.schoolId.name}
          id={val.schoolId._id}
          schoolId={val.schoolId.schoolId}
        />
      ))}
    </div>
  );
};

export default SchoolTabContainer;
