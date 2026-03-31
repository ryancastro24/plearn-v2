import LearningWorldContainerCard from "./LearningWorldContainerCard";
import MobileLearningWorldContainerCard from "./MobileLearningWorldContainerCard";
const worldStatusFinished = false;
const UnfinishedLearningWorld = () => {
  return (
    <div className="w-full flex flex-col gap-3">
      <h2>Unfinished Worlds</h2>

      <div className="flex items-center justify-between md:hidden ">
        <MobileLearningWorldContainerCard
          title="Modern Mathematics"
          description=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, explicabo!"
          bgImage="/learninghub page assets/world1.png"
          worldStatusFinished={worldStatusFinished}
        />
        <MobileLearningWorldContainerCard
          title="English World of Warriors"
          description=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, explicabo!"
          bgImage="/learninghub page assets/world4.png"
          worldStatusFinished={worldStatusFinished}
        />
        <MobileLearningWorldContainerCard
          title="Science Academy"
          description=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, explicabo!"
          bgImage="/learninghub page assets/world6.png"
          worldStatusFinished={worldStatusFinished}
        />
      </div>

      <div className="md:flex items-center justify-between hidden">
        <LearningWorldContainerCard
          title="Modern Mathematics"
          description=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, explicabo!"
          bgImage="/learninghub page assets/world1.png"
          worldStatusFinished={worldStatusFinished}
        />
        <LearningWorldContainerCard
          title="English World of Warriors"
          description=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, explicabo!"
          bgImage="/learninghub page assets/world4.png"
          worldStatusFinished={worldStatusFinished}
        />
        <LearningWorldContainerCard
          title="Science Academy"
          description=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, explicabo!"
          bgImage="/learninghub page assets/world6.png"
          worldStatusFinished={worldStatusFinished}
        />
      </div>
    </div>
  );
};

export default UnfinishedLearningWorld;
