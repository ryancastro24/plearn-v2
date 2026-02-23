import Image from "next/image";
import { CircularProgress } from "./CircularProgressDashboard";
const KidDashboardProfileContainer = ({
  name,
  level,
  rank,
  profileImage,
}: {
  name: string;
  level: number;
  rank: string;
  profileImage: string;
}) => {
  return (
    <div className="w-full flex items-center  justify-between rounded h-24 shadow-md shadow-black/10 p-2 border border-black/5">
      <div className="flex items-center gap-2">
        <div className="h-20 w-20 rounded-full bg-slate-500  relative overflow-hidden">
          <Image
            src={profileImage}
            alt="profile image"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex justify-center h-full flex-col">
          <h2 className="text-xs">{name}</h2>
          <span className="text-[10px]">
            <strong>Level {level}</strong> - {rank}
          </span>

          <div className="flex items-center gap-2 mt-2">
            <div className="w-5 h-5 rounded bg-gray-400"></div>
            <div className="w-5 h-5 rounded bg-gray-400"></div>
            <div className="w-5 h-5 rounded bg-gray-400"></div>
            <div className="w-5 h-5 rounded bg-gray-400"></div>
          </div>
        </div>
      </div>

      <CircularProgress
        value={60}
        size={100}
        strokeWidth={10}
        color="#FF5B5B"
        bgColor="#F3F4F6"
        className="text-gray-800"
      />
    </div>
  );
};

export default KidDashboardProfileContainer;
