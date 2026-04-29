"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";
import { BiEditAlt } from "react-icons/bi";
import { updateLearningWorldTopic } from "@/backend/learnwingworldtopic";
const EditTopicModal = ({ topicDetails }: any) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const [topic, setTopic] = useState({
    title: "",
    description: "",
  });

  // sync props → state
  useEffect(() => {
    if (topicDetails) {
      setTopic({
        title: topicDetails.title || "",
        description: topicDetails.description || "",
      });
    }
  }, [topicDetails]);

  const { mutate: editTopicMutate, isPending } = useMutation({
    mutationFn: ({ data, id }: any) => updateLearningWorldTopic(data, id),

    onSuccess() {
      toast.success("Topic updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["learningworldstopicdetails"],
      });
      setOpen(false);
    },

    onError(error: any) {
      toast.error(error.message || "Something went wrong");
    },
  });

  const handleSubmit = () => {
    editTopicMutate({
      data: {
        title: topic.title,
        description: topic.description,
      },
      id: topicDetails._id,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#507FFF] text-white" size="icon">
          <BiEditAlt />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-155">
        <DialogHeader>
          <DialogTitle>Edit Topic</DialogTitle>
          <DialogDescription>
            Update topic title and description
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-5 w-full">
          {/* Title */}
          <div className="flex flex-col gap-1">
            <Label>Topic</Label>
            <Input
              value={topic.title}
              onChange={(e) =>
                setTopic((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              placeholder="Enter topic title"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <Label>Description</Label>
            <Input
              value={topic.description}
              onChange={(e) =>
                setTopic((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Enter topic description"
            />
          </div>

          {/* Submit */}
          <Button
            onClick={handleSubmit}
            disabled={isPending}
            className="text-white bg-[#ff5b5b]"
          >
            {isPending ? "Updating..." : "Update topic details"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTopicModal;
