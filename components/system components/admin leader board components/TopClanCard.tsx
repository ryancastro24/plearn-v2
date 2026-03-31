import Image from "next/image";
type TopClanCardProp = {
  logo: string;
  name: string;
  power: number;
  rank: number;
};

const TopClanCard = ({ logo, name, power, rank }: TopClanCardProp) => {
  return (
    <div
      className={` shadow  shadow-black/15 flex items-center justify-between p-2 rounded border border-black/6`}
    >
      <div className="flex items-center gap-2">
        <Image src={logo} alt="clan logo" width={40} height={40} />

        <div>
          <h2 className="text-sm font-bold">{name}</h2>
          <h3 className="text-xs">{power} power</h3>
        </div>
      </div>
    </div>
  );
};

export default TopClanCard;
