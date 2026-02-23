"use client";

import MainPromoItemViewContainer from "./MainPromoItemViewContainer";
import NextPromoItemViewContainer from "./NextPromoItemViewContainer";
import { useState, useEffect } from "react";
import { SlArrowLeftCircle, SlArrowRightCircle } from "react-icons/sl";
import Image from "next/image";
// Items with corrected key: deadlineDate
const items = [
  {
    id: 1,
    tagline: "Purchase this item to get 100 points!",
    itemImage: "/store page assets/store image 1.png",
    backgroundColor: "bg-linear-to-r from-[#685AFF] to-[#008CFF]",
    itemName: "Emerald Dragonheart Armor",
    itemPoints: 1000,
    itemDescription:
      "Forged from ancient dragon scales, glowing with untamed power",
    promoTagline: "Limited time offer only",
    deadlineDate: "2026-02-28",
  },
  {
    id: 2,
    tagline: "Purchase yours now!",
    itemImage: "/store page assets/store image 2.png",
    backgroundColor: "bg-linear-to-r from-[#FF5B5B] to-[#F04886]",
    itemName: "Item 2",
    itemPoints: 1000,
    itemDescription: "Description for Item 2",
    promoTagline: "Promo for Item 2",
    deadlineDate: "2026-03-15",
  },
  {
    id: 3,
    tagline: "Sales ends soon!",
    itemImage: "/store page assets/store image 3.png",
    backgroundColor: "bg-linear-to-r from-[#685AFF] to-[#008CFF]",
    itemName: "Item 3",
    itemPoints: 1500,
    itemDescription: "Description for Item 3",
    promoTagline: "Promo for Item 3",
    deadlineDate: "2026-04-10",
  },
];

// Helper function to calculate time left
const getTimeLeft = (dateString: string | undefined) => {
  if (!dateString) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const now = new Date().getTime();
  const target = new Date(dateString).getTime();
  const diff = target - now;

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
};

const SliderItemsContainer = () => {
  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(items[0].deadlineDate));
  const [timeLeftNextpage, setTimeLeftNextpage] = useState(
    getTimeLeft(items[1]?.deadlineDate),
  );

  // Countdown for main slide
  useEffect(() => {
    const updateCountdown = () =>
      setTimeLeft(getTimeLeft(items[current]?.deadlineDate));
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [current]);

  // Countdown for next slide (if exists)
  useEffect(() => {
    if (current + 1 >= items.length) return; // Safely exit if no next item
    const updateCountdownNext = () =>
      setTimeLeftNextpage(getTimeLeft(items[current + 1]?.deadlineDate));
    updateCountdownNext();
    const interval = setInterval(updateCountdownNext, 1000);
    return () => clearInterval(interval);
  }, [current]);

  const nextSlide = () => {
    if (current < items.length - 1) setCurrent(current + 1);
  };

  const prevSlide = () => {
    if (current > 0) setCurrent(current - 1);
  };

  return (
    <div className="w-full relative flex items-center justify-center">
      <div className="flex gap-2 h-64 w-full">
        {/* Main View */}
        <MainPromoItemViewContainer
          items={items}
          current={current}
          timeLeft={timeLeft}
        />

        {/* Next Preview (only if exists) */}
        {current + 1 < items.length ? (
          <NextPromoItemViewContainer
            items={items}
            current={current}
            timeLeftNextpage={timeLeftNextpage}
          />
        ) : (
          <div
            className={`h-full hidden  rounded-lg shadow shadow-black/10 border border-black/10 md:flex items-center justify-center  p-2`}
            style={{ width: "40%" }}
          >
            <Image
              src="/store page assets/sorry_image.png"
              alt="Empty Store Image"
              width={180}
              height={180}
            />
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex justify-between absolute w-full h-full">
        <button
          onClick={prevSlide}
          disabled={current === 0}
          className="bg-black/20 text-3xl duration-300 ease-out opacity-50 md:opacity-0 hover:opacity-100  text-white p-2  h-full disabled:opacity-0 rounded-tl cursor-pointer rounded-bl"
        >
          <SlArrowLeftCircle />
        </button>

        <button
          onClick={nextSlide}
          disabled={current === items.length - 1}
          className="bg-black/20 duration-300 ease-out text-3xl text-white p-2 z-50 opacity-50 md:opacity-0 hover:opacity-100 h-full rounded-tr rounded-br cursor-pointer disabled:opacity-0"
        >
          <SlArrowRightCircle />
        </button>
      </div>
    </div>
  );
};

export default SliderItemsContainer;
