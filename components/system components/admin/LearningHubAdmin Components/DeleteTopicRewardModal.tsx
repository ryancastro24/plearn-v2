"use client";

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

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReward } from "@/backend/learnginworldtopicreward";
import { FiTrash2 } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
const DeleteTopicRewardModal = ({ id }: any) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: deleteTopicMutate, isPending } = useMutation({
    mutationFn: () => deleteReward(id),

    onSuccess: () => {
      toast.success("Reward deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["worldtopicrewards"] });
    },

    onError: (error: any) => {
      toast.error(error.message || "Failed to delete reward");
    },
  });

  const handleDelete = () => {
    deleteTopicMutate();
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button size="sm" variant="destructive" className="text-xs h-7">
            Delete
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              slide.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={handleDelete}
              disabled={isPending}
              className="bg-red-600 hover:bg-red-700"
            >
              {isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteTopicRewardModal;
