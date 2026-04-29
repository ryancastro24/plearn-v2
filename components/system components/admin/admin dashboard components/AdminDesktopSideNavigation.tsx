"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Icon imports
import { RiDashboardFill } from "react-icons/ri";
import { RiGamepadFill } from "react-icons/ri";
import { FaSchool } from "react-icons/fa6";
import { IoStorefront } from "react-icons/io5";
import { logoutUser } from "@/backend/auth";
import { useRouter } from "next/navigation";
import LogoutAlertDialog from "./LogoutAlertDialog";
const AdminDesktopSideNavigation = () => {
  const pathname = usePathname();

  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  return (
    <div className="hidden [@media(min-width:920px)]:flex sticky top-0 self-start h-screen flex-col items-center gap-5 p-2 shadow-md shadow-black/30">
      <h1>PLEARN</h1>
      <ul className="h-full w-auto  flex items-center flex-col gap-8">
        <li>
          <Link
            className={`flex items-center cursor-pointer gap-2 ${
              pathname === "/dashboard/admin"
                ? " text-[#FF5B5B]"
                : "text-[#C4C4C4]"
            }`}
            href="/dashboard/admin"
          >
            {" "}
            <RiDashboardFill className="text-3xl" />
          </Link>
        </li>

        <li>
          <Link
            className={`flex items-center cursor-pointer gap-2 ${
              pathname.includes("/dashboard/admin/school")
                ? " text-[#FF5B5B]"
                : "text-[#C4C4C4]"
            }`}
            href="/dashboard/admin/school"
          >
            {" "}
            <FaSchool className="text-3xl" />
          </Link>
        </li>

        <li>
          <Link
            className={`flex items-center cursor-pointer gap-2 ${
              pathname === "/dashboard/admin/store"
                ? " text-[#FF5B5B]"
                : "text-[#C4C4C4]"
            }`}
            href="/dashboard/admin/store"
          >
            <IoStorefront className="text-3xl" />
          </Link>
        </li>

        <li>
          <Link
            className={`flex items-center cursor-pointer gap-2 ${
              pathname.includes("/dashboard/admin/learninghub")
                ? " text-[#FF5B5B]"
                : "text-[#C4C4C4]"
            }`}
            href="/dashboard/admin/learninghub"
          >
            <RiGamepadFill className="text-3xl" />
          </Link>
        </li>
      </ul>

      <div>
        <LogoutAlertDialog />
      </div>
    </div>
  );
};

export default AdminDesktopSideNavigation;
