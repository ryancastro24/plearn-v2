import LearninWorldHubContainer from "@/components/system components/learninghub components/LearninWorldHubContainer";
import Image from "next/image";
const LearningWorldHub = async ({
  params,
}: {
  params: Promise<{ learningworldid: string }>;
}) => {
  const { learningworldid } = await params;
  return (
    <div>
      <LearninWorldHubContainer />
    </div>
  );
};

export default LearningWorldHub;
