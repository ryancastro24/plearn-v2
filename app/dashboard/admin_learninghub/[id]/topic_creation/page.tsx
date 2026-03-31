import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AddNewTopicSlide from "@/components/system components/LearningHubAdmin Components/AddNewTopicSlide";
import BackArrowComponent from "@/components/system components/LearningHubAdmin Components/BackArrowComponent";
type TopicCreationProps = Promise<{ id: string }>;
const TopicCreation = async ({ params }: { params: TopicCreationProps }) => {
  const { id } = await params;
  return (
    <div className="p-5 flex flex-col gap-5 w-full relative">
      <div>
        <BackArrowComponent />
        <h2>Create a topic</h2>
        <h3 className="text-xs">
          Create a topic, add slides for each explanation, and enhance the
          lesson with interactive games for better engagement
        </h3>
      </div>

      <div className="flex items-end justify-center gap-2 w-full">
        <div className="flex flex-col gap-1 w-125">
          <Label>Topic</Label>
          <Input placeholder="Enter topic title" />
        </div>

        <div className="flex flex-col gap-1 w-full">
          <Label>Description</Label>
          <Input placeholder="Enter topic description" />
        </div>

        <Button className="text-white bg-[#ff5b5b]">Submit</Button>
      </div>

      <AddNewTopicSlide />

      <Button className="absolute bottom-10 right-10  bg-linear-to-r from-[#685AFF] to-[#008CFF] text-white">
        Finalize topic
      </Button>
    </div>
  );
};

export default TopicCreation;
