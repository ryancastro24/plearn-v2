import { clans } from "@/lib/clanSampleData";
import Top3ClanCard from "./Top3ClanCard";
import TopClanCard from "./TopClanCard";
const TopClanContainer = () => {
  const topClans = [...clans].sort((a, b) => b.power - a.power);
  return (
    <div>
      <div className="flex flex-col gap-2">
        {topClans.slice(0, 3).map((val, index) => (
          <Top3ClanCard key={val.id} {...val} rank={index} />
        ))}
      </div>

      <div className="flex flex-col gap-2 mt-2">
        {topClans.slice(3).map((val, index) => (
          <TopClanCard key={val.id} {...val} rank={index} />
        ))}
      </div>
    </div>
  );
};

export default TopClanContainer;
