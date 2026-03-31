import AddNewLearningWorldModal from "./AddNewLearningWorldModal";
import UnfinishedLearningWorld from "./UnfinishedLearningWorld";
import FinishedWorld from "./FinishedWorld";
const LearningWorldContainer = () => {
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl">Create a new world now!</h2>
          <h3 className="text-xs">Make sure to make it fun and engaging</h3>
        </div>

        <div>
          <AddNewLearningWorldModal />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <UnfinishedLearningWorld />
        <FinishedWorld />
      </div>
    </div>
  );
};

export default LearningWorldContainer;
