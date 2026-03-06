"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RiEdit2Fill } from "react-icons/ri";
import PaymentsTabContainer from "./PaymentsTabContainer";
import ManageSchoolUsersTabContainer from "./ManageSchoolUsersTabContainer";
const SchoolManagementDetailsContainer = () => {
  const [activeTab, setActiveTab] = useState("payments");
  return (
    <div className="w-full">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Image
            src={"/learninghub page assets/sample school logo.png"}
            alt="sample logo"
            width={60}
            height={60}
          />
          <div>
            <h2 className="text-lg font-bold">Future Kids Inc.</h2>
            <h3 className="text-sm">91923913132</h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => setActiveTab("payments")}
            className={`hover:bg-[#db5050] ${activeTab == "payments" ? "bg-[#FF5B5B]" : "bg-gray-300"}`}
          >
            Payments & Subscriptions
          </Button>
          <Button
            onClick={() => setActiveTab("manage_users")}
            className={`hover:bg-[#db5050] ${activeTab == "manage_users" ? "bg-[#FF5B5B]" : "bg-gray-300"}`}
          >
            Manage Users
          </Button>
          <Button className="bg-[#507FFF]" size={"icon"}>
            <RiEdit2Fill />
          </Button>
        </div>
      </div>

      <div>
        {activeTab === "payments" && <PaymentsTabContainer />}
        {activeTab === "manage_users" && <ManageSchoolUsersTabContainer />}
      </div>
    </div>
  );
};

export default SchoolManagementDetailsContainer;
