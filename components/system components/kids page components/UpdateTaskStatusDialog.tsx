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
import { markTaskAsDone, markTaskAsFailed } from "@/backend/tasks";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LuFileCheck, LuFileX } from "react-icons/lu";
const UpdateTaskStatusDialog = ({
  kidname,
  setOpenDoneDialog,
  openDoneDialog,
  selectedTaskId,
}: any) => {
  const queryClient = useQueryClient();

  const { mutate: markTaskDoneMutate, isPending: taskDonePending } =
    useMutation({
      mutationFn: markTaskAsDone,
      onSuccess(data) {
        toast.success(`Task is done, points is sent to ${kidname}`);
        queryClient.invalidateQueries({ queryKey: ["kidtasks"] });
      },
      onError(error: any) {
        toast.error(error.message);
      },
      onSettled() {
        setOpenDoneDialog(false);
      },
    });

  const { mutate: markTaskFailedMutate, isPending: taskFailedPending } =
    useMutation({
      mutationFn: markTaskAsFailed,
      onSuccess(data) {
        toast.error(`Task is failed, task is not executed by ${kidname}`);
        queryClient.invalidateQueries({ queryKey: ["kidtasks"] });
      },
      onError(error: any) {
        toast.error(error.message);
      },
      onSettled() {
        setOpenDoneDialog(false);
      },
    });

  const handleTaskDone = (e: any, id: any) => {
    e.preventDefault();
    markTaskDoneMutate(id);
  };

  const handleTaskFailed = (e: any, id: any) => {
    e.preventDefault();
    markTaskFailedMutate(id);
  };
  return (
    <AlertDialog onOpenChange={setOpenDoneDialog} open={openDoneDialog}>
      <AlertDialogContent className="max-w-125">
        <AlertDialogHeader>
          <AlertDialogTitle> Update {kidname} task status</AlertDialogTitle>
          <AlertDialogDescription>
            If {kidname} task is done then mark it done and if {kidname} did not
            execute it then mark it failed
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              disabled={taskFailedPending || taskDonePending}
              onClick={(e) => handleTaskDone(e, selectedTaskId)}
              className="bg-green-500 text-white"
            >
              <LuFileCheck /> {taskDonePending ? "Updating..." : "Mark as done"}
            </Button>
          </AlertDialogAction>

          <AlertDialogAction asChild>
            <Button
              disabled={taskFailedPending || taskDonePending}
              onClick={(e) => handleTaskFailed(e, selectedTaskId)}
              className="bg-red-500 text-white"
            >
              <LuFileX /> {taskFailedPending ? "Updating..." : "Mark as failed"}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UpdateTaskStatusDialog;
