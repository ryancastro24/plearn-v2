import Image from "next/image";
type Top3ClanCardProp = {
  logo: string;
  name: string;
  power: number;
  rank: number;
};

const Top3ClanCard = ({ logo, name, power, rank }: Top3ClanCardProp) => {
  return (
    <div
      className={`${
        rank === 0
          ? "bg-linear-to-r from-[#FF5B5B] to-[#F04886]"
          : rank === 1
            ? "bg-linear-to-r from-[#ff8585] to-[#d97498]"
            : "bg-linear-to-r from-[#ffb3b3] to-[#d899af]"
      } shadow text-white shadow-black/30 flex items-center justify-between p-2 rounded`}
    >
      <div className="flex items-center gap-2">
        <Image
          src={logo}
          alt="clan logo"
          width={40}
          height={40}
          className="rounded"
        />

        <div>
          <h2 className="text-sm font-bold">{name}</h2>
          <h3 className="text-xs">{power} power</h3>
        </div>
      </div>

      <div>
        <h2 className="text-xs">
          {rank === 0
            ? "1st runner up"
            : rank === 1
              ? "2nd runner up"
              : "3rd runner up"}
        </h2>
      </div>
    </div>
  );
};

export default Top3ClanCard;
