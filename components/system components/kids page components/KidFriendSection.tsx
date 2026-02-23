"use client";

import { useEffect, useState } from "react";
import KidsFriendsSideNavigation from "@/components/system components/kids page components/KidsFriendsSideNavigation";
import KidFriendDesktopChatBox from "@/components/system components/kids page components/KidFriendDesktopChatBox";
import Image from "next/image";

type SelectedFriend = {
  profileImage: string | null;
  name: string;
  level: number;
  rank: string;
};

const LOCAL_STORAGE_KEY = "selectedKidFriend";

const KidFriendSection = () => {
  const [selectedFriend, setSelectedFriend] = useState<SelectedFriend | null>(
    null,
  );
  useEffect(() => {
    const savedFriend = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (savedFriend) {
      const parsed: SelectedFriend = JSON.parse(savedFriend);
      setSelectedFriend(parsed);
    }
  }, []); // ✅ EMPTY dependency array

  return (
    <div className="w-full grid md:grid-cols-6 h-screen">
      {/* LEFT SIDE */}
      <div className="w-full md:col-span-2">
        <div className="flex items-center gap-2 p-4">
          <div className="rounded-full w-20 h-20 overflow-hidden relative">
            <Image
              src={"/dashboard assets/boy.jpg"}
              alt="profile image"
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center gap-1">
            <h2>Mark Twain</h2>
            <span className="text-xs">
              <strong>Level 24</strong> - Apprentice
            </span>

            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-gray-400"></div>
              <span className="text-xs">1st division captain</span>
            </div>
          </div>
        </div>

        <KidsFriendsSideNavigation
          setSelectedFriend={(friend) => {
            setSelectedFriend(friend);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(friend));
          }}
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="md:col-span-4 w-full h-full hidden md:block">
        {selectedFriend && (
          <KidFriendDesktopChatBox
            profileImage={selectedFriend.profileImage}
            name={selectedFriend.name}
            level={selectedFriend.level}
            rank={selectedFriend.rank}
          />
        )}
      </div>
    </div>
  );
};

export default KidFriendSection;
