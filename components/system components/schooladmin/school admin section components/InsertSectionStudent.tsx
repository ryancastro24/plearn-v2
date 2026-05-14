"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getStudentPerSchoolYearLevelQuery } from "@/lib/enrolledStudentQueryOptions";
import { updateSectionStudents } from "@/backend/sections";
import { Button } from "@/components/ui/button";
import { FaChildren } from "react-icons/fa6";
import { toast } from "react-toastify";

const InsertSectionStudent = ({ grade, sectionId }: any) => {
  const queryClient = useQueryClient();

  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  // =========================
  // GET STUDENTS
  // =========================
  const {
    data: studentsData,
    isLoading,
    isFetching,
  } = useQuery({
    ...getStudentPerSchoolYearLevelQuery(grade),
    enabled: !!grade,
  });

  const students = studentsData?.data || studentsData || [];

  // =========================
  // MUTATION
  // =========================
  const { mutate, isPending } = useMutation({
    mutationFn: () => updateSectionStudents(sectionId, selectedStudents),

    onSuccess: (data) => {
      toast.success(data.message || "Students inserted successfully");

      // refetch section data
      queryClient.invalidateQueries({
        queryKey: ["sections"],
      });

      setSelectedStudents([]);
    },

    onError: (error: any) => {
      toast.error(error.message || "Failed to insert students");
    },
  });

  // =========================
  // TOGGLE STUDENT
  // =========================
  const toggleStudent = (id: string) => {
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  // =========================
  // TOGGLE ALL
  // =========================
  const toggleAllStudents = () => {
    if (selectedStudents.length === students.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(students.map((s: any) => s._id));
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size={"icon"}
            variant={"outline"}
            className="bg-[#FF5B5B] hover:bg-[#d63030] hover:text-white text-white"
          >
            <FaChildren />
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-150">
          <DialogHeader>
            <DialogTitle>
              Available Grade {grade[grade.length - 1]} students
            </DialogTitle>

            <DialogDescription>
              Select student and insert in the section
            </DialogDescription>
          </DialogHeader>

          {/* ========================= */}
          {/* LOADING */}
          {/* ========================= */}
          {isLoading || isFetching ? (
            <div className="text-sm">Loading students...</div>
          ) : (
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {/* SELECT ALL */}
              <div className="flex items-center gap-2 border-b pb-2 mb-2">
                <input
                  type="checkbox"
                  checked={
                    students.length > 0 &&
                    selectedStudents.length === students.length
                  }
                  onChange={toggleAllStudents}
                />

                <span className="text-sm font-medium">Select All</span>
              </div>

              {/* STUDENTS */}
              {students.map((s: any) => (
                <div key={s._id} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedStudents.includes(s._id)}
                    onChange={() => toggleStudent(s._id)}
                  />

                  <span>
                    {s?.studentId?.firstname} {s?.studentId?.lastname}
                  </span>
                </div>
              ))}

              {students.length === 0 && (
                <div className="text-sm text-muted-foreground">
                  No students found
                </div>
              )}
            </div>
          )}

          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <Button variant={"secondary"} disabled={isPending}>
                Cancel
              </Button>
            </DialogClose>

            <Button
              className="text-white bg-[#ff5b5b]"
              disabled={selectedStudents.length === 0 || isPending}
              onClick={() => mutate()}
            >
              {isPending ? "Inserting..." : "Insert Students"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InsertSectionStudent;
