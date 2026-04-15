"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HiMiniShoppingCart } from "react-icons/hi2";
import DeleteItemInStoreModal from "./DeleteItemInStoreModal";
import EditItemInStoreModal from "./EditItemInStoreModal";
import { useRef } from "react";
import { useFlyToCart } from "@/components/system components/store components/FlyToCartProvider";
import { useUser } from "@/lib/userContext";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewCartItem } from "@/backend/cartItem";
import { toast } from "react-toastify";
const StoreItems = ({ item }: any) => {
  const { user } = useUser();
  const realBtnRef = useRef<HTMLButtonElement | null>(null);
  const { flyFromElement } = useFlyToCart();
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File | null>(null);
  const [selectedItem, setSelectedItem] = useState({
    description: item.description,
    name: item.name,
    points: item.points,
    discount: item.discount,
    discountDeadline: item.discountDeadline,
    category: item.category,
    rarity: item.rarity,
    power: item.power,
    itemType: item.itemType,
    onSale: item.onSale,
  });

  const { mutate: addNewCartItemMutate } = useMutation({
    mutationFn: addNewCartItem,
    onSuccess() {
      toast.success("Successfully added to cart");
      queryClient.invalidateQueries({ queryKey: ["usercartitems"] });
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const handleAddToCartItem = (e: any) => {
    e.preventDefault();
    addNewCartItemMutate({
      itemId: item._id,
      userId: user._id,
    });
  };

  return (
    <div className="group relative w-40 h-54 rounded p-2 shadow shadow-black/10 border border-black/10 flex flex-col justify-between overflow-hidden bg-white">
      {/* Admin hover overlay */}
      {user?.userType === "admin" && (
        <div className="absolute inset-0 z-10 flex items-center justify-center gap-3 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <DeleteItemInStoreModal item={item} />
          <EditItemInStoreModal
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
            file={file}
            setFile={setFile}
            itemId={item._id}
          />
        </div>
      )}

      <div className="w-full h-28 rounded flex items-center justify-center bg-gray-100">
        <Image
          src={item.image || "/placeholder.png"}
          alt={item.name}
          width={100}
          height={100}
          className="object-contain"
        />
      </div>

      <div className="mt-2 flex flex-col grow">
        <div className="flex flex-col mb-2">
          <h2 className="text-xs font-bold line-clamp-1">{item.name}</h2>
          <p className="text-[8px] text-justify line-clamp-2">
            {item.description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto mb-0.5">
          <h2 className="text-sm font-semibold">
            {item.points.toLocaleString()} Pts
          </h2>

          <Button asChild size="icon-xs" className="bg-[#FF5B5B]">
            <button
              ref={realBtnRef}
              onClick={(e: any) => {
                if (realBtnRef.current) {
                  flyFromElement(realBtnRef.current, item.image);
                  handleAddToCartItem(e);
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
