"use client";

import { useMemo, useState } from "react";
import { BsPersonFillCheck } from "react-icons/bs";
import { Check, Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitStudentAttendance } from "@/backend/studentAttendance";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

const CheckAttendanceModal = ({ students, sectionId }: any) => {
  const queryClient = useQueryClient();
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  // ✅ Toggle student selection
  const toggleStudent = (id: string) => {
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  // ✅ Dynamic selected count
  const selectedCount = useMemo(
    () => selectedStudents.length,
    [selectedStudents],
  );

  // ✅ Submit attendance mutation
  const attendanceMutation = useMutation({
    mutationFn: submitStudentAttendance,

    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["sectionDetails"] });
      toast.success(data?.message || "Attendance submitted successfully");

      // ✅ Reset selected students
      setSelectedStudents([]);
    },

    onError: (error: any) => {
      console.error("Attendance Error:", error);

      toast.error(error?.message || "Failed to submit attendance");
    },
  });

  // ✅ Submit handler
  const handleSubmitAttendance = () => {
    attendanceMutation.mutate({
      sectionId,
      students: selectedStudents,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="hover:scale-105 transition text-xs flex items-center gap-2"
        >
          <BsPersonFillCheck className="text-lg" />
          Check attendance
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Check Attendance Today
          </DialogTitle>

          <DialogDescription>
            Select students present for today&apos;s attendance.
          </DialogDescription>
        </DialogHeader>

        {/* HEADER */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-sm text-muted-foreground">
            Selected Students:
            <span className="font-bold text-black ml-1">{selectedCount}</span>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              if (selectedStudents.length === students?.length) {
                setSelectedStudents([]);
              } else {
                setSelectedStudents(students?.map((item: any) => item._id));
              }
            }}
          >
            {selectedStudents.length === students?.length
              ? "Unselect All"
              : "Select All"}
          </Button>
        </div>

        {/* STUDENT LIST */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-6 max-h-125 overflow-y-auto pr-2">
          {students?.map((item: any) => {
            const studentId = item._id;

            const isSelected = selectedStudents.includes(studentId);

            return (
              <button
                key={studentId}
                type="button"
                onClick={() => toggleStudent(studentId)}
                className={`
                  relative
                  text-left
                  rounded-2xl
                  border
                  p-4
                  transition-all
                  duration-200
                  hover:scale-[1.02]
                  hover:shadow-lg

                  ${
                    isSelected
                      ? "border-green-500 bg-green-50 shadow-md"
                      : "border-gray-200 bg-white"
                  }
                `}
              >
                {/* CHECK ICON */}
                <div
                  className={`
                    absolute
                    top-3
                    right-3
                    w-6
                    h-6
                    rounded-full
                    flex
                    items-center
                    justify-center
                    transition-all

                    ${
                      isSelected
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-transparent"
                    }
                  `}
                >
                  <Check size={14} />
                </div>

                {/* USER INFO */}
                <div className="flex items-center gap-3">
                  {/* AVATAR */}
                  <div
                    className={`
                      w-12
                      h-12
                      rounded-full
                      flex
                      items-center
                      justify-center
                      text-lg
                      font-bold

                      ${
                        isSelected
                          ? "bg-green-500 text-white"
                          : "bg-gray-100 text-gray-700"
                      }
                    `}
                  >
                    {item.enrolledStudentId.studentId.firstname?.[0]}
                    {item.enrolledStudentId.studentId.lastname?.[0]}
                  </div>

                  {/* DETAILS */}
                  <div>
                    <h2 className="font-semibold text-sm">
                      {item.enrolledStudentId.studentId.firstname}{" "}
                      {item.enrolledStudentId.studentId.lastname}
                    </h2>

                    <p className="text-xs text-muted-foreground">
                      ID: {studentId}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* FOOTER */}
        <div className="flex justify-end mt-6">
          <Button
            disabled={
              selectedStudents.length === 0 || attendanceMutation.isPending
            }
            onClick={handleSubmitAttendance}
            className="min-w-55 h-12 text-base font-semibold"
          >
            {attendanceMutation.isPending ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                Submitting Attendance...
              </>
            ) : (
              `Submit Attendance Now (${selectedCount})`
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckAttendanceModal;
