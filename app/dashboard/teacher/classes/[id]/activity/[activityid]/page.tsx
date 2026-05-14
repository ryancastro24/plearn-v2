import ActivityClientComponent from "@/components/system components/teacher/classes components/ActivityClientComponent";
type ParamsProps = Promise<{
  activityid: string;
}>;
const ActivityPage = async ({ params }: { params: ParamsProps }) => {
  const { activityid } = await params;
  return (
    <div>
      <ActivityClientComponent activityid={activityid} />
    </div>
  );
};

export default ActivityPage;
