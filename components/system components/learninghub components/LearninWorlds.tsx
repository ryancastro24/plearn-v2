import Image from "next/image";
import Link from "next/link";
type LearningWorldsProps = {
  title: string;
  description: string;
  ages: string;
  worldImage: string;
  _id: string;
};

const LearninWorlds = ({
  title,
  description,
  ages,
  _id,
  worldImage,
}: LearningWorldsProps) => {
  return (
    <Link
      href={`/dashboard/learninghub/learningworldhub/${_id}`}
      className="w-full"
    >
      <div className="w-full p-4 rounded-lg shadow shadow-black/10 border border-black/10 flex flex-col gap-4 relative">
        <div className="w-full h-44 relative rounded-lg overflow-hidden">
          <Image src={worldImage} alt={title} fill className="object-cover" />
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-[14px]">{title}</h2>
          <p className="text-xs text-gray-500 text-justify">{description}</p>
          <p className="text-xs text-gray-400 ">Suitable for {ages}</p>
        </div>
      </div>
    </Link>
  );
};

export default LearninWorlds;
