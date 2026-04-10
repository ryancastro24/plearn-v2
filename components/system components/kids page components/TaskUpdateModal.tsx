"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "@/backend/tasks";
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

const TaskUpdateModal = ({
  setSelectedTaskToUpdate,
  selectedTaskToUpdate,
  openTaskUpdateModal,
  setOpenTaskUpdateModal,
}: any) => {
  const queryClient = useQueryClient();

  // ✅ Points logic (clean + scalable)
  const pointsDeterminator = (category?: string) => {
    const map: Record<string, number> = {
      householdchores: 120,
      academics: 150,
      extracurricular: 100,
    };

    return map[category || ""] ?? 0;
  };

  const { mutate: taskUpdateMutate, isPending } = useMutation({
    mutationFn: updateTask,
    onSuccess() {
      toast.success("Task successfully created");
      setOpenTaskUpdateModal(false);
      queryClient.invalidateQueries({ queryKey: ["kidtasks"] });
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    taskUpdateMutate({
      id: selectedTaskToUpdate.id, // or id
      data: {
        ...selectedTaskToUpdate,
        deadlineDate: selectedTaskToUpdate.deadlineDate.split("T")[0],
      },
    });
  };

  return (
    <Dialog open={openTaskUpdateModal} onOpenChange={setOpenTaskUpdateModal}>
      <DialogContent className="p-3 md:p-6 max-w-150">
        <DialogHeader>
          <DialogTitle>Update Task</DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-2">
          {/* Description */}
          <div className="flex flex-col gap-2">
            <Label>Description</Label>
            <Input
              value={selectedTaskToUpdate.description}
              onChange={(e) =>
                setSelectedTaskToUpdate({
                  ...selectedTaskToUpdate,
                  description: e.target.value,
                })
              }
              placeholder="Enter description"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col gap-2">
            <Label>Category</Label>
            <Select
              defaultValue={selectedTaskToUpdate.category}
              onValueChange={(value) =>
                setSelectedTaskToUpdate({
                  ...selectedTaskToUpdate,
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
            <Input value={selectedTaskToUpdate.points} readOnly type="number" />
          </div>

          {/* Deadline Date */}
          <div className="flex flex-col gap-2">
            <Label>Deadline Date</Label>
            <DatePicker
              value={selectedTaskToUpdate.deadlineDate}
              onChange={(date: string | null) =>
                setSelectedTaskToUpdate({
                  ...selectedTaskToUpdate,
                  deadlineDate: date ?? "",
                })
              }
            />
          </div>

          {/* Deadline Time */}
          <div className="flex flex-col gap-2">
            <Label>Deadline Time</Label>
            <Input
              value={selectedTaskToUpdate.deadlineTime}
              onChange={(e) =>
                setSelectedTaskToUpdate({
                  ...selectedTaskToUpdate,
                  deadlineTime: e.target.value,
                })
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
              value={selectedTaskToUpdate.remarks}
              onChange={(e) =>
                setSelectedTaskToUpdate({
                  ...selectedTaskToUpdate,
                  remarks: e.target.value,
                })
              }
              placeholder="Enter remarks"
              type="text"
            />
          </div>

          {/* Submit */}
          <Button
            onClick={(e) => handleSubmit(e)}
            disabled={isPending}
            className="bg-linear-to-r from-[#FF5B5B] to-[#F04886] h-12 rounded w-full text-white mt-2 md:col-span-2"
          >
            {isPending ? "Updating..." : "Update task"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TaskUpdateModal;
