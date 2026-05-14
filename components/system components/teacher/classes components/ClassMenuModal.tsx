"use client";

import { useMemo, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, Trophy, TrendingDown, TrendingUp } from "lucide-react";
import { CgMenuGridO } from "react-icons/cg";
import { useMutation } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getStudentSectionAttendancesDateQuery } from "@/lib/studentsectionAttendanceQueryOptions";
import { getSectionAttendanceByDate } from "@/backend/studentAttendance";
const ClassMenuModal = ({ sectionId }: { sectionId: string }) => {
  const { data: sectionAttendances } = useQuery(
    getStudentSectionAttendancesDateQuery(sectionId),
  );

  const attendances = sectionAttendances?.dates || [];
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  // SEARCH STUDENT INSIDE ATTENDANCE RECORD
  const [studentSearch, setStudentSearch] = useState("");
  // DATE PICKER STATE
  const [calendarDate, setCalendarDate] = useState<Date>();

  const {
    mutate: studentAttendanceDateMutate,
    data: attendanceDateData,
    isPending: attendanceDateDataPending,
    error,
  } = useMutation({
    mutationFn: getSectionAttendanceByDate,
  });

  const handleSubmitAttendanceDate = (date: string) => {
    studentAttendanceDateMutate({
      selectedDate: date,
      sectionId: sectionId!,
    });
  };

  console.log("attendance data:", attendanceDateData);
  // MOCK STUDENT DATA
  const students = [
    {
      name: "Student A",
      attendance: 98,
      performance: "fast",
      score: 95,
      status: "Present",
    },
    {
      name: "Student B",
      attendance: 92,
      performance: "fast",
      score: 90,
      status: "Absent",
    },
    {
      name: "Student C",
      attendance: 71,
      performance: "slow",
      score: 68,
      status: "Present",
    },
    {
      name: "Student D",
      attendance: 80,
      performance: "slow",
      score: 74,
      status: "Late",
    },
  ];

  const attendancesData = attendanceDateData?.attendances || null;

  // FILTER STUDENTS
  const filteredStudents = useMemo(() => {
    if (!attendancesData) return [];

    return attendancesData.filter((student: any) => {
      const studentInfo =
        student?.studentSectionId?.enrolledStudentId?.studentId;

      const fullName = `
      ${studentInfo?.firstname || ""}
      ${studentInfo?.lastname || ""}
    `
        .toLowerCase()
        .trim();

      return fullName.includes(studentSearch.toLowerCase().trim());
    });
  }, [attendancesData, studentSearch]);

  const fastLearners = students.filter(
    (student) => student.performance === "fast",
  );

  const slowLearners = students.filter(
    (student) => student.performance === "slow",
  );

  const leaderboard = [...students].sort((a, b) => b.score - a.score);

  // HANDLE DATE PICK
  const handleDateSelect = (date: Date | undefined) => {
    setCalendarDate(date);

    if (!date) return;

    const formatted = format(date, "yyyy-MM-dd");

    const found = attendances.find(
      (attendance: string) => attendance === formatted,
    );

    if (found) {
      setSelectedDate(found);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline">
          <CgMenuGridO />
        </Button>
      </DialogTrigger>

      <DialogContent className=" max-w-250 h-[90vh] flex flex-col overflow-hidden p-0">
        {/* HEADER */}
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="text-2xl font-bold">
            Class Analytics Dashboard
          </DialogTitle>
        </DialogHeader>

        <Tabs
          defaultValue="attendance"
          className="flex flex-col flex-1 overflow-hidden"
        >
          {/* TOP NAVIGATION */}
          <div className="border-b px-6 py-3">
            <TabsList className="grid grid-cols-3 w-full max-w-2xl">
              <TabsTrigger value="attendance">Attendance Records</TabsTrigger>

              <TabsTrigger value="performance">Kids Performance</TabsTrigger>

              <TabsTrigger value="leaderboards">Leaderboards</TabsTrigger>
            </TabsList>
          </div>

          {/* ================================================= */}
          {/* ATTENDANCE TAB */}
          {/* ================================================= */}
          <TabsContent
            value="attendance"
            className="flex-1 overflow-hidden m-0"
          >
            <div className="flex gap-4 h-full p-6 overflow-hidden">
              {/* LEFT PANEL */}
              <div className="w-87.5 border rounded-2xl flex flex-col overflow-hidden">
                {/* DATE PICKER */}
                <div className="p-4 border-b">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !calendarDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />

                        {calendarDate ? (
                          format(calendarDate, "PPP")
                        ) : (
                          <span>Select attendance date</span>
                        )}
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={calendarDate}
                        onSelect={handleDateSelect}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* DATE LIST */}
                <div className="flex-1 overflow-y-auto">
                  {attendances.length === 0 ? (
                    <p className="p-4 text-sm text-muted-foreground">
                      No attendance records found
                    </p>
                  ) : (
                    attendances.map((date: string) => (
                      <button
                        key={date}
                        onClick={() => {
                          (setSelectedDate(date),
                            handleSubmitAttendanceDate(date));
                        }}
                        className={`w-full text-left px-4 py-3 border-b transition hover:bg-muted ${
                          selectedDate === date ? "bg-muted font-semibold" : ""
                        }`}
                      >
                        {date}
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* RIGHT PANEL */}
              <div className="flex-1 border rounded-2xl p-5 overflow-y-auto">
                {!selectedDate ? (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    Select a date to view attendance
                  </div>
                ) : (
                  <div>
                    {/* HEADER */}
                    <div className="flex items-center justify-between mb-5">
                      <div>
                        <h2 className="text-2xl font-bold">{selectedDate}</h2>

                        <p className="text-muted-foreground text-sm">
                          Student attendance records
                        </p>
                      </div>

                      <Badge variant="secondary">
                        {filteredStudents?.length} Students
                      </Badge>
                    </div>

                    {/* SEARCH STUDENT */}
                    <div className="mb-5">
                      <Input
                        placeholder="Search student..."
                        value={studentSearch}
                        onChange={(e) => setStudentSearch(e.target.value)}
                      />
                    </div>

                    {/* STUDENT LIST */}
                    <div className="space-y-3">
                      {filteredStudents?.length === 0 ? (
                        <div className="border rounded-xl p-6 text-center text-muted-foreground">
                          No student found
                        </div>
                      ) : (
                        filteredStudents?.map((student: any) => (
                          <div
                            key={student._id}
                            className="flex items-center justify-between border rounded-xl p-4"
                          >
                            <div>
                              <h3 className="font-medium">
                                {
                                  student?.studentSectionId?.enrolledStudentId
                                    ?.studentId?.firstname
                                }{" "}
                                {
                                  student?.studentSectionId?.enrolledStudentId
                                    ?.studentId?.lastname
                                }
                              </h3>

                              <p className="text-sm text-muted-foreground">
                                Attendance Rate: {student.attendance}%
                              </p>
                            </div>

                            <Badge
                              variant={
                                student.status === "Present"
                                  ? "default"
                                  : student.status === "Late"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {student.status}
                            </Badge>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          {/* PERFORMANCE TAB */}
          <TabsContent
            value="performance"
            className="flex-1 overflow-y-auto m-0"
          >
            <div className="grid grid-cols-2 gap-6 p-6">
              {/* FAST */}
              <div className="border rounded-2xl overflow-hidden">
                <div className="flex items-center gap-2 border-b p-4">
                  <TrendingUp className="w-5 h-5" />

                  <div>
                    <h2 className="font-bold text-lg">Fast Learners</h2>

                    <p className="text-sm text-muted-foreground">
                      Performing above average
                    </p>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  {fastLearners.map((student) => (
                    <div
                      key={student.name}
                      className="border rounded-xl p-4 flex items-center justify-between"
                    >
                      <div>
                        <h3 className="font-medium">{student.name}</h3>

                        <p className="text-sm text-muted-foreground">
                          Score: {student.score}
                        </p>
                      </div>

                      <Badge>Excellent</Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* SLOW */}
              <div className="border rounded-2xl overflow-hidden">
                <div className="flex items-center gap-2 border-b p-4">
                  <TrendingDown className="w-5 h-5" />

                  <div>
                    <h2 className="font-bold text-lg">Needs Improvement</h2>

                    <p className="text-sm text-muted-foreground">
                      Students needing guidance
                    </p>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  {slowLearners.map((student) => (
                    <div
                      key={student.name}
                      className="border rounded-xl p-4 flex items-center justify-between"
                    >
                      <div>
                        <h3 className="font-medium">{student.name}</h3>

                        <p className="text-sm text-muted-foreground">
                          Score: {student.score}
                        </p>
                      </div>

                      <Badge variant="destructive">Monitor</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* LEADERBOARDS */}
          <TabsContent
            value="leaderboards"
            className="flex-1 overflow-y-auto m-0"
          >
            <div className="p-6">
              <div className="border rounded-2xl overflow-hidden">
                {/* HEADER */}
                <div className="border-b p-5 flex items-center gap-2">
                  <Trophy className="w-6 h-6" />

                  <div>
                    <h2 className="text-xl font-bold">Student Rankings</h2>

                    <p className="text-sm text-muted-foreground">
                      Based on attendance and performance
                    </p>
                  </div>
                </div>

                {/* RANK LIST */}
                <div className="divide-y">
                  {leaderboard.map((student, index) => (
                    <div
                      key={student.name}
                      className="flex items-center justify-between p-5"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full border flex items-center justify-center font-bold">
                          #{index + 1}
                        </div>

                        <div>
                          <h3 className="font-semibold">{student.name}</h3>

                          <p className="text-sm text-muted-foreground">
                            Attendance: {student.attendance}%
                          </p>
                        </div>
                      </div>

                      <Badge className="text-sm px-4 py-1">
                        {student.score} pts
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default ClassMenuModal;
