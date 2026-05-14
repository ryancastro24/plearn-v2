import AddNewSectionTopicModal from "./AddNewSectionTopicModal";
import { useQuery } from "@tanstack/react-query";
import { getSectionActivitiesQuery } from "@/lib/sectionActivitiesQueryOptions";
import { TbEdit } from "react-icons/tb";
import { MdOutlineCoPresent } from "react-icons/md";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
const ActivitiesComponent = ({ sectionId }: any) => {
  const { data: activitiesData } = useQuery(
    getSectionActivitiesQuery(sectionId),
  );

  const activities = activitiesData?.data || [];
  console.log("activities", activities);
  return (
    <div className="w-full">
      <h2>Activities</h2>

      {activities.length === 0 ? (
        <h2 className="text-sm mt-4">No Activities available</h2>
      ) : (
        <div className="flex flex-col gap-2 mt-4">
          {activities?.map((act: any) => (
            <DropdownMenu key={act._id}>
              <DropdownMenuTrigger asChild>
                <div className="shadow shadow-black.15 border border-black.10 flex flex-col gap-1 bg-gray-300 p-2 rounded">
                  <h2>{act.title}</h2>
                  <span className="text-xs">{act.description}</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>{act.title}</DropdownMenuLabel>
                  <Link
                    href={`/dashboard/teacher/classes/${sectionId}/activity/${act._id}`}
                  >
                    <DropdownMenuItem>
                      <TbEdit /> Edit activity
                    </DropdownMenuItem>
                  </Link>

                  <DropdownMenuSeparator />
                  <Link
                    href={`/dashboard/teacher/classes/${sectionId}/presentation/${act._id}`}
                  >
                    <DropdownMenuItem>
                      <MdOutlineCoPresent /> Present activity
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </div>
      )}

      <AddNewSectionTopicModal sectionId={sectionId} />
    </div>
  );
};

export default ActivitiesComponent;
