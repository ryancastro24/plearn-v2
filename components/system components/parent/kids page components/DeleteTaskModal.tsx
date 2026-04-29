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
import { LuTrash2 } from "react-icons/lu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSpecificTask } from "@/backend/tasks";
import { toast } from "react-toastify";
const DeleteTaskModal = ({
  selectedTaskId,
  setOpenDeleteDialog,
  openDeleteDialog,
}: any) => {
  const queryClient = useQueryClient();

  const { mutate: deletTask, isPending: deletePending } = useMutation({
    mutationFn: deleteSpecificTask,
    onSuccess(data) {
      toast.success("Task successfully deleted");

      queryClient.invalidateQueries({ queryKey: ["kidtasks"] });
    },
    onError(error: any) {
      toast.error(error.message);
    },
    onSettled() {
      setOpenDeleteDialog(false);
    },
  });

  const handleDeleteTask = (e: any, id: any) => {
    e.preventDefault();
    deletTask(id);
  };

  return (
    <AlertDialog onOpenChange={setOpenDeleteDialog} open={openDeleteDialog}>
      <AlertDialogContent className="max-w-125">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the task
            from our servers
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => handleDeleteTask(e, selectedTaskId)}
            variant={"destructive"}
          >
            {" "}
            <LuTrash2 /> {deletePending ? "Deleting..." : "Delete task"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTaskModal;
