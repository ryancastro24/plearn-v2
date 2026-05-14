"use client";
import Link from "next/link";
import { useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createSectionActivity } from "@/backend/sectionActivties"; // adjust path
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
const AddNewSectionTopicModal = ({ sectionId }: any) => {
  const queryClient = useQueryClient();
  const [alertDialogOpen, setAlertDialogOpen] = useState(false);
  const [createdActivityId, setCreatedActivityId] = useState("");
  // 🧠 form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");

  // 🚀 mutation
  const { mutate, isPending } = useMutation({
    mutationFn: createSectionActivity,

    onSuccess: (data) => {
      // refresh activities list
      queryClient.invalidateQueries({ queryKey: ["sectionsActivities"] });

      // reset form
      setTitle("");
      setDescription("");
      setType("");
      setCreatedActivityId(data.data._id);
      toast.success("Section activity added successfully");
      setAlertDialogOpen(true);
    },

    onError: (error: any) => {
      toast.error(error.message);
    },
  });

  // 📤 submit handler
  const handleSubmit = () => {
    if (!title || !type) {
      alert("Title and type are required");
      return;
    }

    mutate({
      title,
      description,
      type,
      sectionId: sectionId,
    });
  };

  return (
    <div className="mt-5">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-linear-to-r from-[#FF5B5B] to-[#F04886] text-white">
            Add new activity
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-150">
          <DialogHeader>
            <DialogTitle>Create your activity</DialogTitle>
            <DialogDescription>
              Plan ahead and create your activities here like lessons,
              assignment and quizzes
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            {/* Title */}
            <div className="flex flex-col gap-2">
              <Label>Title</Label>
              <Input
                placeholder="Enter topic title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <Label>Description</Label>
              <Input
                placeholder="Enter topic description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Type */}
            <div className="flex flex-col gap-2">
              <Label>Type</Label>
              <Select onValueChange={(value) => setType(value)}>
                <SelectTrigger className="w-100">
                  <SelectValue placeholder="Select activity type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="lesson">Lesson</SelectItem>
                    <SelectItem value="assignment">Assignment</SelectItem>
                    <SelectItem value="quiz">Quiz</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <div className="flex items-center justify-end gap-2">
              <DialogClose asChild>
                <Button variant={"secondary"} disabled={isPending}>
                  Cancel
                </Button>
              </DialogClose>

              <Button
                onClick={handleSubmit}
                disabled={isPending}
                className="bg-linear-to-r from-[#FF5B5B] to-[#F04886] text-white"
              >
                {isPending ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog onOpenChange={setAlertDialogOpen} open={alertDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Activity successfully created!</AlertDialogTitle>
            <AlertDialogDescription>
              You can now proceed to create slides of the activity created
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Link
              href={`/dashboard/teacher/classes/${sectionId}/activity/${createdActivityId}`}
            >
              <AlertDialogAction className="bg-linear-to-r from-[#685AFF] to-[#008CFF]  text-white">
                Continue <IoIosArrowDroprightCircle />
              </AlertDialogAction>
            </Link>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AddNewSectionTopicModal;
