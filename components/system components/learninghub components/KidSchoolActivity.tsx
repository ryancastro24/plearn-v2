import { Button } from "@/components/ui/button";
type KidSchoolActivityProps = {
  title: string;
  points: number;
  status: "completed" | "in-progress" | "pending";
};

import { RiInformation2Fill } from "react-icons/ri";
const KidSchoolActivity = ({
  title,
  points,
  status,
}: KidSchoolActivityProps) => {
  return (
    <div className="flex items-center justify-between p-2 border-b border-b-black/10">
      <div className="flex flex-col">
        <h2 className="text-sm font-semibold">{title}</h2>
        <p className="text-xs">Points: {points}</p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          disabled={status === "completed" || status === "in-progress"}
          className={`text-xs ${
            status === "completed"
              ? "bg-green-500 text-white"
              : status === "in-progress"
                ? "bg-yellow-500 text-white"
                : "bg-gray-200 text-black"
          }`}
        >
          {status === "completed"
            ? "Completed"
            : status === "in-progress"
              ? "In Progress"
              : "Assign"}
        </Button>

        <Button size={"icon"} variant={"secondary"}>
          <RiInformation2Fill />
        </Button>
      </div>
    </div>
  );
};

export default KidSchoolActivity;
