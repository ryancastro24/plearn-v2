"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { LuPlus } from "react-icons/lu";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CiMenuKebab } from "react-icons/ci";
import AddNewSchoolStudentModal from "./AddNewSchoolStudentModal";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const students = [
  {
    id: "12345",
    name: "Juan Dela Cruz",
    gradeLevel: "Grade III",
    points: "10,250",
  },
  {
    id: "12346",
    name: "Maria Santos",
    gradeLevel: "Grade V",
    points: "9,800",
  },
  {
    id: "12347",
    name: "Pedro Reyes",
    gradeLevel: "Grade II",
    points: "11,300",
  },
];

const SchoolStudentTableData = () => {
  return (
    <div className="w-full rounded border border-black/10 p-3 shadow shadow-black/30">
      {/* Header */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-sm font-semibold">Enrolled Students</h2>

        <div className="flex w-full  gap-2 sm:w-auto sm:flex-row sm:items-center">
          <InputGroup className="w-full sm:w-40">
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon>
              <Search className="h-4 w-4" />
            </InputGroupAddon>
          </InputGroup>

          <AddNewSchoolStudentModal />
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <Table>
          <TableCaption>Available enrolled students</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-30">School Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Grade Level</TableHead>
              <TableHead className="text-right">Points</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {students.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="font-medium">{student.id}</TableCell>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.gradeLevel}</TableCell>
                <TableCell className="text-right">{student.points}</TableCell>
                <TableCell className="text-center">
                  <button className="inline-flex items-center justify-center">
                    <CiMenuKebab />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Dropdown Cards */}
      <div className="flex flex-col gap-3 md:hidden">
        {students.map((student) => (
          <details
            key={student.id}
            className="rounded-lg border border-black/10 bg-white p-3 shadow-sm"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-medium">{student.name}</p>
                <p className="text-xs text-gray-500">{student.gradeLevel}</p>
              </div>

              <span className="text-xs font-medium text-[#507FFF]">
                View Details
              </span>
            </summary>

            <div className="mt-3 space-y-2 border-t pt-3 text-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="text-gray-500">School ID</span>
                <span className="font-medium">{student.id}</span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-gray-500">Name</span>
                <span className="text-right font-medium">{student.name}</span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-gray-500">Grade Level</span>
                <span className="text-right font-medium">
                  {student.gradeLevel}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-gray-500">Points</span>
                <span className="font-medium">{student.points}</span>
              </div>

              <div className="flex justify-end pt-2">
                <button className="inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-100">
                  <CiMenuKebab />
                </button>
              </div>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
};

export default SchoolStudentTableData;
