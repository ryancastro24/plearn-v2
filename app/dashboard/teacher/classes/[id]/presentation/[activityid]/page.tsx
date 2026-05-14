import ActivityPresentationClientComponent from "@/components/system components/teacher/classes components/ActivityPresentationClientComponent";
type ParamsProps = Promise<{
  activityid: string;
}>;
const ActivityPresentation = async ({ params }: { params: ParamsProps }) => {
  const { activityid } = await params;
  return <ActivityPresentationClientComponent activityid={activityid} />;
};

export default ActivityPresentation;
