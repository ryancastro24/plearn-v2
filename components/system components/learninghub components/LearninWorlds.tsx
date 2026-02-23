import Image from "next/image";
import Link from "next/link";
type LearningWorldsProps = {
  coverImage: string;
  title: string;
  decription: string;
  ages: string;
};

const LearninWorlds = ({
  coverImage,
  title,
  decription,
  ages,
}: LearningWorldsProps) => {
  return (
    <Link
      href={`/dashboard/learninghub/learningworldhub/${title}`}
      className="w-full"
    >
      <div className="w-full p-4 rounded-lg shadow shadow-black/10 border border-black/10 flex flex-col gap-4 relative">
        <div className="w-full h-44 relative rounded-lg overflow-hidden">
          <Image src={coverImage} alt={title} fill className="object-cover" />
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text- font-bold">{title}</h2>
          <p className="text-xs text-gray-500 text-justify">{decription}</p>
          <p className="text-xs text-gray-400 ">Suitable for {ages}</p>
        </div>
      </div>
    </Link>
  );
};

export default LearninWorlds;
