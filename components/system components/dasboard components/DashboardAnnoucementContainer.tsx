"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { IoPlayCircle } from "react-icons/io5";

const DashboardAnnoucementContainer = () => {
  return (
    <div className="w-full h-44 [@media(min-width:600px)]:h-64 [@media(min-width:600px)]:p-10 relative rounded overflow-hidden">
      {/* Cover Image */}
      <Image
        src="/dashboard assets/dashboard annoucement cover.png"
        alt="dashboard cover image"
        fill
        className="object-cover"
        priority
      />

      {/* Text Content */}
      <div className="absolute top-4 left-4 z-20 [@media(min-width:600px)]:p-6 text-white font-bold">
        <h1 className="text-lg   [@media(min-width:600px)]:text-3xl  ">
          Adventure starts
        </h1>
        <h2 className="text-xs font-light [@media(min-width:600px)]:text-sm">
          Learn Through Play. Earn <br /> Through Progress
        </h2>

        <Button className="flex mt-5 text-xs [@media(min-width:600px)]:text-sm  text-black items-center gap-2 bg-white rounded-md">
          Learn Now
          <IoPlayCircle className="text-[#FF5B5B]  [@media(min-width:600px)]:text-lg " />
        </Button>
      </div>

      {/* Heroes Image */}
      <Image
        src="/dashboard assets/dashboard annoucement heroes.png"
        alt="dashboard heroes image"
        width={300}
        height={280}
        sizes="(max-width: 600px) 180px, 300px"
        className="absolute bottom-2 right-2 z-10 
                   w-45 h-auto 
                   [@media(min-width:600px)]:w-75"
      />
    </div>
  );
};

export default DashboardAnnoucementContainer;
