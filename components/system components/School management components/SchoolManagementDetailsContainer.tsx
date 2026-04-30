"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RiEdit2Fill } from "react-icons/ri";
import PaymentsTabContainer from "./PaymentsTabContainer";
import SchoolAnalytics from "./SchoolAnalytics";
import ManageSchoolUsersTabContainer from "./ManageSchoolUsersTabContainer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { getSchoolDetailsQuery } from "@/lib/schoolQueryOptions";
const SchoolManagementDetailsContainer = ({ id }: any) => {
  const [activeTab, setActiveTab] = useState("analytics");

  const { data: schoolDetails, isLoading } = useQuery(
    getSchoolDetailsQuery(id),
  );

  // ✅ Safe logo handling
  const logoSrc =
    schoolDetails?.logo && schoolDetails.logo.trim() !== ""
      ? schoolDetails.logo
      : null;

  return (
    <div className="w-full">
      <div className="flex justify-between">
        {/* LEFT SIDE */}

        <div className="flex items-center gap-2">
          {/* ✅ Image Fix */}
          {logoSrc ? (
            <Image
              src={logoSrc}
              alt="school logo"
              width={60}
              height={60}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-15 h-15 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-500">
              No Logo
            </div>
          )}

          <div>
            <h2 className="text-sm font-semibold">
              {isLoading ? "Loading..." : schoolDetails?.name || "No Name"}
            </h2>
            <h3 className="text-xs text-gray-500">
              ID#: {schoolDetails?.schoolId || "No ID"}
            </h3>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2">
          {/* MOBILE SELECT */}
          <div className="md:hidden">
            <Select onValueChange={(val) => setActiveTab(val)}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Analytics" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="analytics">Analytics</SelectItem>
                  <SelectItem value="payments">
                    Payments & Subscription
                  </SelectItem>
                  <SelectItem value="manage_users">Manage Users</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* DESKTOP BUTTONS */}
          <div className="items-center gap-2 hidden md:flex">
            <Button
              onClick={() => setActiveTab("analytics")}
              className={`hover:bg-[#db5050] ${
                activeTab === "analytics" ? "bg-[#FF5B5B]" : "bg-gray-300"
              }`}
            >
              Analytics
            </Button>

            <Button
              onClick={() => setActiveTab("payments")}
              className={`hover:bg-[#db5050] ${
                activeTab === "payments" ? "bg-[#FF5B5B]" : "bg-gray-300"
              }`}
            >
              Payments & Subscriptions
            </Button>

            <Button
              onClick={() => setActiveTab("manage_users")}
              className={`hover:bg-[#db5050] ${
                activeTab === "manage_users" ? "bg-[#FF5B5B]" : "bg-gray-300"
              }`}
            >
              Manage Users
            </Button>

            <Button className="bg-[#507FFF]" size={"icon"}>
              <RiEdit2Fill />
            </Button>
          </div>
        </div>
      </div>

      {/* TAB CONTENT */}
      <div className="mt-4">
        {activeTab === "analytics" && <SchoolAnalytics />}
        {activeTab === "payments" && <PaymentsTabContainer />}
        {activeTab === "manage_users" && <ManageSchoolUsersTabContainer />}
      </div>
    </div>
  );
};

export default SchoolManagementDetailsContainer;
