import React from "react";
import { LuGamepad2 } from "react-icons/lu";
const InGameSoldSkins = ({
  inGameSkinSoldCount,
}: {
  inGameSkinSoldCount: number;
}) => {
  return (
    <div className="flex bg-[#FF5B5B]  text-white items-center md:flex-row flex-col gap-2 md:gap-4 p-3 px-5 rounded shadow shadow-black/30 border border-black/20">
      <LuGamepad2 className="text-4xl md:text-6xl" />

      <div className="flex flex-col gap-2 md:gap-0 items-center md:items-start">
        <h3 className="text-center text-[12px] md:text-sm">
          In-game skins sold
        </h3>
        <h2 className="font-bold text-2xl">{inGameSkinSoldCount}</h2>
      </div>
    </div>
  );
};

export default InGameSoldSkins;
