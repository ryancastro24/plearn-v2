"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiGamepadFill } from "react-icons/ri";
// Icon imports

import { FaHouse } from "react-icons/fa6";
import { FaChildren } from "react-icons/fa6";
import { FaClipboardList } from "react-icons/fa6";
import { IoStorefront } from "react-icons/io5";
import { IoChatbubbles } from "react-icons/io5";
const DesktopSideNavigation = () => {
  const pathname = usePathname();
  return (
    <div className="hidden  flex-col items-center gap-5 p-2 shadow-md shadow-black/30 [@media(min-width:920px)]:flex">
      <h1>PLEARN</h1>
      <ul className="h-full w-auto  flex items-center flex-col gap-8">
        <li>
          <Link
            className={`flex items-center cursor-pointer gap-2 ${
              pathname === "/dashboard" ? " text-[#FF5B5B]" : "text-[#C4C4C4]"
            }`}
            href="/dashboard"
          >
            {" "}
            <FaHouse className="text-3xl" />
          </Link>
        </li>
        <li>
          <Link
            className={`flex items-center cursor-pointer gap-2 ${
              pathname.includes("/dashboard/kids")
                ? " text-[#FF5B5B]"
                : "text-[#C4C4C4]"
            }`}
            href="/dashboard/kids"
          >
            {" "}
            <FaChildren className="text-3xl" />
          </Link>
        </li>
        <li>
          <Link
            className={`flex items-center cursor-pointer gap-2 ${
              pathname === "/dashboard/forum"
                ? " text-[#FF5B5B]"
                : "text-[#C4C4C4]"
            }`}
            href="/dashboard/forum"
          >
            {" "}
            <IoChatbubbles className="text-3xl" />
          </Link>
        </li>
        <li>
          <Link
            className={`flex items-center cursor-pointer gap-2 ${
              pathname === "/dashboard/store"
                ? " text-[#FF5B5B]"
                : "text-[#C4C4C4]"
            }`}
            href="/dashboard/store"
          >
            <IoStorefront className="text-3xl" />
          </Link>
        </li>

        <li>
          <Link
            className={`flex items-center cursor-pointer gap-2 ${
              pathname.includes("/dashboard/learninghub")
                ? " text-[#FF5B5B]"
                : "text-[#C4C4C4]"
            }`}
            href="/dashboard/learninghub"
          >
            <RiGamepadFill className="text-3xl" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default DesktopSideNavigation;
