import LearninWorlds from "./LearninWorlds";
import { useQuery } from "@tanstack/react-query";
import { getAllLearningWorlds } from "@/lib/learningworldsQueryOptions";
const LearningWorldsContainer = () => {
  const { data: learningworlddata } = useQuery(getAllLearningWorlds());
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 p-2">
      {learningworlddata?.map((world: any) => (
        <LearninWorlds key={world._id} {...world} />
      ))}
    </div>
  );
};

export default LearningWorldsContainer;
