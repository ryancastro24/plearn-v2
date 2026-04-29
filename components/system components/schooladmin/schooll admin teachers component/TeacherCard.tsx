"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RiInformation2Fill } from "react-icons/ri";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EditTeacherDetailsModal from "./EditTeacherDetailsModal";
import SetTeacherSuspensionDialog from "./SetTeacherSuspensionDialog";
import DeleteTeacherDialog from "./DeleteTeacherDialog";
import SetTeacherAccessDialog from "./SetTeacherAccessDialog";
export const getDaysRemaining = (targetDate: string) => {
  if (!targetDate) return null;

  const today = new Date();
  const target = new Date(targetDate);

  // reset time to avoid timezone/time-of-day issues
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

export const getDaysRemainingText = (targetDate: string) => {
  const days = getDaysRemaining(targetDate);

  if (days === null) return "No date set";
  if (days > 1) return `${days} days remaining`;
  if (days === 1) return "1 day remaining";
  if (days === 0) return "Due today";
  return `${Math.abs(days)} days overdue`;
};
const TeacherCard = ({ teacher }: any) => {
  const [editDetailsOpen, setEditDetailsOpen] = useState(false);
  const [accessDialogOpen, setAccessDialogOpen] = useState(false);
  const [suspensionDialogOpen, setSuspensionDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const isInactive = !teacher?.isActive;

  return (
    <>
      <div
        className={`
          relative  rounded-xl p-4 transition
          border shadow-sm hover:shadow-md
          ${isInactive ? "bg-red-100 border-red-500" : "bg-white"}
        `}
      >
        <div className="flex flex-col gap-3">
          <div className="flex justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                {teacher.avatar && (
                  <Image
                    src={teacher.avatar}
                    alt={teacher.lastname}
                    className="w-full h-full object-cover"
                    width={40}
                    height={40}
                  />
                )}
              </div>

              <div>
                <p className="font-medium">
                  {teacher.firstname} {teacher.middlename?.[0]}.{" "}
                  {teacher.lastname}
                </p>
                <p className="text-xs text-gray-500">
                  {teacher.schoolIdNumber}
                </p>
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="sm"
                  className="text-gray-500 hover:bg-gray-200 hover:text-black transition"
                >
                  <RiInformation2Fill className="text-xl" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>Action</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => setEditDetailsOpen(true)}>
                    Edit Details
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setAccessDialogOpen(true)}>
                    Set Access
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => setSuspensionDialogOpen(true)}
                  >
                    Suspension
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={() => setDeleteDialogOpen(true)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div>
            {teacher.suspension.isSuspended && (
              <span className=" text-sm bg-yellow-200 text-yellow-800 px-1.5 py-0.5 rounded">
                Suspension: {getDaysRemainingText(teacher.suspension.until)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <EditTeacherDetailsModal
        editDetailsOpen={editDetailsOpen}
        setEditDetailsOpen={setEditDetailsOpen}
      />

      <SetTeacherSuspensionDialog
        isSuspended={false}
        teacherName={`${teacher.firstname} ${teacher.lastname}`}
        suspensionDialogOpen={suspensionDialogOpen}
        setSuspensionDialogOpen={setSuspensionDialogOpen}
        teacherId={teacher._id}
      />

      <DeleteTeacherDialog
        deleteDialogOpen={deleteDialogOpen}
        setDeleteDialogOpen={setDeleteDialogOpen}
        teacherId={teacher._id}
        teacherName={`${teacher.firstname} ${teacher.lastname}`}
      />

      <SetTeacherAccessDialog
        teacherName={`${teacher.firstname} ${teacher.lastname}`}
        teacherId={teacher._id}
        accessDialogOpen={accessDialogOpen}
        setAccessDialogOpen={setAccessDialogOpen}
        hasAccess={teacher.isActive}
      />
    </>
  );
};

export default TeacherCard;
