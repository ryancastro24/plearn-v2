"use client";
import { useParams } from "next/navigation";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useQuery } from "@tanstack/react-query";
import { getSchoolAdminEmployeesQuery } from "@/lib/userQueryOptions";
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

const SchoolEmployeesTableData = () => {
  const params = useParams<{ id: string }>();
  const schoolid = Array.isArray(params.id) ? params.id[0] : params.id;
  const { data: schooladminsData } = useQuery(
    getSchoolAdminEmployeesQuery(schoolid),
  );

  const schooladmins = schooladminsData?.data;
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
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {schooladmins?.map((employee: any) => (
              <TableRow key={employee._id}>
                <TableCell>{employee.username}</TableCell>
                <TableCell>{employee.email}</TableCell>
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
        {schooladmins?.map((employee: any) => (
          <details
            key={employee._id}
            className="rounded-lg border border-black/10 bg-white p-3 shadow-sm"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-medium">{employee.username}</p>
              </div>

              <span className="text-xs font-medium text-[#507FFF]">
                View Details
              </span>
            </summary>

            <div className="mt-3 space-y-2 border-t pt-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Username</span>
                <span className="font-medium text-right">
                  {employee.username}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-gray-500">Email</span>
                <span className="font-medium">{employee.email}</span>
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
