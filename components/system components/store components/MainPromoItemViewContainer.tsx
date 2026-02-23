import { Button } from "@base-ui/react";
import { HiMiniShoppingCart } from "react-icons/hi2";
import Image from "next/image";
const MainPromoItemViewContainer = ({ items, current, timeLeft }: any) => {
  return (
    <div
      className={`h-full rounded-lg w-full md:w-[60%] ${items[current].backgroundColor} p-4`}
    >
      <div className="grid grid-cols-7">
        <div className="col-span-4 pr-5">
          <div className="flex flex-col gap-2 md:gap-4">
            <h2 className="text-white text-[10px] md:text-sm">
              {items[current].tagline}
            </h2>

            {/* Countdown */}
            <div className="flex items-center gap-5">
              <div className="flex flex-col items-center">
                <div className="w-5 h-5 md:w-8 md:h-8 rounded flex items-center justify-center bg-white">
                  <span className="text-sm md:text-xl font-bold">
                    {timeLeft.days}
                  </span>
                </div>
                <span className="text-[10px] md:text-xs  text-white">days</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex flex-col items-center">
                  <div className="w-5 h-5 md:w-8 md:h-8  rounded flex items-center justify-center bg-white">
                    <span className="text-sm md:text-xl  font-bold">
                      {timeLeft.hours}
                    </span>
                  </div>
                  <span className="text-[10px] md:text-xs text-white">
                    hours
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-5 h-5 md:w-8 md:h-8 rounded flex items-center justify-center bg-white">
                    <span className="text-sm md:text-xl font-bold">
                      {timeLeft.minutes}
                    </span>
                  </div>
                  <span className="text-[10px] md:text-xs text-white">min</span>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-5 h-5 md:w-8 md:h-8  rounded flex items-center justify-center bg-white">
                    <span className="text-sm md:text-xl font-bold">
                      {timeLeft.seconds}
                    </span>
                  </div>
                  <span className="text-[10px] md:text-xs text-white">sec</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-white text-[10px] md:text-xs">
                {items[current].promoTagline}
              </span>

              <span className="text-white font-bold text-xs md:text-md">
                For only {items[current].itemPoints} points!
              </span>
              <span className="text-white text-[7px] md:text-[10px]">
                <strong>{items[current].itemName}</strong> -{" "}
                {items[current].itemDescription}
              </span>
            </div>

            <Button
              className={
                "flex items-center py-2 justify-center cursor-pointer bg-white rounded gap-2 w-38 text-xs"
              }
            >
              <span>Buy now </span>
              <HiMiniShoppingCart className="text-[#FF5B5B]" />
            </Button>
          </div>
        </div>

        <div className="col-span-3 flex items-center justify-center h-full">
          <div className="w-34 h-34   [@media(min-width:400px)]:w-54  [@media(min-width:400px)]:h-54 rounded-full bg-red-500/10 flex items-center justify-center">
            <Image
              src={items[current].itemImage}
              alt="Item Image"
              width={100}
              height={100}
              sizes="(max-width: 400px) 100px, 210px"
              className="absolute z-10 
                   w-40 h-auto 
                   [@media(min-width:400px)]:w-46"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPromoItemViewContainer;
