import KidTasksClientComponent from "@/components/system components/kids page components/KidTasksClientComponent";
const KidTasks = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params; // params is already available

  return <KidTasksClientComponent id={id} />;
};

export default KidTasks;
