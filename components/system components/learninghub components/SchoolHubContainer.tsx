"use client";

import * as React from "react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import KidSchoolActivityHistory from "./KidSchoolActivityHistory";
import KidSchoolCurrentActivity from "./KidSchoolCurrentActivity";
import KidSchoolStatistics from "./KidSchoolStatistics";
import { getRankByLevel } from "@/lib/rankLabels";

const SchoolHubContainer = ({ enrolledStudents }: any) => {
  const [activeId, setActiveId] = React.useState(
    enrolledStudents?.[0]?._id || "",
  );

  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-sm font-medium">Enrolled Kids</h2>

      <Tabs value={activeId} onValueChange={setActiveId} className="w-full">
        {/* ---------- TAB BUTTONS ---------- */}
        <TabsList className="bg-transparent p-0 flex gap-3 h-auto">
          {enrolledStudents?.map((val: any) => (
            <TabsTrigger
              key={val._id}
              value={val._id}
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
                  src={"/kids page assets/avatar 1.jpg"}
                  alt={`${val.studentId.firstname} ${val.studentId.lastname}`}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Info */}
              <div className="hidden md:flex flex-col items-start leading-tight">
                <span className="font-semibold">
                  {val.studentId.firstname} {val.studentId.lastname}
                </span>
                <span className="text-xs opacity-80">
                  Level {val.studentId.level} •{" "}
                  {getRankByLevel(val.studentId.level)}
                </span>
              </div>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* ---------- TAB CONTENT ---------- */}
        {enrolledStudents?.map((val: any) => (
          <TabsContent key={val._id} value={val._id} className="w-full mt-4">
            {!val.isEnrolled ? (
              /* ❌ NOT ENROLLED */
              <div className="w-full p-6 border border-black/10 rounded-lg bg-white text-center">
                <h3 className="text-lg font-semibold">
                  Kid enrollment is{" "}
                  {val.enrollmentStatus === "pending"
                    ? "pending"
                    : val.enrollmentStatus === "rejected"
                      ? "rejected"
                      : "not approved"}
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Please wait for approval or contact the school for more
                  details.
                </p>
              </div>
            ) : (
              /* ✅ ENROLLED */
              <div className="w-full grid [@media(min-width:700px)]:grid-cols-5 gap-5 [@media(min-width:750px)]:border [@media(min-width:750px)]:border-black/10 [@media(min-width:750px)]:rounded-lg [@media(min-width:750px)]:p-5 bg-white">
                <div className="flex flex-col col-span-5 [@media(min-width:700px)]:col-span-3 w-full">
                  <KidSchoolCurrentActivity />
                  <KidSchoolActivityHistory />
                </div>

                <div className="[@media(min-width:700px)]:col-span-2 col-span-5 w-full border border-black/10 shadow shadow-black/10 rounded">
                  <KidSchoolStatistics />
                </div>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default SchoolHubContainer;
