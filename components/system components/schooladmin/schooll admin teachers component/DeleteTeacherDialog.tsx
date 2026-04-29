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
} from "@/components/ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTeacher } from "@/backend/schooladminteachers";
import { toast } from "react-toastify";
const DeleteTeacherDialog = ({
  deleteDialogOpen,
  setDeleteDialogOpen,
  teacherId,
  teacherName,
}: any) => {
  const queryClient = useQueryClient();
  const { mutate: deleteTeacherMutation, isPending } = useMutation({
    mutationFn: (id: string) => deleteTeacher(id),
    onSuccess: () => {
      toast.success("Teacher deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["schoolteachers"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete teacher");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["schoolteachers"] });
      setDeleteDialogOpen(false);
    },
  });

  const handleDelete = () => {
    deleteTeacherMutation(teacherId);
  };

  return (
    <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-600">
            Delete Teacher Account
          </AlertDialogTitle>

          <AlertDialogDescription>
            You are about to permanently delete{" "}
            <b>{teacherName || "this teacher"}</b>.
            <br />
            This action <b>cannot be undone</b> and will remove all data from
            the system.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTeacherDialog;
