"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewLearningWorldTopic } from "@/backend/learnwingworldtopic";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FiFolderPlus } from "react-icons/fi";
const TopicCreationModal = ({ id }: any) => {
  console.log("world id:", id);
  const router = useRouter();
  const [newTopic, setNewTopic] = useState({
    title: "",
    description: "",
  });

  const { mutate: addNewTopicMutate, isPending } = useMutation({
    mutationFn: addNewLearningWorldTopic,
    onSuccess(data: any) {
      toast.success("Topic successfully created");
      router.push(
        `/dashboard/admin_learninghub/${id}/topic_creation/${data?.data._id}`,
      );
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    addNewTopicMutate({
      ...newTopic,
      learningWorldId: id, // ✅ always correct
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 mt-4 text-white bg-linear-to-r from-[#FF5B5B] to-[#F04886]">
          <FiFolderPlus />
          Add new topic
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-155">
        <DialogHeader>
          <DialogTitle>Create a topic</DialogTitle>
          <DialogDescription>
            Create a topic, add slides for each explanation, and enhance the
            lesson with interactive games for better engagement
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-5 w-full relative">
          <div className="flex gap-3 flex-col">
            <div className="flex flex-col  gap-1">
              <Label>Topic</Label>
              <Input
                value={newTopic.title}
                onChange={(e) => {
                  setNewTopic({ ...newTopic, title: e.target.value });
                }}
                placeholder="Enter topic title"
              />
            </div>

            <div className="flex flex-col gap-1 w-full">
              <Label>Description</Label>
              <Input
                value={newTopic.description}
                onChange={(e) => {
                  setNewTopic({ ...newTopic, description: e.target.value });
                }}
                placeholder="Enter topic description"
              />
            </div>

            <Button
              onClick={handleSubmit}
              disabled={isPending}
              className="text-white bg-[#ff5b5b]"
            >
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TopicCreationModal;
