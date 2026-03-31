"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import { Search } from "lucide-react";
import AddNewSchoolEmployeeModal from "./AddNewSchoolEmployeeModal";
import { CiMenuKebab } from "react-icons/ci";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const employees = [
  {
    id: "12345",
    name: "Juan Dela Cruz",
    position: "Teacher II",
    points: "10,250",
  },
  {
    id: "12346",
    name: "Maria Santos",
    position: "Principal I",
    points: "15,600",
  },
  {
    id: "12347",
    name: "Pedro Reyes",
    position: "Administrative Aide",
    points: "8,900",
  },
];

const SchoolEmployeesTableData = () => {
  return (
    <div className="w-full rounded border border-black/10 p-3 shadow shadow-black/30">
      {/* Header */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-sm font-semibold">School Employees</h2>

        <div className="flex w-full \ gap-2 sm:w-auto sm:flex-row sm:items-center">
          <InputGroup className="w-full">
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon>
              <Search className="h-4 w-4" />
            </InputGroupAddon>
          </InputGroup>
        </div>

        <AddNewSchoolEmployeeModal />
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block">
        <Table>
          <TableCaption>Available school employees</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-30">School Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Position</TableHead>
              <TableHead className="text-right">Points</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell className="font-medium">{employee.id}</TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.position}</TableCell>
                <TableCell className="text-right">{employee.points}</TableCell>
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
        {employees.map((employee) => (
          <details
            key={employee.id}
            className="rounded-lg border border-black/10 bg-white p-3 shadow-sm"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-medium">{employee.name}</p>
                <p className="text-xs text-gray-500">{employee.position}</p>
              </div>

              <span className="text-xs font-medium text-[#507FFF]">
                View Details
              </span>
            </summary>

            <div className="mt-3 space-y-2 border-t pt-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">School ID</span>
                <span className="font-medium">{employee.id}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-500">Name</span>
                <span className="font-medium text-right">{employee.name}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-500">Position</span>
                <span className="font-medium text-right">
                  {employee.position}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-500">Points</span>
                <span className="font-medium">{employee.points}</span>
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

export default SchoolEmployeesTableData;
