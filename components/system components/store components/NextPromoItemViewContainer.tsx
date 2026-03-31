"use client";

import { Button } from "@base-ui/react";
import { HiMiniShoppingCart } from "react-icons/hi2";
import Image from "next/image";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type Item = {
  backgroundColor: string;
  tagline: string;
  promoTagline: string;
  itemPoints: number;
  itemName: string;
  itemDescription: string;
  itemImage: string;
};

type Props = {
  items: Item[];
  current: number;
  timeLeftNextpage: TimeLeft;
};

const NextPromoItemViewContainer = ({
  items,
  current,
  timeLeftNextpage,
}: Props) => {
  const nextItem = items[current + 1];

  if (!nextItem) return null;

  return (
    <div
      className="relative hidden h-full rounded-lg border border-black/10 p-2 shadow shadow-black/10 md:block"
      style={{ width: "40%" }}
    >
      <div
        className={`flex h-50 w-full flex-col gap-4 rounded p-2 ${nextItem.backgroundColor}`}
      >
        <div className="grid grid-cols-7">
          <div className="col-span-4 pr-5">
            <div className="flex flex-col gap-2">
              <h2 className="text-[10px] text-white">{nextItem.tagline}</h2>

              <div className="flex items-center gap-5">
                <div className="flex flex-col items-center">
                  <div className="flex h-7 w-7 items-center justify-center rounded bg-white">
                    <span className="font-bold">{timeLeftNextpage.days}</span>
                  </div>
                  <span className="text-[10px] text-white">days</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex flex-col items-center">
                    <div className="flex h-7 w-7 items-center justify-center rounded bg-white">
                      <span className="font-bold">
                        {timeLeftNextpage.hours}
                      </span>
                    </div>
                    <span className="text-[10px] text-white">hours</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="flex h-7 w-7 items-center justify-center rounded bg-white">
                      <span className="font-bold">
                        {timeLeftNextpage.minutes}
                      </span>
                    </div>
                    <span className="text-[10px] text-white">min</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="flex h-7 w-7 items-center justify-center rounded bg-white">
                      <span className="font-bold">
                        {timeLeftNextpage.seconds}
                      </span>
                    </div>
                    <span className="text-[10px] text-white">sec</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-white">
                  {nextItem.promoTagline}
                </span>

                <span className="text-sm font-bold text-white">
                  For only {nextItem.itemPoints} points!
                </span>

                <span className="text-[10px] text-white">
                  <strong>{nextItem.itemName}</strong> -{" "}
                  {nextItem.itemDescription}
                </span>
              </div>

              <Button className="flex w-20 cursor-pointer items-center justify-center gap-2 rounded bg-white py-1 text-[10px]">
                <span>Buy now</span>
                <HiMiniShoppingCart className="text-[#FF5B5B]" />
              </Button>
            </div>
          </div>

          <div className="col-span-3 flex h-full items-center justify-center">
            <div className="flex h-35 w-35 items-center justify-center rounded-full bg-red-500/20">
              <Image
                src={nextItem.itemImage}
                alt={nextItem.itemName}
                width={180}
                height={180}
              />
            </div>
          </div>
        </div>
      </div>

      <h2 className="absolute bottom-4 right-6 text-xs italic text-black">
        Hover right for more
      </h2>
    </div>
  );
};

export default NextPromoItemViewContainer;
