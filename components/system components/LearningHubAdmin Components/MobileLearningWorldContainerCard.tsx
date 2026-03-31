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
};
const MobileLearningWorldContainerCard = ({
  title,
  description,
  bgImage,
  worldStatusFinished,
}: LearningWorldProps) => {
  return (
    <Link href={`/dashboard/admin_learninghub/${bgImage.split("/")[2]}`}>
      <div
        className="group relative 
  w-25 
  [@media(min-width:450px)]:w-35
  [@media(min-width:650px)]:w-45
  [@media(min-width:800px)]:w-55
  aspect-square
  rounded-lg bg-gray-300 overflow-hidden cursor-pointer"
      >
        <Image
          src={bgImage}
          alt="background image"
          fill
          className="object-cover"
        />
      </div>
    </Link>
  );
};

export default MobileLearningWorldContainerCard;
