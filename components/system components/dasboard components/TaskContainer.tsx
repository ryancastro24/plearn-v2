import Image from "next/image";
import { Button } from "../../ui/button";
import { FaXmark } from "react-icons/fa6";
import { FaThumbsUp } from "react-icons/fa6";
import { CiMenuKebab } from "react-icons/ci";
const TaskContainer = ({
  profileImage,
  name,
  task,
}: {
  profileImage: string;
  name: string;
  task: string;
}) => {
  return (
    <div className="w-full border flex items-center justify-between border-black/5 shadow-md shadow-black/10 rounded p-2 h-20">
      <div className="flex gap-2">
        <div className="h-16 w-16 rounded-full bg-slate-500  relative overflow-hidden">
          <Image
            src={profileImage}
            alt="profile image"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex justify-center flex-col">
          <h2 className="font-bold">{name}</h2>
          <span className="text-[10px]">
            {task.split(" ").map((word, index) => (
              <span key={index}>
                {word}
                {index === 1 && <br />}{" "}
              </span>
            ))}
          </span>
        </div>
      </div>

      <div className="flex justify-center gap-2">
        <Button className="bg-red-500" size={"icon"}>
          <FaXmark />
        </Button>
        <Button className="bg-green-500" size={"icon"}>
          <FaThumbsUp />
        </Button>

        <Button variant="secondary" className=" border-0" size={"icon"}>
          <CiMenuKebab className="text-black text-xl" />
        </Button>
      </div>
    </div>
  );
};

export default TaskContainer;
