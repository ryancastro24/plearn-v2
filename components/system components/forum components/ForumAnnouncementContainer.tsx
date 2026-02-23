import React from "react";
import Image from "next/image";
const ForumAnnouncementContainer = () => {
  return (
    <div className="shadow shadow-black/20 text-white p-3 md:p-5  rounded border border-black/10 w-full  bg-linear-to-r from-[#FF5B5B] to-[#F04886]">
      <div className="grid md:grid-cols-5 ">
        <div className="md:col-span-3">
          <div className="flex items-center gap-2">
            <Image
              src={"/forum page assets/announcement_icon.png"}
              alt="announcement icon"
              width={40}
              height={40}
            />
            <h1 className="text-lg font-bold"> ANNOUCEMENTS!</h1>
          </div>

          <div className="flex flex-col gap-4 mt-2">
            <p className="text-xs md:text-sm text-justify">
              We’re excited to introduce our brand-new Points System! Earn
              points by completing tasks, winning battles, and staying active,
              then redeem them for exclusive rewards in the Shop!
            </p>

            <p className="text-xs md:text-sm  text-justify">
              And that’s not all… a special limited-time event is coming soon!
              Get ready for bonus points, rare items, and exciting challenges
            </p>

            <p className="text-xs md:text-sm  text-justify">
              Stay tuned and start collecting!{" "}
            </p>
          </div>
        </div>

        <div className="md:col-span-2 hidden md:flex  items-center relative justify-center">
          <Image
            src={"/forum page assets/announcement_hero.png"}
            alt="announcement image"
            width={230}
            height={230}
            className="mt-4 rounded absolute"
          />
        </div>
      </div>
    </div>
  );
};

export default ForumAnnouncementContainer;
