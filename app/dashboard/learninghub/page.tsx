import SchoolTabContainer from "@/components/system components/learninghub components/SchoolTabContainer";
import LearningWorldsContainer from "@/components/system components/learninghub components/LearningWorldsContainer";
const LearningHub = () => {
  return (
    <div className="w-full p-4 flex flex-col gap-4">
      <div className="flex flex-col gap-2 md:gap-1">
        {" "}
        <h1>WELCOME TO LEARNING HUB</h1>
        <h2>
          Engage your kids to a world full of fun to learn and earn points
        </h2>
      </div>

      <SchoolTabContainer />

      <div className="mt-5">
        <h2 className="text-lg font-semibold">Available Learning Worlds</h2>

        <LearningWorldsContainer />
      </div>
    </div>
  );
};

export default LearningHub;
