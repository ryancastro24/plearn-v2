"use client";

import MobileDropDownOption from "./MobileDropDownOption";
import DesktopKidDetailsContainer from "./DesktopKidDetailsContainer";
import AddNewKidsModal from "./AddNewKidsModal";

import { useQuery } from "@tanstack/react-query";
import { getUserKids } from "@/lib/userQueryOptions";

const KidsClientComponent = () => {
  const { data: kidsData } = useQuery(getUserKids());

  console.log("kids data in client component", kidsData);
  return (
    <div className="flex flex-col gap-2 p-2 w-full relative">
      <h1>Manage your kids</h1>

      <div className="[@media(min-width:650px)]:hidden ">
        <MobileDropDownOption kids={kidsData} />
      </div>

      <div className="[@media(min-width:650px)]:block hidden">
        <DesktopKidDetailsContainer kids={kidsData} />
      </div>

      <div className="fixed bottom-5 right-5">
        <AddNewKidsModal />
      </div>
    </div>
  );
};

export default KidsClientComponent;
