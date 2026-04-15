"use client";

import MainPromoItemViewContainer from "./MainPromoItemViewContainer";
import NextPromoItemViewContainer from "./NextPromoItemViewContainer";
import { useState, useEffect, useMemo } from "react";
import { SlArrowLeftCircle, SlArrowRightCircle } from "react-icons/sl";
import Image from "next/image";

// ⏱ Helper function
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

const SliderItemsContainer = ({ onSaleItems }: any) => {
  const [current, setCurrent] = useState(0);

  // 🎨 Background styles
  const bgColors = [
    "bg-linear-to-r from-[#685AFF] to-[#008CFF]",
    "bg-linear-to-r from-[#FF5B5B] to-[#F04886]",
  ];

  // ✅ Enhance items with background
  const enhancedItems = useMemo(() => {
    if (!onSaleItems || onSaleItems.length === 0) return [];

    return onSaleItems.map((item: any, index: number) => ({
      ...item,
      backgroundColor: bgColors[index % bgColors.length],
    }));
  }, [onSaleItems]);

  // ⏱ State (safe default)
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [timeLeftNextpage, setTimeLeftNextpage] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // 🔥 Single optimized effect
  useEffect(() => {
    if (enhancedItems.length === 0) return;

    const updateCountdowns = () => {
      setTimeLeft(getTimeLeft(enhancedItems[current]?.discountDeadline));

      setTimeLeftNextpage(
        getTimeLeft(enhancedItems[current + 1]?.discountDeadline),
      );
    };

    updateCountdowns();

    const interval = setInterval(updateCountdowns, 1000);

    return () => clearInterval(interval);
  }, [current, enhancedItems.length]);

  // 👉 Navigation
  const nextSlide = () => {
    if (current < enhancedItems.length - 1) {
      setCurrent((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (current > 0) {
      setCurrent((prev) => prev - 1);
    }
  };

  // ❗ Empty state
  if (!enhancedItems || enhancedItems.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <p>No items on sale</p>
      </div>
    );
  }

  return (
    <div className="w-full relative flex items-center justify-center">
      <div className="flex gap-2 h-64 w-full">
        {/* Main View */}
        <MainPromoItemViewContainer
          items={enhancedItems}
          current={current}
          timeLeft={timeLeft}
        />

        {/* Next Preview */}
        {current + 1 < enhancedItems.length ? (
          <NextPromoItemViewContainer
            items={enhancedItems}
            current={current}
            timeLeftNextpage={timeLeftNextpage}
          />
        ) : (
          <div
            className="h-full hidden rounded-lg shadow shadow-black/10 border border-black/10 md:flex items-center justify-center p-2"
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
          className="bg-black/20 text-3xl duration-300 ease-out opacity-50 md:opacity-0 hover:opacity-100 text-white p-2 h-full disabled:opacity-0 rounded-tl cursor-pointer rounded-bl"
        >
          <SlArrowLeftCircle />
        </button>

        <button
          onClick={nextSlide}
          disabled={current === enhancedItems.length - 1}
          className="bg-black/20 duration-300 ease-out text-3xl text-white p-2 z-50 opacity-50 md:opacity-0 hover:opacity-100 h-full rounded-tr rounded-br cursor-pointer disabled:opacity-0"
        >
          <SlArrowRightCircle />
        </button>
      </div>
    </div>
  );
};

export default SliderItemsContainer;
