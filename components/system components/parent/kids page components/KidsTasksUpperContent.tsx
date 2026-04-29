import Image from "next/image";
type KidsDetailsProps = {
  profileImage: string;
  name: string;
  level: number;
  rank: string;
  clanRank: string;
};

const KidsTasksUpperContent = ({
  profileImage,
  name,
  level,
  rank,
  clanRank,
}: KidsDetailsProps) => {
  return (
    <div>
      <div className="flex items-center gap-5">
        <div className="rounded-full overflow-hidden relative w-32 h-32">
          <Image
            src={profileImage}
            alt="profileImage"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap justify-center">
          <h2 className="text-lg">{name}</h2>
          <span className="text-sm">
            <strong>Level {level}- </strong>
            {rank}
          </span>

          <div className="flex items-center gap-2">
            {/* clan logo container */}
            <div className="w-4 h-4 rounded bg-slate-500"></div>

            <span className="text-sm">{clanRank}</span>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <div className="w-8 h-8 rounded bg-gray-200 border-2 border-dashed border-gray-300"></div>
            <div className="w-8 h-8 rounded bg-gray-200 border-2 border-dashed border-gray-300"></div>
            <div className="w-8 h-8 rounded bg-gray-200 border-2 border-dashed border-gray-300"></div>
            <div className="w-8 h-8 rounded bg-gray-200 border-2 border-dashed border-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KidsTasksUpperContent;
