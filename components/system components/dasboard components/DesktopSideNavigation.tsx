"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
// Icon imports
import { RiDashboardFill } from "react-icons/ri";
import { RiGamepadFill } from "react-icons/ri";
import { FaSchool } from "react-icons/fa6";
import { FaHouse } from "react-icons/fa6";
import { FaChildren } from "react-icons/fa6";
import { IoStorefront } from "react-icons/io5";
import { IoChatbubbles } from "react-icons/io5";
import { getUserLoginData } from "@/lib/userQueryOptions";
import { useUser } from "@/lib/userContext";
const DesktopSideNavigation = () => {
  const { user } = useUser();
  const pathname = usePathname();
  return (
    <div className="hidden [@media(min-width:920px)]:flex sticky top-0 self-start h-screen flex-col items-center gap-5 p-2 shadow-md shadow-black/30">
      <h1>PLEARN</h1>
      <ul className="h-full w-auto  flex items-center flex-col gap-8">
        {user?.userType === "user" && (
          <>
            <li>
              <Link
                className={`flex items-center cursor-pointer gap-2 ${
                  pathname === "/dashboard"
                    ? " text-[#FF5B5B]"
                    : "text-[#C4C4C4]"
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
          </>
        )}

        {user?.userType === "admin" && (
          <>
            <li>
              <Link
                className={`flex items-center cursor-pointer gap-2 ${
                  pathname === "/dashboard/admin_dashboard"
                    ? " text-[#FF5B5B]"
                    : "text-[#C4C4C4]"
                }`}
                href="/dashboard/admin_dashboard"
              >
                {" "}
                <RiDashboardFill className="text-3xl" />
              </Link>
            </li>

            <li>
              <Link
                className={`flex items-center cursor-pointer gap-2 ${
                  pathname.includes("/dashboard/school_management")
                    ? " text-[#FF5B5B]"
                    : "text-[#C4C4C4]"
                }`}
                href="/dashboard/school_management"
              >
                {" "}
                <FaSchool className="text-3xl" />
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
                  pathname.includes("/dashboard/admin_learninghub")
                    ? " text-[#FF5B5B]"
                    : "text-[#C4C4C4]"
                }`}
                href="/dashboard/admin_learninghub"
              >
                <RiGamepadFill className="text-3xl" />
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default DesktopSideNavigation;
