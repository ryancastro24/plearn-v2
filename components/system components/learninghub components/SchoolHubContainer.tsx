"use client";

import * as React from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import KidSchoolActivityHistory from "./KidSchoolActivityHistory";
import KidSchoolCurrentActivity from "./KidSchoolCurrentActivity";
import KidSchoolStatistics from "./KidSchoolStatistics";
type Person = {
  id: string;
  name: string;
  profileImage: string;
  level: number;
  rank: string;
};

const people: Person[] = [
  {
    id: "u_1",
    name: "Mark Twain",
    profileImage: "/kids page assets/avatar 1.jpg",
    level: 34,
    rank: "Apprentice",
  },
  {
    id: "u_2",
    name: "Liza Twain",
    profileImage: "/kids page assets/avatar 2.avif",
    level: 14,
    rank: "Novice",
  },
];

const SchoolHubContainer = () => {
  const [activeId, setActiveId] = React.useState(people[0].id);

  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-sm font-medium">Enrolled Kids</h2>

      <Tabs value={activeId} onValueChange={setActiveId} className="w-full">
        {/* ---------- CARD TAB BUTTONS ---------- */}
        <TabsList className="bg-transparent p-0 flex  gap-3 h-auto">
          {people.map((p) => (
            <TabsTrigger
              key={p.id}
              value={p.id}
              className="
                group
                flex items-center gap-3
                py-3
                rounded
                h-15
                border border-black/10
                bg-white
                shadow-sm
                data-[state=active]:bg-linear-to-r
                data-[state=active]:from-pink-500
                data-[state=active]:to-rose-400
                data-[state=active]:text-white
                data-[state=active]:border-transparent
                data-[state=active]:shadow-md
                transition-all
              "
            >
              {/* Avatar */}
              <div className="relative w-10 h-10 rounded-full overflow-hidden border">
                <Image
                  src={p.profileImage}
                  alt={p.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Info */}
              <div className=" hidden md:flex flex-col items-start leading-tight">
                <span className="font-semibold">{p.name}</span>
                <span className="text-xs opacity-80">
                  Level {p.level} • {p.rank}
                </span>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ---------- CONTENT (FULL WIDTH) ---------- */}
        <TabsContent value={activeId} className="w-full mt-4">
          <div className="w-full grid  [@media(min-width:700px)]:grid-cols-5 gap-5 [@media(min-width:750px)]:border [@media(min-width:750px)]:border-black/10 [@media(min-width:750px)]:rounded-lg [@media(min-width:750px)]:p-5 bg-white">
            <div className="flex flex-col col-span-5  [@media(min-width:700px)]:col-span-3 w-full ">
              <KidSchoolCurrentActivity />
              <KidSchoolActivityHistory />
            </div>

            <div className=" [@media(min-width:700px)]:col-span-2 col-span-5  w-full border border-black/10 shadow shadow-black/10 rounded">
              <KidSchoolStatistics />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SchoolHubContainer;
