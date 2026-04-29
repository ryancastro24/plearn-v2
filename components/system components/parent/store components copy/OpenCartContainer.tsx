"use client";

import { useFlyToCart } from "@/components/system components/parent/store components copy/FlyToCartProvider";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import CartItemContainer from "./CartItemContainer";
import { HiMiniShoppingCart } from "react-icons/hi2";
import { useQuery } from "@tanstack/react-query";
import { getUserCartItems } from "@/lib/cartItemQueryOptions";
import { useUser } from "@/lib/userContext";
const OpenCartContainer = () => {
  const { cartRef } = useFlyToCart();

  const { user } = useUser();
  const { data: userCartItemsData } = useQuery(getUserCartItems(user?._id));

  const cartItems = userCartItemsData?.data;

  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            asChild
            size={"icon-lg"}
            className="rounded-full bg-[#FF5B5B] flex items-center justify-center text-white"
          >
            <button
              ref={cartRef as React.RefObject<HTMLButtonElement>}
              type="button"
            >
              <HiMiniShoppingCart className="text-5xl" />
            </button>
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full  h-screen ">
            <DrawerHeader>
              <DrawerTitle>Shopping Cart</DrawerTitle>
              <DrawerDescription>Your shopping cart items.</DrawerDescription>
            </DrawerHeader>

            <div className="w-full overflow-scroll h-[48vh]">
              <CartItemContainer cartItems={cartItems} />
            </div>

            <DrawerFooter>
              <Button className="w-full bg-[#FF5B5B] text-white">
                Checkout
              </Button>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default OpenCartContainer;
