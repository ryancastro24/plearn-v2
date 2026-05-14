"use client";

import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { getSectionsBySchoolQuery } from "@/lib/studentsectionsQueryOptions";
import ActivitiesComponent from "./ActivitiesComponent";
import { CircularCountProgress } from "./CircularCountProgress";
import CheckAttendanceModal from "./CheckAttendanceModal";
import { fetchSectionsDetailsQuery } from "@/lib/sectionsQueryOptions";
import { getAllStudentSectionsDataQuery } from "@/lib/studentsectionsQueryOptions";
import ClassMenuModal from "./ClassMenuModal";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { getRankByLevel } from "@/lib/rankLabels";
import { useState } from "react";

const TeacherSectionClientComponent = ({ sectionId }: any) => {
  const [openStudentDialog, setOpenStudentDialog] = useState(false);

  // ✅ Store the REAL student ID
  const [selectedStudentId, setSelectedStudentId] = useState("");

  const [studentDetails, setStudentDetails] = useState({
    firstname: "",
    lastname: "",
    level: null,
    birthdate: "",
    rank: "",
  });

  // ✅ Students list
  const { data, isPending, isError, error } = useQuery(
    getSectionsBySchoolQuery(sectionId),
  );

  // ✅ Section details
  const { data: sectionDetails } = useQuery(
    fetchSectionsDetailsQuery(sectionId),
  );

  // ✅ Student performance data
  const { data: studentCountData, isPending: studentDataPending } = useQuery({
    ...getAllStudentSectionsDataQuery(selectedStudentId),

    // ✅ Prevent query from running with empty ID
    enabled: !!selectedStudentId,
  });

  const studentCount = studentCountData?.data || null;

  if (isPending) {
    return <div>Loading students...</div>;
  }

  if (isError) {
    return <div>Error: {(error as Error).message}</div>;
  }

  const students = data?.data || [];

  // ✅ Open student details
  const handleOpenStudentDetails = (student: any, studentsectionId: string) => {
    setOpenStudentDialog(true);

    // ✅ THIS IS THE IMPORTANT FIX
    // Use the REAL student ID instead of item._id
    setSelectedStudentId(studentsectionId);

    const rank = getRankByLevel(student.level);

    setStudentDetails({
      firstname: student.firstname,
      lastname: student.lastname,
      level: student.level,
      birthdate: student.birthdate,
      rank,
    });
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-7 w-full gap-2">
        <div className="w-full col-span-5 flex flex-col gap-2">
          <h2>{sectionDetails?.data?.title}</h2>

          <div className="flex items-center w-full justify-between">
            <h2>Enrolled Student</h2>

            <div className="flex items-center gap-2">
              <CheckAttendanceModal students={students} sectionId={sectionId} />
              <ClassMenuModal sectionId={sectionId} />
            </div>
          </div>

          {students.length === 0 ? (
            <h2>No students available</h2>
          ) : (
            <div className="flex items-center gap-4 flex-wrap">
              {students?.map((item: any) => {
                const student = item?.enrolledStudentId?.studentId;

                return (
                  <div
                    key={item._id}
                    className="bg-white p-2 rounded shadow flex items-center gap-2 cursor-pointer"
                    onClick={() => handleOpenStudentDetails(student, item._id)}
                  >
                    <div className="rounded-full w-8 h-8 bg-gray-100"></div>

                    <div>
                      <h2 className="text-sm">
                        {student?.firstname} {student?.lastname}
                      </h2>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ✅ Student Details Dialog */}
        <Dialog open={openStudentDialog} onOpenChange={setOpenStudentDialog}>
          <DialogContent className="max-w-150">
            <DialogHeader>
              <DialogTitle>Student Details</DialogTitle>
            </DialogHeader>

            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-gray-100"></div>

              <div className="flex flex-col gap-1">
                <h2>
                  {studentDetails?.firstname} {studentDetails?.lastname}
                </h2>

                <span className="text-xs">
                  Level {studentDetails?.level} | {studentDetails?.rank}
                </span>

                <span className="text-xs">
                  Birthdate: {studentDetails?.birthdate}
                </span>
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="text-xs">
                {studentDetails.firstname}'s performance
              </h2>

              {studentDataPending ? (
                <h2>Fetching details...</h2>
              ) : (
                <div className="flex justify-between items-center">
                  {/* Attendance */}
                  <div className="flex flex-col items-center">
                    <CircularCountProgress
                      userCount={studentCount?.attendanceCount || 0}
                      actualCount={sectionDetails?.data?.attendanceCount || 0}
                      size={150}
                      strokeWidth={15}
                      color="#FF5B5B"
                      bgColor="#F3F4F6"
                    />

                    <h2 className="text-sm">Attendance</h2>
                  </div>

                  {/* Quizzes */}
                  <div className="flex flex-col items-center">
                    <CircularCountProgress
                      userCount={studentCount?.quizzesCount || 0}
                      actualCount={sectionDetails?.data?.quizzesCount || 0}
                      size={150}
                      strokeWidth={15}
                      color="#FF5B5B"
                      bgColor="#F3F4F6"
                    />

                    <h2 className="text-sm">Quizzes</h2>
                  </div>

                  {/* Assignments */}
                  <div className="flex flex-col items-center">
                    <CircularCountProgress
                      userCount={studentCount?.assignmentCount || 0}
                      actualCount={sectionDetails?.data?.assignmentCount || 0}
                      size={150}
                      strokeWidth={15}
                      color="#FF5B5B"
                      bgColor="#F3F4F6"
                    />

                    <h2 className="text-sm">Assignments</h2>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        <div className="w-full col-span-2 rounded-xl bg-gray-200 p-4">
          <ActivitiesComponent sectionId={sectionId} />
        </div>
      </div>
    </div>
  );
};

export default TeacherSectionClientComponent;
