"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AddNewTopicSlide from "@/components/system components/LearningHubAdmin Components/AddNewTopicSlide";
import BackArrowComponent from "@/components/system components/LearningHubAdmin Components/BackArrowComponent";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewLearningWorldTopic } from "@/backend/learnwingworldtopic";
import { useState } from "react";
import { useRouter } from "next/navigation";
const TopicCreationClientComponent = ({ id }: any) => {
  const router = useRouter();
  const [newTopic, setNewTopic] = useState({
    title: "",
    description: "",
    learningWorldId: id,
  });

  const { mutate: addNewTopicMutate, isPending } = useMutation({
    mutationFn: addNewLearningWorldTopic,
    onSuccess(data: any) {
      router.push(
        `/dashboard/admin_learninghub/${id}/topic_creation/${data?.data._id}`,
      );
    },
    onError(error) {
      alert(error?.message);
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();

    addNewTopicMutate(newTopic);
  };

  return (
    <div className="p-5 flex flex-col gap-5 w-full relative">
      <div>
        <BackArrowComponent />
        <h2>Create a topic</h2>
        <h3 className="text-xs">
          Create a topic, add slides for each explanation, and enhance the
          lesson with interactive games for better engagement
        </h3>
      </div>

      <div className="flex items-end justify-center gap-2 w-full">
        <div className="flex flex-col gap-1 w-125">
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

      <AddNewTopicSlide />
    </div>
  );
};

export default TopicCreationClientComponent;
