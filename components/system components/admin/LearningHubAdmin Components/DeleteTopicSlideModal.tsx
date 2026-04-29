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
import { deleteTopicSlide } from "@/backend/learningworldtopicslide";
import { FiTrash2 } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
const DeleteTopicSlideModal = ({ id }: any) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: deleteTopicMutate, isPending } = useMutation({
    mutationFn: () => deleteTopicSlide(id),

    onSuccess: () => {
      toast.success("Slide deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["worldtopicslides"] });
    },

    onError: (error: any) => {
      toast.error(error.message || "Failed to delete topic");
    },
  });

  const handleDelete = () => {
    deleteTopicMutate();
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">
            <FiTrash2 />
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

export default DeleteTopicSlideModal;
