"use client";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
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
import { Button } from "@/components/ui/button";
import { LuCheckCheck } from "react-icons/lu";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DatePicker } from "../../parent/kids page components/DatePicker";
import { deployFinalActivity } from "@/backend/sectionActivties";
import { toast } from "react-toastify";
const FinalizingActivityModal = ({ activityId }: { activityId: string }) => {
  const [form, setForm] = useState({
    deadlineDate: "",
    deadlineTime: "",
    remarks: "",
  });

  const { mutate: finalizeActivity, isPending } = useMutation({
    mutationFn: deployFinalActivity,

    onSuccess: (data) => {
      console.log("SUCCESS:", data);
      toast.success("Activity deployed succesfully!");
      // optional reset form
      setForm({
        deadlineDate: "",
        deadlineTime: "",
        remarks: "",
      });
    },

    onError: (error) => {
      console.log("ERROR:", error);
      toast.error(error?.message);
    },
  });

  const handleSubmit = () => {
    finalizeActivity({
      deadlineDate: form.deadlineDate,
      deadlineTime: form.deadlineTime,
      remarks: form.remarks,
      activityId,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="bg-linear-to-r from-[#685AFF] to-[#008CFF] text-white hover:text-white"
        >
          <LuCheckCheck /> Finalize activity
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-150">
        <DialogHeader>
          <DialogTitle>Activity is ready to deploy?</DialogTitle>

          <DialogDescription className="text-xs">
            This stage is to finalize your activity and pass it to the parents
            and students accounts, make sure the activity is ready to go
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-1 w-full">
            <Label>Deadline Date</Label>

            <DatePicker
              value={form.deadlineDate}
              onChange={(date: string | null) =>
                setForm({
                  ...form,
                  deadlineDate: date ?? "",
                })
              }
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <Label>Deadline time</Label>

            <Input
              type="time"
              value={form.deadlineTime}
              onChange={(e) =>
                setForm({
                  ...form,
                  deadlineTime: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className="flex flex-col gap-1 w-full">
          <Label>Remarks</Label>

          <Input
            type="text"
            placeholder="Enter remarks"
            value={form.remarks}
            onChange={(e) =>
              setForm({
                ...form,
                remarks: e.target.value,
              })
            }
          />
        </div>

        <DialogFooter className="flex items-center gap-2">
          <DialogClose asChild>
            <Button variant={"outline"}>Cancel</Button>
          </DialogClose>

          <Button
            onClick={handleSubmit}
            disabled={isPending}
            className="bg-linear-to-r from-[#FF5B5B] to-[#F04886] text-white"
          >
            {isPending ? "Deploying..." : "Deploy activity"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FinalizingActivityModal;
