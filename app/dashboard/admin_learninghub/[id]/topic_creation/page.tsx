import TopicCreationClientComponent from "@/components/system components/admin/LearningHubAdmin Components/TopicCreationClientComponent";
type TopicCreationProps = Promise<{ id: string }>;
const TopicCreation = async ({ params }: { params: TopicCreationProps }) => {
  const { id } = await params;
  return <TopicCreationClientComponent id={id} />;
};

export default TopicCreation;
