import React from "react";
import { MdOutlineToys } from "react-icons/md";
const MerchandiseSold = ({ merchandiseSold }: { merchandiseSold: number }) => {
  return (
    <div className="flex bg-[#FF5B5B]  text-white flex-col md:flex-row items-center gap-2 md:gap-4 p-3 px-5 rounded shadow shadow-black/30 border border-black/20">
      <MdOutlineToys className="text-4xl md:text-6xl" />

      <div className="flex flex-col gap-2 md:gap-0 items-center md:items-start">
        <h3 className="text-center text-[12px] md:text-sm">Merchandise Sold</h3>
        <h2 className="font-bold text-2xl">{merchandiseSold}</h2>
      </div>
    </div>
  );
};
export default MerchandiseSold;
