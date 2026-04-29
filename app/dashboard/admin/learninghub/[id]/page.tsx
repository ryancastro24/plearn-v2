import LearningHubDetailsClientComponent from "@/components/system components/admin/LearningHubAdmin Components/LearningHubDetailsClientComponent";
type ParamsProps = Promise<{
  id: string;
}>;
const LearningHubDetails = async ({ params }: { params: ParamsProps }) => {
  const { id } = await params;
  return <LearningHubDetailsClientComponent id={id} />;
};

export default LearningHubDetails;
