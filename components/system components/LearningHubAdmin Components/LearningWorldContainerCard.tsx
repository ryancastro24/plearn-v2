import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MdDownloadDone } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";
import Image from "next/image";
type LearningWorldProps = {
  title: string;
  description: string | null;
  bgImage: string;
  worldStatusFinished: boolean;
  id: string;
};
const LearningWorldContainerCard = ({
  title,
  description,
  bgImage,
  worldStatusFinished,
  id,
}: LearningWorldProps) => {
  return (
    <div className="group relative  md:w-85 md:h-85 rounded-lg bg-gray-300 overflow-hidden cursor-pointer">
      <Image
        src={bgImage}
        alt="background image"
        fill
        className="object-cover"
      />
      <div className="absolute text-white gap-1 p-4 bottom-0 left-0 w-full h-[60%] bg-black/70 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out">
        <div className="w-full h-full relative flex flex-col gap-2  ">
          <h2 className="font-bold">{title}</h2>

          <p className="text-xs text-justify">{description}</p>

          <div className="absolute bottom-2">
            <Link href={`/dashboard/admin/learninghub/${id}`}>
              <Button
                className={`text-white flex items-center gap-2 ${worldStatusFinished ? "bg-[#0087f6] hover:bg-[#0577d4]" : "bg-[#FF5B5B] hover:bg-[#df4c4c]"}`}
              >
                {worldStatusFinished ? "Edit" : "Finish"}
                {worldStatusFinished ? <AiFillEdit /> : <MdDownloadDone />}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningWorldContainerCard;
