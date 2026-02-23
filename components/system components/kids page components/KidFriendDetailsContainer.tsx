import React from "react";
import Image from "next/image";

type KidFriendProps = {
  profileImage: string;
  name: string;
  level: number;
  rank: string;
};
const KidFriendDetailsContainer = ({
  profileImage,
  name,
  level,
  rank,
}: KidFriendProps) => {
  return (
    <div className="flex p-2 items-center gap-3">
      <div className="rounded-full w-14 h-14 overflow-hidden relative">
        <Image
          src={profileImage}
          alt="profile image"
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col justify-center gap-1">
        <h2 className="">{name}</h2>
        <span className="text-xs">
          <strong>Level {level}</strong> - {rank}
        </span>
      </div>
    </div>
  );
};

export default KidFriendDetailsContainer;
