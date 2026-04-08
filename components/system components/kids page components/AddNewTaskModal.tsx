"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewTask } from "@/backend/tasks";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";
import { DatePicker } from "./DatePicker";

const AddNewTaskModal = ({ kidId }: { kidId: string }) => {
  const queryClient = useQueryClient();
  const [newTask, setNewTask] = useState({
    description: "",
    category: "",
    points: 0,
    deadlineDate: "", // ISO string
    deadlineTime: "",
    remarks: "",
  });

  const [openDialog, setOpenDialog] = useState(false);

  // ✅ Points logic (clean + scalable)
  const pointsDeterminator = (category?: string) => {
    const map: Record<string, number> = {
      householdchores: 120,
      academics: 150,
      extracurricular: 100,
    };

    return map[category || ""] ?? 0;
  };

  const { mutate: taskMutate, isPending } = useMutation({
    mutationFn: createNewTask,
    onSuccess() {
      toast.success("Task successfully created");
      setOpenDialog(false);
      queryClient.invalidateQueries({ queryKey: ["kidtasks"] });
    },
    onError(error) {
      toast.error(error.message);
    },
  });
  // ✅ Submit handler (example)
  const handleSubmit = () => {
    const payload = {
      ...newTask,
      deadlineDate: newTask.deadlineDate.split("T")[0],
      kidId: kidId,
    };
    taskMutate(payload);
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button className="bg-linear-to-r from-[#FF5B5B] to-[#F04886] h-12 rounded w-full text-white">
          Add new task
        </Button>
      </DialogTrigger>

      <DialogContent className="p-3 md:p-6 max-w-150">
        <DialogHeader>
          <DialogTitle>Add new task</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-2">
          {/* Description */}
          <div className="flex flex-col gap-2">
            <Label>Description</Label>
            <Input
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              placeholder="Enter description"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <Label>Category</Label>
            <Select
              onValueChange={(value) =>
                setNewTask({
                  ...newTask,
                  category: value,
                  points: pointsDeterminator(value), // ✅ auto update points
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectGroup>
                  <SelectItem value="householdchores">
                    Household chores
                  </SelectItem>
                  <SelectItem value="academics">Academics</SelectItem>
                  <SelectItem value="extracurricular">
                    Extracurricular
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Points */}
          <div className="flex flex-col gap-2">
            <Label>Points</Label>
            <Input value={newTask.points} readOnly type="number" />
          </div>

          {/* Deadline Date */}
          <div className="flex flex-col gap-2">
            <Label>Deadline Date</Label>
            <DatePicker
              value={
                newTask.deadlineDate
                  ? new Date(newTask.deadlineDate)
                  : undefined
              }
              onChange={(date: Date | null) =>
                setNewTask({
                  ...newTask,
                  deadlineDate: date ? date.toISOString() : "",
                })
              }
            />
          </div>

          {/* Deadline Time */}
          <div className="flex flex-col gap-2">
            <Label>Deadline Time</Label>
            <Input
              value={newTask.deadlineTime}
              onChange={(e) =>
                setNewTask({ ...newTask, deadlineTime: e.target.value })
              }
              type="time"
              step="1"
              className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            />
          </div>

          {/* Remarks */}
          <div className="flex flex-col gap-2">
            <Label>Remarks</Label>
            <Input
              value={newTask.remarks}
              onChange={(e) =>
                setNewTask({ ...newTask, remarks: e.target.value })
              }
              placeholder="Enter remarks"
              type="text"
            />
          </div>

          {/* Submit */}
          <Button
            disabled={isPending}
            onClick={handleSubmit}
            className="bg-linear-to-r from-[#FF5B5B] to-[#F04886] h-12 rounded w-full text-white mt-2 md:col-span-2"
          >
            {isPending ? "Creating..." : "Create new task"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewTaskModal;
