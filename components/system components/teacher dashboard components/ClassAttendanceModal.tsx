"use client";
import { useState } from "react";
import KidCardAttendanceContainer from "./KidCardAttendanceContainer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const ClassAttendanceModal = () => {
  const kidsData = [
    {
      id: 1,
      name: "Juan Dela Cruz",
      image: "/dashboard assets/boy.jpg",
      gradeLevel: 2,
      attendanceStreakCount: 2,
    },
    {
      id: 2,
      name: "Juan Dela Cruz",
      image: "/dashboard assets/boy.jpg",
      gradeLevel: 2,
      attendanceStreakCount: 2,
    },
    {
      id: 3,
      name: "Juan Dela Cruz",
      image: "/dashboard assets/boy.jpg",
      gradeLevel: 2,
      attendanceStreakCount: 2,
    },
    {
      id: 4,
      name: "Juan Dela Cruz",
      image: "/dashboard assets/boy.jpg",
      gradeLevel: 2,
      attendanceStreakCount: 2,
    },
    {
      id: 5,
      name: "Juan Dela Cruz",
      image: "/dashboard assets/boy.jpg",
      gradeLevel: 2,
      attendanceStreakCount: 2,
    },
    {
      id: 6,
      name: "Juan Dela Cruz",
      image: "/dashboard assets/boy.jpg",
      gradeLevel: 2,
      attendanceStreakCount: 2,
    },
    {
      id: 7,
      name: "Maria Clara",
      image: "/dashboard assets/boy.jpg",
      gradeLevel: 2,
      attendanceStreakCount: 5,
    },
    {
      id: 8,
      name: "Pedro Santos",
      image: "/dashboard assets/boy.jpg",
      gradeLevel: 2,
      attendanceStreakCount: 1,
    },
  ];

  const ITEMS_PER_PAGE = 6;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(kidsData.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentKids = kidsData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="w-full h-full  bg-black/50 z-20 absolute inset-0 flex items-center justify-center">
      <div className="w-170 h-100 rounded-xl bg-white p-3 flex flex-col gap-3 relative">
        {/* Header */}
        <div>
          <h2 className="font-bold">Welcome to English Enhancement 101</h2>
          <h3 className="text-xs">
            Please check your students attendance before proceeding to a new
            journey
          </h3>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-2 ">
          {currentKids.map((val) => (
            <KidCardAttendanceContainer key={val.id} {...val} />
          ))}
        </div>

        <div className="absolute bottom-2 left-0 right-0 px-3 flex justify-between items-center">
          {/* Pagination Controls */}
          <div className="flex gap-5 items-center">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant={"secondary"}>Exit</Button>
            <Link href={"/class/2/class_details/sample_class_id"}>
              <Button className="text-white bg-[#ff5b5b]">
                Finish attendance
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassAttendanceModal;
