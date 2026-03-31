import Image from "next/image";
import TopicLinksContainer from "@/components/system components/LearningHubAdmin Components/TopicLinksContainer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LearningHubRewards from "@/components/system components/LearningHubAdmin Components/LearningHubRewards";
type ParamsProps = Promise<{
  id: string;
}>;
const LearningHubDetails = async ({ params }: { params: ParamsProps }) => {
  const { id } = await params;
  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-center  h-50 relative overflow-hidden">
        <Image
          src={`/learninghub page assets/${id}`}
          alt="world backdrop"
          fill
          className="object-cover"
        />

        <div className="absolute flex flex-col items-center gap-2">
          <h2 className="text-white font-bold text-6xl drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)]">
            Welcome to
          </h2>
          <h2 className="text-white font-bold drop-shadow-[0_4px_6px_rgba(0,0,0,0.8)] text-3xl">
            ENGLISH ENHANCEMENT PROGRAM
          </h2>
        </div>
      </div>

      <div className="p-3 flex flex-col gap-4">
        <p className="text-sm">
          <strong>About the subject:</strong> The English Enhancement Program
          aims to develop students' proficiency in the English language by
          enhancing their reading, writing, listening, and speaking skills.
          Through structured lessons and engaging activities, students are
          encouraged to practice effective communication and expand their
          vocabulary while improving grammar and comprehension
        </p>

        <div className="grid grid-cols-5 gap-5 w-full px-5 ">
          <div className="flex flex-col gap-4 w-full col-span-3">
            <h2>Topics Available</h2>

            <div className="w-fit flex-col gap-3 ">
              <TopicLinksContainer
                title="Numbers"
                description="Counting numbers from 1-10"
              />
            </div>

            <div>
              <Link href="/dashboard/admin_learninghub/1/topic_creation">
                <Button className="text-white bg-[#ff5b5b] mt-8">
                  Create new topic
                </Button>
              </Link>
            </div>
          </div>

          <LearningHubRewards />
        </div>
      </div>
    </div>
  );
};

export default LearningHubDetails;
