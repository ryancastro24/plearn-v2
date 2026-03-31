"use client";
import ClassTopicCard from "./ClassTopicCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { LuLogOut } from "react-icons/lu";
const ClassInnerDetailsContainer = () => {
  const sampleClassTopic = [
    { id: 1, title: "Reading session 1", lock: false },
    { id: 2, title: "Reading session 2", lock: true },
    { id: 3, title: "Reading session 3", lock: true },
    { id: 4, title: "Reading session 4", lock: true },
    { id: 5, title: "Reading session 5", lock: true },
    { id: 6, title: "Reading session 6", lock: true },
    { id: 7, title: "Reading session 7", lock: true },
  ];

  const [selectedTopic, setSelectedTopic] = useState({
    id: sampleClassTopic[0].id,
    title: sampleClassTopic[0].title,
  });

  return (
    <div className="w-full grid grid-cols-6 h-full">
      {/* LEFT SIDE (Scrollable) */}
      <div className="w-full col-span-1 h-full flex flex-col border border-shadow/10 shadow shadow-black/30">
        {/* SCROLLABLE AREA */}

        <div className="w-full p-2 flex flex-col items-center gap-2">
          <div className="w-full flex flex-col items-center gap-2">
            {sampleClassTopic.map((val, index) => (
              <ClassTopicCard key={val.id} {...val} index={index} />
            ))}
          </div>

          <Link className="w-full" href={"/"}>
            <Button className="w-full bg-[#685AFF] text-white">
              Add new topic
            </Button>
          </Link>
        </div>

        {/* FIXED FOOTER (will NOT scroll) */}
        <div className="sticky bottom-0  p-2 h-20 bg-white flex items-center gap-2 justify-center">
          {/* your footer content */}

          <Button className="flex items-center gap-1" variant={"secondary"}>
            <LuLogOut />
            Exit
          </Button>
          <Button className="bg-[#ff5b5b] text-white">Menu</Button>
        </div>
      </div>

      {/* RIGHT SIDE (Static) */}
      <div className="col-span-5 sticky top-0 w-full  isolate overflow-hidden ">
        {/* content here */}

        <Image
          src={"/learninghub page assets/world2.png"}
          alt="topic bg"
          fill
          className="absolute inset-0 z-[-1]"
        />
      </div>
    </div>
  );
};

export default ClassInnerDetailsContainer;
