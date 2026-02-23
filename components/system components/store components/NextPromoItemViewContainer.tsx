import { Button } from "@base-ui/react";
import { HiMiniShoppingCart } from "react-icons/hi2";
import Image from "next/image";
const NextPromoItemViewContainer = ({
  items,
  current,
  timeLeftNextpage,
}: any) => {
  return (
    <div
      className={`h-full rounded-lg shadow hidden md:block shadow-black/10 border border-black/10  p-2`}
      style={{ width: "40%" }}
    >
      {/* next preview content */}
      <div
        className={`flex flex-col gap-4 p-2 w-full h-50 rounded ${items[current + 1].backgroundColor}`}
      >
        <div className="grid grid-cols-7">
          <div className="col-span-4 pr-5">
            <div className="flex flex-col gap-2">
              <h2 className="text-white text-[10px] ">
                {items[current + 1].tagline}
              </h2>

              {/* Countdown */}
              <div className="flex items-center gap-5">
                <div className="flex flex-col items-center">
                  <div className="w-7 h-7 rounded flex items-center justify-center bg-white">
                    <span className=" font-bold">{timeLeftNextpage.days}</span>
                  </div>
                  <span className="text-[10px] text-white">days</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded flex items-center justify-center bg-white">
                      <span className=" font-bold">
                        {timeLeftNextpage.hours}
                      </span>
                    </div>
                    <span className="text-[10px] text-white">hours</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded flex items-center justify-center bg-white">
                      <span className=" font-bold">
                        {timeLeftNextpage.minutes}
                      </span>
                    </div>
                    <span className="text-[10px] text-white">min</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded flex items-center justify-center bg-white">
                      <span className=" font-bold">
                        {timeLeftNextpage.seconds}
                      </span>
                    </div>
                    <span className="text-[10px] text-white">sec</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-white text-[10px]">
                  {items[current + 1].promoTagline}
                </span>

                <span className="text-white text-sm font-bold">
                  For only {items[current + 1].itemPoints} points!
                </span>
                <span className="text-white text-[10px]">
                  <strong>{items[current + 1].itemName}</strong> -{" "}
                  {items[current + 1].itemDescription}
                </span>
              </div>

              <Button
                className={
                  "flex items-center py-1 justify-center cursor-pointer bg-white rounded gap-2 w-20 text-[10px]"
                }
              >
                <span>Buy now </span>
                <HiMiniShoppingCart className="text-[#FF5B5B]" />
              </Button>
            </div>
          </div>

          <div className="col-span-3 flex items-center justify-center h-full ">
            <div className="w-35 h-35 rounded-full bg-red-500/20 flex items-center justify-center">
              <Image
                src={items[current + 1].itemImage}
                alt="Item Image"
                width={180}
                height={180}
              />
            </div>
          </div>
        </div>
      </div>

      <h2 className="absolute bottom-4  italic right-6 text-black text-xs">
        Hover right for more
      </h2>
    </div>
  );
};

export default NextPromoItemViewContainer;
