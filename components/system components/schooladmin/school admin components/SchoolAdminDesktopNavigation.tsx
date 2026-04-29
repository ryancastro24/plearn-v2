"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
// Icon imports
import { RiDashboardFill } from "react-icons/ri";
import { FaChildren } from "react-icons/fa6";
import { HiUserGroup } from "react-icons/hi";
import LogoutAlertDialog from "../../admin/admin dashboard components/LogoutAlertDialog";
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
              pathname.includes("/dashboard/schooladmin/teachers")
                ? " text-[#FF5B5B]"
                : "text-[#C4C4C4]"
            }`}
            href="/dashboard/schooladmin/teachers"
          >
            {" "}
            <HiUserGroup className="text-3xl" />
          </Link>
        </li>

        <li>
          <Link
            className={`flex items-center cursor-pointer gap-2 ${
              pathname.includes("/dashboard/schooladmin/students")
                ? " text-[#FF5B5B]"
                : "text-[#C4C4C4]"
            }`}
            href="/dashboard/schooladmin/students"
          >
            {" "}
            <FaChildren className="text-3xl" />
          </Link>
        </li>
      </ul>
      <div>
        <LogoutAlertDialog />
      </div>
    </div>
  );
};

export default SchoolAdminDesktopSideNavigation;
