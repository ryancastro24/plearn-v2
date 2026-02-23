import Image from "next/image";

import { Button } from "../../ui/button";
const DashboardAdsContainer = () => {
  return (
    <div className="md:col-span-2 border border-black/5 shadow-md shadow-black/10 rounded p-2 h-auto w-full flex items-center justify-center ">
      <div className="w-full h-auto flex flex-col gap-2">
        <div className="w-full h-64  rounded relative overflow-hidden">
          <Image
            src={"/dashboard assets/ads sample image.jpg"}
            alt="ads sample image"
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-lg">Get your own now!</h2>
          <p className="text-sm">
            Earn points , customize your character and bring them to life{" "}
          </p>
        </div>

        <Button className="w-full text-white bg-linear-to-r from-[#FF5B5B] to-[#F04886] rounded">
          Avail now
        </Button>
      </div>
    </div>
  );
};

export default DashboardAdsContainer;
