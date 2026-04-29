"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
// Icon imports
import { RiGamepadFill } from "react-icons/ri";
import { FaHouse } from "react-icons/fa6";
import { FaChildren } from "react-icons/fa6";
import { IoStorefront } from "react-icons/io5";
import { IoChatbubbles } from "react-icons/io5";
import LogoutAlertDialog from "../../admin/admin dashboard components/LogoutAlertDialog";
const DesktopSideNavigation = () => {
  const pathname = usePathname();
  return (
    <div className="hidden [@media(min-width:920px)]:flex sticky top-0 self-start h-screen flex-col items-center gap-5 p-2 shadow-md shadow-black/30">
      <h1>PLEARN</h1>
      <ul className="h-full w-auto  flex items-center flex-col gap-8">
        <li>
          <Link
            className={`flex items-center cursor-pointer gap-2 ${
              pathname === "/dashboard/parent"
                ? " text-[#FF5B5B]"
                : "text-[#C4C4C4]"
            }`}
            href="/dashboard/parent"
          >
            {" "}
            <FaHouse className="text-3xl" />
          </Link>
        </li>

        <li>
          <Link
            className={`flex items-center cursor-pointer gap-2 ${
              pathname.includes("/dashboard/parent/kids")
                ? " text-[#FF5B5B]"
                : "text-[#C4C4C4]"
            }`}
            href="/dashboard/parent/kids"
          >
            {" "}
            <FaChildren className="text-3xl" />
          </Link>
        </li>

        <li>
          <Link
            className={`flex items-center cursor-pointer gap-2 ${
              pathname === "/dashboard/parent/store"
                ? " text-[#FF5B5B]"
                : "text-[#C4C4C4]"
            }`}
            href="/dashboard/parent/store"
          >
            <IoStorefront className="text-3xl" />
          </Link>
        </li>

        <li>
          <Link
            className={`flex items-center cursor-pointer gap-2 ${
              pathname.includes("/dashboard/parent/learninghub")
                ? " text-[#FF5B5B]"
                : "text-[#C4C4C4]"
            }`}
            href="/dashboard/parent/learninghub"
          >
            <RiGamepadFill className="text-3xl" />
          </Link>
        </li>

        <li>
          <Link
            className={`flex items-center cursor-pointer gap-2 ${
              pathname.includes("/dashboard/parent/forum")
                ? " text-[#FF5B5B]"
                : "text-[#C4C4C4]"
            }`}
            href="/dashboard/parent/forum"
          >
            <IoChatbubbles className="text-3xl" />
          </Link>
        </li>
      </ul>
      <div>
        <LogoutAlertDialog />
      </div>
    </div>
  );
};

export default DesktopSideNavigation;
