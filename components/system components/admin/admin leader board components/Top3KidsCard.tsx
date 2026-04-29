import Image from "next/image";

type Top3KidsCardProps = {
  points: number;
  name: string;
  id: number;
  rank: number;
  level: number;
  rankLabel: string;
  clan: string;
};

const Top3KidsCard = ({
  points,
  name,
  rank,
  level,
  rankLabel,
  clan,
}: Top3KidsCardProps) => {
  const bg =
    rank === 0 ? "bg-[#FFD700]" : rank === 1 ? "bg-[#C0C0C0]" : "bg-[#CD7F32]";

  return (
    <div
      className={`relative overflow-hidden ${bg} 
      p-3 rounded-xl flex flex-col gap-2 w-75 h-32 
      shadow-lg shadow-black/30 transition-transform duration-300 hover:scale-105`}
    >
      {/* ✨ GLASS SHINE OVERLAY */}
      <div className="pointer-events-none absolute inset-0">
        {/* soft glossy top */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-white/30 backdrop-blur-sm rounded-t-xl" />

        {/* diagonal shine streak */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/20 rotate-45 blur-2xl" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col gap-2">
        <div>
          <h3 className="text-xs font-semibold">
            {rank === 0
              ? "Overall Champion"
              : rank === 1
                ? "1st Runner-up"
                : "2nd Runner-up"}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <Image
            src={"/dashboard assets/boy.jpg"}
            alt="kid profile picture"
            height={50}
            width={50}
            className="rounded-full border-2 border-white shadow"
          />

          <div>
            <h3 className="text-sm font-bold">{name}</h3>
            <h4 className="text-[10px]">
              Level: {level} - {rankLabel}
            </h4>
            <h4 className="text-[10px]">Clan: {clan}</h4>
          </div>
        </div>

        <h2 className="text-sm font-bold">{points} pts</h2>
      </div>
    </div>
  );
};

export default Top3KidsCard;
