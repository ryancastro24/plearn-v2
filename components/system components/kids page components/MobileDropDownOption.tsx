"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { getRankByLevel } from "@/lib/rankLabels";
type Kid = {
  _id: string;
  profileImage: string;
  firstname: string;
  lastname: string;
  level: number;
  rank: string;
  clanRank: string;
};
type KidsProps = {
  kids: Kid[]; // array of kid objects
};

const MobileDropDownOption = ({ kids = [] }: KidsProps) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full space-y-3">
      {kids.map((kid) => {
        const isOpen = openId === kid._id;

        return (
          <div
            key={kid._id}
            className="border  bg-white shadow-sm overflow-hidden transition-all rounded"
          >
            {/* Card Header */}
            <button
              onClick={() => handleToggle(kid._id)}
              className="w-full flex items-center justify-between p-2 text-left"
            >
              <div className="flex items-center gap-2">
                <div className="rounded-full w-20 h-20 relative overflow-hidden">
                  <Image
                    src={kid.profileImage || "/dashboard assets/boy.jpg"}
                    alt="profile image"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col gap justify-center">
                  <h2>
                    {kid.firstname.toUpperCase()} {kid.lastname.toUpperCase()}
                  </h2>
                  <span className="text-xs">
                    <strong>Level {kid.level}- </strong>
                    {getRankByLevel(kid.level)}
                  </span>

                  <div className="flex items-center gap-2">
                    {/* clan logo container */}
                    <div className="w-4 h-4 rounded bg-slate-500"></div>

                    <span className="text-xs">
                      {!!kid.clanRank ? kid.clanRank : "No Clan"}
                    </span>
                  </div>
                </div>
              </div>
            </button>

            {/* Slide Content */}
            <div
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden p-2 flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-gray-200 border-2 border-dashed border-gray-300"></div>
                    <div className="w-6 h-6 rounded bg-gray-200 border-2 border-dashed border-gray-300"></div>
                    <div className="w-6 h-6 rounded bg-gray-200 border-2 border-dashed border-gray-300"></div>
                    <div className="w-6 h-6 rounded bg-gray-200 border-2 border-dashed border-gray-300"></div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link href={"/dashboard/kids/kid_friends/1"}>
                      <Button className="w-12 h-12 bg-white hover:bg-white/50 border border-black/10 shadow-md shadow-black/30 rounded relative cursor-pointer overflow-hidden">
                        <Image
                          src="/kids page assets/friends_icon.png"
                          alt="friends_icon"
                          fill
                        />
                      </Button>
                    </Link>

                    <Link href={"/dashboard/kids/kid_tasks/1"}>
                      <Button className="w-12 h-12 bg-white hover:bg-white/50 border border-black/10 shadow-md shadow-black/30 rounded relative cursor-pointer overflow-hidden">
                        <Image
                          src="/kids page assets/tasks_icon.png"
                          alt="tasks_icon"
                          fill
                        />
                      </Button>
                    </Link>

                    <Link href={"/dashboard/kids/kid_inventory/1"}>
                      <Button className="w-12 h-12 bg-white hover:bg-white/50 border border-black/10 shadow-md shadow-black/30 rounded relative cursor-pointer overflow-hidden">
                        <Image
                          src="/kids page assets/inventory_icon.png"
                          alt="inventory_icon"
                          fill
                        />
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="grid grid-cols-3 justify-items-center items-center gap-4 w-full">
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

                  <div className=" border border-black/10 shadow-md shadow-black/30 w-24 h-24 rounded relative overflow-hidden flex items-center justify-center">
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
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MobileDropDownOption;
