"use client";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import KidsTasksUpperContent from "@/components/system components/kids page components/KidsTasksUpperContent";
import AddNewTaskModal from "@/components/system components/kids page components/AddNewTaskModal";
import CurrentTaskTable from "@/components/system components/kids page components/CurrentTaskTable";
import AllAvailableTaskTable from "@/components/system components/kids page components/AllAvailableTasksTable";
import { getKidsData } from "@/lib/userQueryOptions";
import { useQueries } from "@tanstack/react-query";
import { getKidsTasks } from "@/lib/tasksQueryOptions";
import { getRankByLevel } from "@/lib/rankLabels";
import { deleteSpecificTask } from "@/backend/tasks";
import { toast } from "react-toastify";
const KidTasksClientComponent = ({ id }: { id: string }) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const queryClient = useQueryClient();
  // Run multiple queries
  const queries = useQueries({
    queries: [getKidsData(id), getKidsTasks(id)],
  });

  // Combine loading states
  const isLoading = queries.some((q) => q.isLoading);
  const isError = queries.some((q) => q.isError);
  const errors = queries.map((q) => q.error).filter(Boolean);

  // Extract data
  const kidData = queries[0].data;
  const tasksData = queries[1].data;

  function capitalize(word?: string | null) {
    if (!word) return "";
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

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
  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-10">
        <p>Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4">
        {errors.map((err, idx) => (
          <p key={idx} className="text-red-500">
            {(err as Error).message}
          </p>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 p-4 w-full">
      <div className="w-full grid grid-cols-1 md:grid-cols-5 gap-5">
        <div className="flex flex-col gap-4 md:col-span-2 ">
          <h2>
            Manage{" "}
            {capitalize(kidData?.firstname) +
              " " +
              capitalize(kidData?.lastname)}{" "}
            Task
          </h2>

          <div className="shadow-md shadow-black/10 border border-black/5 rounded p-2">
            <KidsTasksUpperContent
              profileImage="/dashboard assets/boy.jpg"
              name={
                capitalize(kidData?.firstname) +
                " " +
                capitalize(kidData?.lastname)
              }
              level={kidData?.level}
              clanRank="1st division captain"
              rank={getRankByLevel(kidData?.level)}
            />
          </div>

          <AddNewTaskModal kidId={id} />
        </div>

        <CurrentTaskTable
          tasks={tasksData}
          setOpenDeleteDialog={setOpenDeleteDialog}
          openDeleteDialog={openDeleteDialog}
          handleDeleteTask={handleDeleteTask}
          deletePending={deletePending}
          setSelectedTaskId={setSelectedTaskId}
          selectedTaskId={selectedTaskId}
        />
      </div>

      <div>
        <AllAvailableTaskTable
          tasks={tasksData}
          setOpenDeleteDialog={setOpenDeleteDialog}
          openDeleteDialog={openDeleteDialog}
          handleDeleteTask={handleDeleteTask}
          deletePending={deletePending}
          setSelectedTaskId={setSelectedTaskId}
          selectedTaskId={selectedTaskId}
        />
      </div>
    </div>
  );
};

export default KidTasksClientComponent;
