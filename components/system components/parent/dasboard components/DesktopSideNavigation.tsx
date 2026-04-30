"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { RiGamepadFill } from "react-icons/ri";
import { FaHouse, FaChildren } from "react-icons/fa6";
import { IoStorefront, IoChatbubbles } from "react-icons/io5";
import { Menu } from "lucide-react";

import LogoutAlertDialog from "../../admin/admin dashboard components/LogoutAlertDialog";

const DesktopSideNavigation = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
      href: "/dashboard/parent",
      icon: FaHouse,
      label: "Home",
      active: pathname === "/dashboard/parent",
    },
    {
      href: "/dashboard/parent/kids",
      icon: FaChildren,
      label: "Kids",
      active: pathname.includes("/kids"),
    },
    {
      href: "/dashboard/parent/store",
      icon: IoStorefront,
      label: "Store",
      active: pathname === "/dashboard/parent/store",
    },
    {
      href: "/dashboard/parent/learninghub",
      icon: RiGamepadFill,
      label: "Learnix",
      active: pathname.includes("/learninghub"),
    },
    {
      href: "/dashboard/parent/forum",
      icon: IoChatbubbles,
      label: "Forum",
      active: pathname.includes("/forum"),
    },
  ];

  return (
    <div
      className={`
        hidden [@media(min-width:920px)]:flex
        sticky top-0 self-start h-screen flex-col
        transition-all duration-300
        ${isOpen ? "w-52 items-start px-4" : "w-16 items-center px-2"}
        gap-5 py-4 shadow-md shadow-black/30 bg-white
      `}
    >
      {isOpen ? (
        <h1
          onClick={() => setIsOpen(!isOpen)}
          className="text-lg cursor-pointer font-bold"
        >
          PLEARN
        </h1>
      ) : (
        <div
          className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-400"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h2 className="text-white font-bold">P</h2>
        </div>
      )}
      {/* 🔗 Navigation */}
      <ul className="flex flex-col gap-6 w-full">
        {navItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <li key={index}>
              <Link
                href={item.href}
                className={`
                  flex items-center gap-3 w-full
                  ${isOpen ? "justify-start" : "justify-center"}
                  ${item.active ? "text-[#FF5B5B]" : "text-[#C4C4C4]"}
                  hover:text-[#FF5B5B] transition
                `}
              >
                <Icon
                  className={`
                    transition-all
                    ${isOpen ? "text-xl" : "text-3xl"}
                  `}
                />

                {/* 🏷 Label */}
                {isOpen && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* 🚪 Logout */}
      <div className="mt-auto w-full flex justify-center">
        <LogoutAlertDialog isOpen={isOpen} />
      </div>
    </div>
  );
};

export default DesktopSideNavigation;
