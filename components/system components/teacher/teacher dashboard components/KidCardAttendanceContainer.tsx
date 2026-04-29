import Image from "next/image";
import { Button } from "@/components/ui/button";
type KidCardAttendanceContainerProps = {
  image: string;
  name: string;
  gradeLevel: number;
  attendanceStreakCount: number;
};
const KidCardAttendanceContainer = ({
  image,
  name,
  attendanceStreakCount,
  gradeLevel,
}: KidCardAttendanceContainerProps) => {
  return (
    <div className="flex flex-col gap-3 rounded border border-black/10 shadow shadow-black/30 p-2">
      <div className="flex items-center gap-2">
        <Image
          src={image}
          alt="kid image"
          width={50}
          height={50}
          className="rounded-full"
        />

        <div className="flex flex-col">
          <h2 className="text-sm font-bold">{name}</h2>
          <h3 className="text-[10px]">Grade {gradeLevel}</h3>
          <h3 className="text-[10px]">
            Attendance {attendanceStreakCount}/{attendanceStreakCount}
          </h3>
        </div>
      </div>

      <div className="w-full  grid grid-cols-2 gap-2 justify-between ">
        <Button size={"sm"} className="bg-[#E03800] text-xs   text-white">
          Absent
        </Button>
        <Button size={"sm"} className="bg-[#00E059] text-xs  text-white">
          Present
        </Button>
      </div>
    </div>
  );
};

export default KidCardAttendanceContainer;
