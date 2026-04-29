import React from "react";
import { BsPerson } from "react-icons/bs";
const RegisteredKids = ({
  registeredKidsCount,
}: {
  registeredKidsCount: number;
}) => {
  return (
    <div className="flex bg-[#FF5B5B]  text-white flex-col md:flex-row items-center gap-2 md:gap-4 p-3 px-5 rounded shadow shadow-black/30 border border-black/20">
      <BsPerson className="text-4xl md:text-6xl" />

      <div className="flex flex-col gap-2 md:gap-0 items-center md:items-start">
        <h3 className="text-[12px] md:text-sm">Registered Kids</h3>
        <h2 className="font-bold text-2xl">{registeredKidsCount}</h2>
      </div>
    </div>
  );
};

export default RegisteredKids;
