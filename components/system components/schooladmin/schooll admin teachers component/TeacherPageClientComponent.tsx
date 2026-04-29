"use client";

import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getSchoolTeachersQuery } from "@/lib/schooladminteachersQueryOptions";
import { useUser } from "@/lib/userContext";
import AddNewTeacherModal from "./AddNewTeacherModal";
import TeacherCard from "./TeacherCard";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

type Teacher = {
  _id: string;
  firstname: string;
  middlename: string;
  lastname: string;
  suffix: string;
  schoolIdNumber: string;
  avatar?: string;
};

const TeacherPageClientComponent = () => {
  const { user } = useUser(); // ✅ make sure your context exposes this
  const schoolId = user?.schoolId;

  const {
    data: teachers,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    ...getSchoolTeachersQuery(),
  });

  // ⏳ 3. TEACHERS LOADING
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <Spinner />
      </div>
    );
  }

  // ❌ ERROR
  if (isError) {
    return (
      <div className="p-4 text-sm text-red-500">
        Failed to load teachers.
        <button onClick={() => refetch()} className="ml-2 underline">
          Retry
        </button>
      </div>
    );
  }

  // ✅ SUCCESS
  return (
    <div>
      <h1 className="mb-4">Teachers</h1>

      <div className="flex items-center gap-2">
        <InputGroup className="w-125">
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>

        <AddNewTeacherModal schoolid={schoolId} />
      </div>

      {teachers.data.length === 0 ? (
        <div className="mt-8 text-center text-gray-500">
          No teachers found. Click "Add New Teacher" to create one.
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-3">
        {teachers.data.map((teacher: Teacher) => (
          <TeacherCard key={teacher._id} teacher={teacher} />
        ))}
      </div>
    </div>
  );
};

export default TeacherPageClientComponent;
