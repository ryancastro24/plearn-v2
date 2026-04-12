import Image from "next/image";
import { Button } from "../../ui/button";
import { FaXmark } from "react-icons/fa6";
import { FaThumbsUp } from "react-icons/fa6";
import { CiMenuKebab } from "react-icons/ci";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markTaskAsDone, markTaskAsFailed } from "@/backend/tasks";
import { Spinner } from "@/components/ui/spinner";
import { capitalize } from "../kids page components/KidTasksClientComponent";
import { toast } from "react-toastify";
const TaskContainer = ({
  profileImage,
  name,
  task,
  kidId,
}: {
  profileImage: string;
  name: string;
  task: string;
  kidId: string;
}) => {
  const queryClient = useQueryClient();

  const { mutate: markTaskDoneMutate, isPending: taskDonePending } =
    useMutation({
      mutationFn: markTaskAsDone,
      onSuccess(data) {
        toast.success(`Task is done, points is sent to ${name.split(" ")[0]}`);
        queryClient.invalidateQueries({
          queryKey: ["allkidstasks"],
        });
      },
      onError(error: any) {
        toast.error(error.message);
      },
    });

  const { mutate: markTaskFailedMutate, isPending: taskFailedPending } =
    useMutation({
      mutationFn: markTaskAsFailed,
      onSuccess(data) {
        toast.error(
          `Task is failed, task is not executed by ${name.split(" ")[0]}`,
        );
        queryClient.invalidateQueries({
          queryKey: ["allkidstasks"],
        });
      },
      onError(error: any) {
        toast.error(error.message);
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
    <div className="w-full border flex items-center justify-between border-black/5 shadow-md shadow-black/10 rounded p-2 h-20">
      <div className="flex gap-2">
        <div className="h-16 w-16 rounded-full bg-slate-500  relative overflow-hidden">
          <Image
            src={profileImage}
            alt="profile image"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex justify-center flex-col gap-1">
          <h2 className="font-bold">{name}</h2>

          {/*! PLEASE MAKE THIS SPAN IN MOBILE VIEW */}
          {/* <span className="text-[10px]">
            {task.split(" ").map((word, index) => (
              <span key={index}>
                {word}
                {index === 1 && <br />}{" "}
              </span>
            ))}
          </span> */}

          <span className="text-xs">
            <strong>TASK:</strong> {capitalize(task)}
          </span>
        </div>
      </div>

      <div className="flex justify-center gap-2">
        <Button
          disabled={taskFailedPending}
          onClick={(e) => handleTaskFailed(e, kidId)}
          className="bg-red-500"
          size={"icon"}
        >
          {taskFailedPending ? <Spinner /> : <FaXmark />}
        </Button>
        <Button
          disabled={taskDonePending}
          onClick={(e) => handleTaskDone(e, kidId)}
          className="bg-green-500"
          size={"icon"}
        >
          {taskDonePending ? <Spinner /> : <FaThumbsUp />}
        </Button>

        <Button variant="secondary" className=" border-0" size={"icon"}>
          <CiMenuKebab className="text-black text-xl" />
        </Button>
      </div>
    </div>
  );
};

export default TaskContainer;
