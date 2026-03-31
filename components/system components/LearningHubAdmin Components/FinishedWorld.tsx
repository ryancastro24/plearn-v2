import LearningWorldContainerCard from "./LearningWorldContainerCard";
import MobileLearningWorldContainerCard from "./MobileLearningWorldContainerCard";
const worldStatusFinished = true;
const FinishedWorld = () => {
  return (
    <div className="w-full mt-5 flex flex-col gap-3">
      <h2>Finished Worlds</h2>

      <div className="flex items-center justify-between md:hidden  ">
        <div className="flex items-center justify-between w-full">
          <MobileLearningWorldContainerCard
            title="Modern Mathematics"
            description=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, explicabo!"
            bgImage="/learninghub page assets/world2.png"
            worldStatusFinished={worldStatusFinished}
          />
          <MobileLearningWorldContainerCard
            title="English World of Warriors"
            description=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, explicabo!"
            bgImage="/learninghub page assets/world3.png"
            worldStatusFinished={worldStatusFinished}
          />
          <MobileLearningWorldContainerCard
            title="Science Academy"
            description=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, explicabo!"
            bgImage="/learninghub page assets/world5.png"
            worldStatusFinished={worldStatusFinished}
          />
        </div>
      </div>

      <div className="hidden md:flex items-center justify-between ">
        <div className="flex items-center justify-between w-full">
          <LearningWorldContainerCard
            title="Modern Mathematics"
            description=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, explicabo!"
            bgImage="/learninghub page assets/world2.png"
            worldStatusFinished={worldStatusFinished}
          />
          <LearningWorldContainerCard
            title="English World of Warriors"
            description=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, explicabo!"
            bgImage="/learninghub page assets/world3.png"
            worldStatusFinished={worldStatusFinished}
          />
          <LearningWorldContainerCard
            title="Science Academy"
            description=" Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, explicabo!"
            bgImage="/learninghub page assets/world5.png"
            worldStatusFinished={worldStatusFinished}
          />
        </div>
      </div>
    </div>
  );
};

export default FinishedWorld;
