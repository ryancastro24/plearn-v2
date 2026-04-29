"use client";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import DashboardAnnoucementContainer from "@/components/system components/parent/dasboard components/DashboardAnnoucementContainer";
import KidsDashboardProfileContainer from "@/components/system components/parent/dasboard components/KidDashboardProfileContainer";
import TasksContainerComponent from "@/components/system components/parent/kids page components/TasksContainerComponent";
import DashboardAdsContainer from "@/components/system components/parent/dasboard components/DashboardAdsContainer";
import { useQueries } from "@tanstack/react-query";
import { getUserKids } from "@/lib/userQueryOptions";
import { getRankByLevel } from "@/lib/rankLabels";
import { getAllKidsTasksData } from "@/lib/tasksQueryOptions";
import { useUser } from "@/lib/userContext";
const DashboardClientPage = () => {
  const { user } = useUser();
  console.log("user data", user);
  const [kidsData, allKidsTasks] = useQueries({
    queries: [getUserKids(), getAllKidsTasksData()],
  });
  const kids = kidsData.data;
  const tasks = allKidsTasks.data;

  return (
    <div className="p-2 w-full">
      {/* mobile view */}

      <div>
        <div className="flex flex-col gap-2">
          <div className="md:grid-cols-5 gap-5  items-center grid">
            <div className="flex flex-col  gap-2 md:col-span-3 ">
              <InputGroup>
                <InputGroupInput placeholder="Search..." />
                <InputGroupAddon>
                  <Search />
                </InputGroupAddon>
              </InputGroup>
              <DashboardAnnoucementContainer />
            </div>

            <div className="w-full flex flex-col gap-4 md:col-span-2 rounded max-h-60 overflow-y-auto shadow-md shadow-black/10 p-4">
              {kids?.map((kid: any) => (
                <KidsDashboardProfileContainer
                  key={kid._id}
                  name={kid.firstname + " " + kid.lastname}
                  level={kid.level}
                  rank={getRankByLevel(kid.level)}
                  profileImage="/dashboard assets/boy.jpg"
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="md:grid-cols-5 gap-5  items-center grid">
        <TasksContainerComponent tasks={tasks} />
        <DashboardAdsContainer />
      </div>
    </div>
  );
};

export default DashboardClientPage;
