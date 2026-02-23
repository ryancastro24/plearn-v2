import KidsTasksUpperContent from "@/components/system components/kids page components/KidsTasksUpperContent";
import AddNewTaskModal from "@/components/system components/kids page components/AddNewTaskModal";
import CurrentTaskTable from "@/components/system components/kids page components/CurrentTaskTable";
import AllAvailableTaskTable from "@/components/system components/kids page components/AllAvailableTasksTable";
const KidTasks = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params; // params is already available

  console.log("Kid ID:", id);

  return (
    <div className="flex flex-col gap-5 p-4 w-full">
      <div className="w-full  grid grid-cols-1 md:grid-cols-5 gap-5">
        <div className="flex flex-col gap-4 md:col-span-2 ">
          <h2>Manage {"Mark Twain's"} Task </h2>
          <div className="shadow-md shadow-black/10 border border-black/5 rounded p-2">
            <KidsTasksUpperContent
              profileImage="/dashboard assets/boy.jpg"
              name="Mark Twain"
              level={24}
              clanRank="1st division captain"
              rank="Apprentice"
            />
          </div>

          <AddNewTaskModal />
        </div>

        <CurrentTaskTable />
      </div>

      <div className="">
        <AllAvailableTaskTable />
      </div>
    </div>
  );
};

export default KidTasks;
