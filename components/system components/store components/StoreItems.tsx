"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HiMiniShoppingCart } from "react-icons/hi2";
import DeleteItemInStoreModal from "./DeleteItemInStoreModal";
import EditItemInStoreModal from "./EditItemInStoreModal";
import React, { useRef } from "react";
import { useFlyToCart } from "@/components/system components/store components/FlyToCartProvider";

const userType: "admin" | "user" = "admin";

const StoreItems = ({ item }: any) => {
  const realBtnRef = useRef<HTMLButtonElement | null>(null);
  const { flyFromElement } = useFlyToCart();

  return (
    <div className="group relative w-40 h-54 rounded p-2 shadow shadow-black/10 border border-black/10 flex flex-col justify-between overflow-hidden bg-white">
      {/* Admin hover overlay */}
      {userType === "admin" && (
        <div className="absolute inset-0 z-20 flex items-center justify-center gap-3 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <DeleteItemInStoreModal />
          <EditItemInStoreModal />
        </div>
      )}

      <div className="w-full h-28 rounded flex items-center justify-center bg-gray-300">
        <Image
          src={item.itemImage || "/placeholder.png"}
          alt={item.itemName}
          width={100}
          height={100}
          className="object-contain"
        />
      </div>

      <div className="mt-2 flex flex-col grow">
        <div className="flex flex-col mb-2">
          <h2 className="text-xs font-bold line-clamp-1">{item.itemName}</h2>
          <p className="text-[8px] text-justify line-clamp-2">
            {item.itemDescription}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto mb-0.5">
          <h2 className="text-sm font-semibold">{item.itemPoints} Pts</h2>

          <Button asChild size="icon-xs" className="bg-[#FF5B5B]">
            <button
              ref={realBtnRef}
              onClick={() => {
                if (realBtnRef.current) {
                  flyFromElement(realBtnRef.current, item.itemImage);
                }
              }}
            >
              <HiMiniShoppingCart />
            </button>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StoreItems;
