"use client";

import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getSchoolDetailsQuery } from "@/lib/schoolQueryOptions";
import { getUserKids } from "@/lib/userQueryOptions";
import { useUser } from "@/lib/userContext";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { enrollNewStudents } from "@/backend/enrolledStudent";
import { toast } from "react-toastify";
import Image from "next/image";

const SchoolEnrollmentClientComponent = ({ id }: any) => {
  const { data: kidsData } = useQuery(getUserKids());
  const { user } = useUser();

  const { data: schoolDetails, isLoading } = useQuery(
    getSchoolDetailsQuery(id),
  );

  const [open, setOpen] = useState(true);

  const [selectedKid, setSelectedKid] = useState<string>("");
  const [selectedGrade, setSelectedGrade] = useState<string>("");

  const kids = kidsData?.data || kidsData || [];

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const gradeLevels = [
    "Kindergarten",
    "Grade 1",
    "Grade 2",
    "Grade 3",
    "Grade 4",
    "Grade 5",
    "Grade 6",
  ];

  // ✅ MUTATION (mock submit)
  const enrollMutation = useMutation({
    mutationFn: enrollNewStudents,
    onSuccess() {
      toast.success("Enrollment successfully");
    },

    onError(error) {
      toast.error(error.message);
    },
  });

  const handleEnrollSubmit = () => {
    const payload = {
      schoolId: id,
      studentId: selectedKid,
      gradeLevel: selectedGrade,
      parentId: user?._id,
    };

    enrollMutation.mutate(payload);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-5">
      {/* Auto Modal */}
      <Dialog open={open}>
        <DialogContent className="max-w-250 flex flex-col items-center bg-transparent border-0">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-white text-center">
              {schoolDetails.name}
            </DialogTitle>
          </DialogHeader>

          <Image
            src={schoolDetails.logo}
            alt="school logo"
            width={300}
            height={300}
          />

          <p>Where young minds grow and dreams take flight</p>
        </DialogContent>
      </Dialog>

      {/* Content */}
      {!open && schoolDetails && (
        <div>
          <div className="space-y-4 grid grid-cols-6 gap-5">
            <div className="col-span-2 flex flex-col items-center bg-linear-to-b shadow-md shadow-black/30 from-[#FF5B5B] to-[#F04886] rounded-lg p-3">
              <Image
                src={schoolDetails.logo}
                alt="school logo"
                width={200}
                height={200}
              />
              <h2 className="text-sm text-white">{schoolDetails.name}</h2>
              <span className="text-xs text-white">
                ID#: {schoolDetails.schoolId}
              </span>
            </div>

            <div className="col-span-4 flex flex-col gap-3">
              <div>
                <h3 className="font-semibold">Vision</h3>
                <p className="text-sm">{schoolDetails.vision}</p>
              </div>

              <div>
                <h3 className="font-semibold">Mission</h3>
                <p className="text-sm">{schoolDetails.mission}</p>
              </div>

              <div>
                <h3 className="font-semibold">Goals</h3>
                <p className="text-sm">{schoolDetails.goals}</p>
              </div>
            </div>
          </div>

          {/* ENROLL SECTION */}
          <div className="mt-8 p-4 border rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Enroll Now</h2>

            <div className="grid grid-cols-2 gap-4">
              {/* Kid */}
              <div>
                <label className="text-sm font-medium">Select Kid</label>
                <Select value={selectedKid} onValueChange={setSelectedKid}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a kid" />
                  </SelectTrigger>
                  <SelectContent>
                    {kids.map((kid: any) => (
                      <SelectItem key={kid._id} value={kid._id}>
                        {kid.firstname} {kid.lastname}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Grade */}
              <div>
                <label className="text-sm font-medium">Grade Level</label>
                <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade level" />
                  </SelectTrigger>
                  <SelectContent>
                    {gradeLevels.map((grade) => (
                      <SelectItem key={grade} value={grade}>
                        {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Submit */}
            <Button
              className="mt-5"
              onClick={handleEnrollSubmit}
              disabled={
                !selectedKid || !selectedGrade || enrollMutation.isPending
              }
            >
              {enrollMutation.isPending ? "Enrolling..." : "Proceed Enrollment"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolEnrollmentClientComponent;
