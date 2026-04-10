import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
type KidsDetailsProps = {
  profileImage: string;
  name: string;
  level: number;
  clanRank: string;
  kid_id: string;
  points: number;
};
import { getRankByLevel } from "@/lib/rankLabels";

const DesktopCardKidDetails = ({
  profileImage,
  name,
  level,
  clanRank,
  kid_id,
  points,
}: KidsDetailsProps) => {
  return (
    <div className="w-full p-4 rounded-lg shadow-md shadow-black/20 border border-black/10 flex items-center justify-between">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-5">
          <div className="rounded-full overflow-hidden relative w-32 h-32">
            <Image
              src={profileImage || "/dashboard assets/boy.jpg"}
              alt="profileImage"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col gap justify-center">
            <h2 className="text-lg">{name.toUpperCase()}</h2>
            <span className="text-sm">
              <strong>Level {level}- </strong>
              {getRankByLevel(level)}
            </span>

            <div className="flex items-center gap-2">
              {/* clan logo container */}
              <div className="w-4 h-4 rounded bg-slate-500"></div>

              <span className="text-sm">
                {!!clanRank ? clanRank : "No Clan"}
              </span>
            </div>

            <div className="flex items-center gap-2 mt-2">
              <div className="w-8 h-8 rounded bg-gray-200 border-2 border-dashed border-gray-300"></div>
              <div className="w-8 h-8 rounded bg-gray-200 border-2 border-dashed border-gray-300"></div>
              <div className="w-8 h-8 rounded bg-gray-200 border-2 border-dashed border-gray-300"></div>
              <div className="w-8 h-8 rounded bg-gray-200 border-2 border-dashed border-gray-300"></div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-4 mt-2">
            <Link href={`/dashboard/kids/kid_friends/${kid_id}`}>
              <Button className="w-12 h-12 bg-white hover:bg-white/50 border border-black/10 shadow-md shadow-black/30 rounded relative cursor-pointer overflow-hidden">
                <Image
                  src="/kids page assets/friends_icon.png"
                  alt="friends_icon"
                  fill
                />
              </Button>
            </Link>

            <Link href={`/dashboard/kids/kid_tasks/${kid_id}`}>
              <Button className="w-12 h-12 bg-white hover:bg-white/50 border border-black/10 shadow-md shadow-black/30 rounded relative cursor-pointer overflow-hidden">
                <Image
                  src="/kids page assets/tasks_icon.png"
                  alt="tasks_icon"
                  fill
                />
              </Button>
            </Link>

            <Link href={`/dashboard/kids/kid_inventory/${kid_id}`}>
              <Button className="w-12 h-12 bg-white hover:bg-white/50 border border-black/10 shadow-md shadow-black/30 rounded relative cursor-pointer overflow-hidden">
                <Image
                  src="/kids page assets/inventory_icon.png"
                  alt="inventory_icon"
                  fill
                />
              </Button>
            </Link>

            <div className="w-50 h-10 rounded bg-gray-100 flex items-center gap-2">
              <div className="h-10 w-10 bg-gray-200 rounded relative overflow-hidden border-2 border-dashed border-gray-300 p-2">
                <Image
                  src="/dashboard assets/game coin.png"
                  alt="coin"
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="">{points.toLocaleString()} pts</h2>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 justify-items-center items-center gap-4 w-87.5 ">
        <div className=" border border-black/10 shadow-md shadow-black/30 w-24 h-24 rounded relative overflow-hidden flex items-center justify-center">
          <Image
            src="/kids page assets/chore_icon.png"
            alt="chores_icon"
            width={80}
            height={80}
          />
        </div>

        <div className=" border border-black/10 shadow-md shadow-black/30 w-24 h-24 rounded relative overflow-hidden flex items-center justify-center">
          <Image
            src="/kids page assets/academics_icon.png"
            alt="chores_icon"
            width={80}
            height={80}
          />
        </div>

        <div className=" border border-black/10 shadow-md shadow-black/30 w-24 h-24 rounded relative overflow-hidden flex items-center justify-center">
          <Image
            src="/kids page assets/sports_icon.png"
            alt="chores_icon"
            width={80}
            height={80}
          />
        </div>

        <div className="border border-black/10 shadow-md shadow-black/30 w-24 h-24 rounded relative overflow-hidden flex items-center justify-center">
          <Image
            src="/kids page assets/behavior_icon.png"
            alt="chores_icon"
            width={80}
            height={80}
          />
        </div>

        <div className=" border border-black/10 shadow-md shadow-black/30 w-24 h-24 rounded relative overflow-hidden flex items-center justify-center">
          <Image
            src="/kids page assets/social_icon.png"
            alt="chores_icon"
            width={80}
            height={80}
          />
        </div>

        <div className=" border border-black/10 shadow-md shadow-black/30 w-24 h-24 rounded relative overflow-hidden flex items-center justify-center">
          <Image
            src="/kids page assets/hobbies_icon.png"
            alt="chores_icon"
            width={80}
            height={80}
          />
        </div>
      </div>
    </div>
  );
};

export default DesktopCardKidDetails;
