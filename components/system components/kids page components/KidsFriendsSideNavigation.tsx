"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import KidFriendDetailsContainer from "./KidFriendDetailsContainer";
import { Search } from "lucide-react";

type Friend = {
  profileImage: string;
  name: string;
  level: number;
  rank: string;
};

type KidsFriendsSideNavigationProps = {
  setSelectedFriend: (friend: Friend) => void;
};

const LOCAL_STORAGE_KEY = "selectedKidFriend";

const KidsFriendsSideNavigation = ({
  setSelectedFriend,
}: KidsFriendsSideNavigationProps) => {
  const [selectedName, setSelectedName] = useState<string | null>(null);

  const friends: Friend[] = [
    {
      profileImage: "/kids page assets/avatar 1.jpg",
      name: "Carlos James",
      level: 32,
      rank: "Skilled",
    },
    {
      profileImage: "/kids page assets/avatar 2.avif",
      name: "Elito Marvel",
      level: 28,
      rank: "Apprentice",
    },
    {
      profileImage: "/kids page assets/avatar 3.webp",
      name: "Juan Dela Cruz",
      level: 40,
      rank: "Expert",
    },
    {
      profileImage: "/kids page assets/avatar 4.jpg",
      name: "Ryan Joel T. Castro",
      level: 86,
      rank: "Mythic",
    },
    {
      profileImage: "/kids page assets/avatar 5.png",
      name: "Princess Zoan",
      level: 13,
      rank: "Novice",
    },
    {
      profileImage: "/kids page assets/avatar 6.jpg",
      name: "Master Babani",
      level: 99,
      rank: "Primodial",
    },
  ];

  useEffect(() => {
    const savedFriend = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedFriend) {
      const parsed: Friend = JSON.parse(savedFriend);
      setSelectedName(parsed.name);
      setSelectedFriend(parsed);
    }
  }, []);

  const handleSelect = (friend: Friend) => {
    setSelectedName(friend.name);
    setSelectedFriend(friend);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(friend));
  };

  return (
    <div className="flex flex-col gap-2 w-full md:p-4">
      {/* Search */}
      <div className="w-full p-2">
        <InputGroup>
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
      </div>

      {/* Friends List */}
      <div className="flex flex-col gap-2">
        {friends.map((friend) => {
          const isSelected = selectedName === friend.name;

          return (
            <div key={friend.name}>
              {/* Desktop version */}
              <div
                onClick={() => handleSelect(friend)}
                className={`hidden md:block cursor-pointer rounded-lg transition-all duration-200
                  ${isSelected ? "bg-blue-100 border border-blue-400" : "hover:bg-gray-100"}
                `}
              >
                <KidFriendDetailsContainer {...friend} />
              </div>

              {/* Mobile version */}
              <Link
                href={`/dashboard/kids/kid_friends/1/kidFriendMobileConvo/1`}
                onClick={() => handleSelect(friend)}
                className={`md:hidden block cursor-pointer rounded-lg transition-all duration-200
                  ${isSelected ? "bg-blue-100 border border-blue-400" : "hover:bg-gray-100"}
                `}
              >
                <KidFriendDetailsContainer {...friend} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KidsFriendsSideNavigation;
