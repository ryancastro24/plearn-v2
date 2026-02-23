import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";

import DashboardAnnoucementContainer from "@/components/system components/dasboard components/DashboardAnnoucementContainer";
import KidsDashboardProfileContainer from "@/components/system components/dasboard components/KidDashboardProfileContainer";
import TasksContainerComponent from "@/components/system components/dasboard components/TasksContainerComponent";
import DashboardAdsContainer from "@/components/system components/dasboard components/DashboardAdsContainer";
const DashboardPage = () => {
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

            <div className="w-full flex flex-col gap-4 md:col-span-2 rounded h-auto shadow-md shadow-black/10 p-4">
              {/* kid profile container */}

              <KidsDashboardProfileContainer
                name="Mark Twain"
                level={24}
                rank="Apprentice"
                profileImage="/dashboard assets/boy.jpg"
              />
              <KidsDashboardProfileContainer
                name="Liza Twain"
                level={14}
                rank="Novice"
                profileImage="/dashboard assets/girl.avif"
              />

              {/* kid profile container ends here*/}
            </div>
          </div>
        </div>
      </div>

      <div className="md:grid-cols-5 gap-5  items-center grid">
        <TasksContainerComponent />
        <DashboardAdsContainer />
      </div>
    </div>
  );
};

export default DashboardPage;
