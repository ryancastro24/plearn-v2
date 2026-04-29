import Image from "next/image";
import { FaLock } from "react-icons/fa";
type ClassTopicCard = {
  title: string;
  lock: boolean;
  index: number;
};

const ClassTopicCard = ({ title, lock, index }: ClassTopicCard) => {
  return (
    <div
      className={`rounded isolate relative overflow-hidden ${lock ? "w-44" : "w-full"} h-25`}
    >
      <Image
        src={"/learninghub page assets/world2.png"}
        alt="card bg imge"
        fill
        className="absolute inset-0 z-[-1]"
      />

      <div className="absolute w-full h-full bg-black/50 insett-0 flex-col z-10 flex items-center justify-center">
        <h3 className="text-xs text-white">Topic # {index + 1}</h3>
        <h2 className="text-white text-sm font-bold">{title}</h2>
      </div>

      {lock && (
        <div className="absolute w-full h-full bg-black/50 insett-0 z-20 flex items-center justify-center">
          <h2 className="text-white">
            <FaLock className="" />
          </h2>
        </div>
      )}
    </div>
  );
};

export default ClassTopicCard;
