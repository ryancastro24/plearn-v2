import TopicSlideCreationClientComponent from "@/components/system components/LearningHubAdmin Components/TopicSlideCreationClientComponent";
type TopicSlideCreationProps = Promise<{ id: string; topicid: string }>;
const TopicSlideCreation = async ({
  params,
}: {
  params: TopicSlideCreationProps;
}) => {
  const { id, topicid } = await params;

  console.log("topic id", topicid);
  return <TopicSlideCreationClientComponent id={id} topicid={topicid} />;
};

export default TopicSlideCreation;
