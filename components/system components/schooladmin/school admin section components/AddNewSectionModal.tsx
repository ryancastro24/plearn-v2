"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getStudentPerSchoolYearLevelQuery } from "@/lib/enrolledStudentQueryOptions";
import { getSchoolTeachersForSectionQuery } from "@/lib/schooladminteachersQueryOptions";
import { createSection } from "@/backend/sections";
const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const AddNewSectionModal = () => {
  const [grade, setGrade] = useState("");
  const [teacherId, setTeacherId] = useState("");
  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  // =========================
  // FETCH STUDENTS
  // =========================
  const {
    data: studentsData,
    isLoading,
    isFetching,
  } = useQuery({
    ...getStudentPerSchoolYearLevelQuery(grade),
    enabled: !!grade,
  });

  const {
    data: teachersData,
    isLoading: teacherLoading,
    isFetching: teacherFetching,
  } = useQuery({
    ...getSchoolTeachersForSectionQuery(),
  });

  const students = studentsData?.data || studentsData || [];
  const teachers = teachersData?.data || teachersData || [];
  // =========================
  // TOGGLES
  // =========================
  const toggleStudent = (id: string) => {
    setSelectedStudents((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const toggleAllStudents = () => {
    if (selectedStudents.length === students.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(students.map((s: any) => s._id));
    }
  };

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  // =========================
  // TIME FORMAT
  // =========================
  const formatTime = (time: string) => {
    const [hour, minute] = time.split(":");
    const h = parseInt(hour);
    const ampm = h >= 12 ? "PM" : "AM";
    const formattedHour = h % 12 || 12;
    return `${formattedHour}:${minute} ${ampm}`;
  };

  const isTimeValid = startTime && endTime && startTime < endTime;

  // =========================
  // MUTATION (SUBMIT)
  // =========================
  const { mutate: createSectionMutation, isPending: createSectionPending } =
    useMutation({
      mutationFn: createSection,
      onSuccess() {
        toast.success("Section added succesfully");
      },
      onError(error: any) {
        toast.error(error.message);
      },
    });

  const handleSubmit = () => {
    if (!isTimeValid) return;

    const payload = {
      grade,
      teacherId,
      subject,
      title,
      description,
      startTime,
      endTime,
      workingdays: selectedDays,
      students: selectedStudents, // ✅ IMPORTANT
    };

    createSectionMutation(payload);
  };

  // =========================
  // UI
  // =========================
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#685AFF] text-white">Add new section</Button>
      </DialogTrigger>

      <DialogContent className="max-w-200">
        <DialogHeader>
          <DialogTitle>Create new section</DialogTitle>
          <DialogDescription>
            Configure schedule, assign teacher and subject
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-7 gap-4">
          {/* LEFT */}
          <div className="space-y-4 col-span-3 w-full">
            <div className="flex flex-col gap-1">
              <Label>Grade Level</Label>
              <Select
                onValueChange={(val) => {
                  setGrade(val);
                  setSelectedStudents([]);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pre-school">Pre-school</SelectItem>
                  <SelectItem value="grade1">Grade 1</SelectItem>
                  <SelectItem value="grade2">Grade 2</SelectItem>
                  <SelectItem value="grade3">Grade 3</SelectItem>
                  <SelectItem value="grade4">Grade 4</SelectItem>
                  <SelectItem value="grade5">Grade 5</SelectItem>
                  <SelectItem value="grade6">Grade 6</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* STUDENTS */}
            <div className="border rounded-lg p-3 h-100 overflow-y-auto bg-white">
              {!grade ? (
                <p className="text-sm text-gray-500">
                  Select a grade to load students
                </p>
              ) : isLoading || isFetching ? (
                <p className="text-sm text-gray-500">Loading students...</p>
              ) : students.length === 0 ? (
                <p className="text-sm text-gray-500">No students found</p>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 border-b pb-2 mb-2">
                    <input
                      type="checkbox"
                      checked={selectedStudents.length === students.length}
                      onChange={toggleAllStudents}
                    />
                    <span className="text-sm font-medium">Select All</span>
                  </div>

                  {students.map((s: any) => (
                    <div
                      key={s._id}
                      className="flex items-center gap-2 text-sm"
                    >
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
                </div>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="p-4 bg-gray-100 flex flex-col gap-3 rounded-xl col-span-4 w-full">
            <div className="flex justify-between gap-2">
              <div className="flex flex-col gap-1">
                <Label>Teacher</Label>
                <Select onValueChange={setTeacherId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select teacher" />
                  </SelectTrigger>
                  <SelectContent>
                    {teachers.map((val: any) => (
                      <SelectItem key={val._id} value={val._id}>
                        {val.firstname} {val.lastname}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1">
                <Label>Subject</Label>
                <Select onValueChange={setSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="math">Math</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Section title"
            />

            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
            />

            {/* TIME */}
            <div className="flex gap-2 items-center">
              <Input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
              <span>to</span>
              <Input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>

            {/* DAYS */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full">
                  {selectedDays.length
                    ? selectedDays.join(", ")
                    : "Select working days"}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-full p-2">
                {DAYS.map((day) => (
                  <div
                    key={day}
                    onClick={() => toggleDay(day)}
                    className="p-2 cursor-pointer hover:bg-gray-100 rounded-md flex justify-between"
                  >
                    {day}
                    {selectedDays.includes(day) && "✓"}
                  </div>
                ))}
              </PopoverContent>
            </Popover>

            {/* SUBMIT */}
            <Button
              onClick={handleSubmit}
              disabled={
                !grade ||
                !teacherId ||
                !subject ||
                !title ||
                !isTimeValid ||
                selectedDays.length === 0 ||
                selectedStudents.length === 0
              }
              className="bg-[#685AFF]"
            >
              {createSectionPending ? "Creating section..." : "Create Section"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewSectionModal;
