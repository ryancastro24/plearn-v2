"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { RiGamepadFill } from "react-icons/ri";
import { RiDashboardFill } from "react-icons/ri";
// Shadcn imports
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";
// icon imports
import { FaSchool } from "react-icons/fa6";
import { HiMenuAlt3 } from "react-icons/hi";
import { FaHouse, FaChildren } from "react-icons/fa6";
import { IoStorefront, IoChatbubbles } from "react-icons/io5";

import Link from "next/link";

const MobileSideNavigation = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false); // ✅ control drawer

  const handleNavigate = () => {
    setOpen(false); // ✅ close drawer on click
  };

  return (
    <div>
      <div className="w-full flex items-center justify-between bg-linear-to-r from-[#FF5B5B] to-[#F04886] p-4 [@media(min-width:920px)]:hidden">
        <h1>Logo</h1>

        <Drawer open={open} onOpenChange={setOpen} direction="right">
          <DrawerTrigger asChild>
            <Button>
              <HiMenuAlt3 className="text-2xl text-white" />
            </Button>
          </DrawerTrigger>

          <DrawerContent>
            <DrawerHeader className="flex flex-col gap-5">
              <DrawerTitle>PLEARN</DrawerTitle>

              <ul className="flex flex-col gap-4">
                <li>
                  <Link
                    onClick={handleNavigate}
                    className={`flex items-center gap-2 ${
                      pathname === "/dashboard/admin_dashboard"
                        ? "font-bold text-[#FF5B5B]"
                        : ""
                    }`}
                    href="/dashboard/admin_dashboard"
                  >
                    <RiDashboardFill />
                    Admin Dashboard
                  </Link>
                </li>

                <li>
                  <Link
                    onClick={handleNavigate}
                    className={`flex items-center gap-2 ${
                      pathname.includes("/dashboard/school_management")
                        ? "font-bold text-[#FF5B5B]"
                        : ""
                    }`}
                    href="/dashboard/school_management"
                  >
                    <FaSchool />
                    School Management
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={handleNavigate}
                    className={`flex items-center gap-2 ${
                      pathname === "/dashboard"
                        ? "font-bold text-[#FF5B5B]"
                        : ""
                    }`}
                    href="/dashboard"
                  >
                    <FaHouse />
                    Home
                  </Link>
                </li>

                <li>
                  <Link
                    onClick={handleNavigate}
                    className={`flex items-center gap-2 ${
                      pathname.includes("/dashboard/kids")
                        ? "font-bold text-[#FF5B5B]"
                        : ""
                    }`}
                    href="/dashboard/kids"
                  >
                    <FaChildren />
                    Kids
                  </Link>
                </li>

                <li>
                  <Link
                    onClick={handleNavigate}
                    className={`flex items-center gap-2 ${
                      pathname === "/dashboard/forum"
                        ? "font-bold text-[#FF5B5B]"
                        : ""
                    }`}
                    href="/dashboard/forum"
                  >
                    <IoChatbubbles />
                    Forum
                  </Link>
                </li>

                <li>
                  <Link
                    onClick={handleNavigate}
                    className={`flex items-center gap-2 ${
                      pathname === "/dashboard/store"
                        ? "font-bold text-[#FF5B5B]"
                        : ""
                    }`}
                    href="/dashboard/store"
                  >
                    <IoStorefront />
                    Store
                  </Link>
                </li>

                <li>
                  <Link
                    onClick={handleNavigate}
                    className={`flex items-center gap-2 ${
                      pathname.includes("/dashboard/learninghub")
                        ? "font-bold text-[#FF5B5B]"
                        : ""
                    }`}
                    href="/dashboard/learninghub"
                  >
                    <RiGamepadFill />
                    Learning Hub
                  </Link>
                </li>

                <li>
                  <Link
                    onClick={handleNavigate}
                    className={`flex items-center gap-2 ${
                      pathname.includes("/dashboard/admin_learninghub")
                        ? "font-bold text-[#FF5B5B]"
                        : ""
                    }`}
                    href="/dashboard/admin_learninghub"
                  >
                    <RiGamepadFill />
                    Learning Hub Admin
                  </Link>
                </li>
              </ul>
            </DrawerHeader>

            <DrawerFooter />
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default MobileSideNavigation;
