"use client";

import { useQuery } from "@tanstack/react-query";
import { getSchoolStudentsQuery } from "@/lib/schooladminstudentQueryOptions";
import { useState, useMemo } from "react";
import PendingStudentsEnrollment from "./PendingStudentsEnrollment";
import EnrolledStudents from "./EnrolledStudents";

const PAGE_SIZE = 10;

const StudentClientComponent = () => {
  const { data, isLoading, isError, error } = useQuery(
    getSchoolStudentsQuery(),
  );

  const students = data?.data || [];

  const [pendingSearch, setPendingSearch] = useState("");
  const [pendingGrade, setPendingGrade] = useState("All");

  const [enrolledSearch, setEnrolledSearch] = useState("");
  const [enrolledGrade, setEnrolledGrade] = useState("All");

  const [pagePending, setPagePending] = useState(1);
  const [pageAll, setPageAll] = useState(1);

  const pendingRaw = students.filter((s: any) => !s.isEnrolled);
  const enrolledRaw = students.filter((s: any) => s.isEnrolled);

  const pendingFiltered = useMemo(() => {
    return pendingRaw.filter((s: any) => {
      const name =
        `${s?.studentId?.firstname || ""} ${s?.studentId?.lastname || ""}`.toLowerCase();
      const id = (s?.studentSchoolIdNumber || "").toLowerCase();

      return (
        (name.includes(pendingSearch.toLowerCase()) ||
          id.includes(pendingSearch.toLowerCase())) &&
        (pendingGrade === "All" || s.gradeLevel === pendingGrade)
      );
    });
  }, [pendingRaw, pendingSearch, pendingGrade]);

  const enrolledFiltered = useMemo(() => {
    return enrolledRaw.filter((s: any) => {
      const name =
        `${s?.studentId?.firstname || ""} ${s?.studentId?.lastname || ""}`.toLowerCase();
      const id = (s?.studentSchoolIdNumber || "").toLowerCase();

      return (
        (name.includes(enrolledSearch.toLowerCase()) ||
          id.includes(enrolledSearch.toLowerCase())) &&
        (enrolledGrade === "All" || s.gradeLevel === enrolledGrade)
      );
    });
  }, [enrolledRaw, enrolledSearch, enrolledGrade]);

  const paginate = (data: any[], page: number) => {
    const start = (page - 1) * PAGE_SIZE;
    return data.slice(start, start + PAGE_SIZE);
  };

  const pendingPaginated = paginate(pendingFiltered, pagePending);
  const enrolledPaginated = paginate(enrolledFiltered, pageAll);

  const totalPendingPages = Math.ceil(pendingFiltered.length / PAGE_SIZE);
  const totalAllPages = Math.ceil(enrolledFiltered.length / PAGE_SIZE);

  return (
    <div className="space-y-10 w-full">
      {isError && (
        <p className="text-red-500">
          {(error as any)?.message || "Something went wrong"}
        </p>
      )}

      {isLoading && <p>Loading students...</p>}

      {/* 🔴 PENDING */}
      {!isLoading && (
        <PendingStudentsEnrollment
          pendingSearch={pendingSearch}
          setPendingSearch={setPendingSearch}
          pagePending={pagePending}
          setPagePending={setPagePending}
          totalPendingPages={totalPendingPages}
          pendingPaginated={pendingPaginated}
          pendingGrade={pendingGrade}
          setPendingGrade={setPendingGrade}
        />
      )}

      {/* 🟢 ENROLLED */}
      {!isLoading && (
        <EnrolledStudents
          enrolledSearch={enrolledSearch}
          setEnrolledSearch={setEnrolledSearch}
          pageAll={pageAll}
          setPageAll={setPageAll}
          totalAllPages={totalAllPages}
          enrolledPaginated={enrolledPaginated}
          enrolledGrade={enrolledGrade}
          setEnrolledGrade={setEnrolledGrade}
        />
      )}
    </div>
  );
};

export default StudentClientComponent;
