"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
// Icon imports
import { RiDashboardFill } from "react-icons/ri";
import { RiGamepadFill } from "react-icons/ri";
import { FaSchool } from "react-icons/fa6";
import { FaChildren } from "react-icons/fa6";
import { IoStorefront } from "react-icons/io5";

const SchoolAdminDesktopSideNavigation = () => {
  const pathname = usePathname();
  return (
    <div className="hidden [@media(min-width:920px)]:flex sticky top-0 self-start h-screen flex-col items-center gap-5 p-2 shadow-md shadow-black/30">
      <h1>PLEARN</h1>
      <ul className="h-full w-auto  flex items-center flex-col gap-8">
        <li>
          <Link
            className={`flex items-center cursor-pointer gap-2 ${
              pathname === "/dashboard/schooladmin"
                ? " text-[#FF5B5B]"
                : "text-[#C4C4C4]"
            }`}
            href="/dashboard/schooladmin"
          >
            {" "}
            <RiDashboardFill className="text-3xl" />
          </Link>
        </li>

        <li>
          <Link
            className={`flex items-center cursor-pointer gap-2 ${
              pathname.includes("/dashboard/schooladmin/school")
                ? " text-[#FF5B5B]"
                : "text-[#C4C4C4]"
            }`}
            href="/dashboard/schooladmin/school"
          >
            {" "}
            <FaSchool className="text-3xl" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SchoolAdminDesktopSideNavigation;
