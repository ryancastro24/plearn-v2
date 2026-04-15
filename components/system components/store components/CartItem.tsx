import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BsPeopleFill } from "react-icons/bs";
import { BsCartCheckFill } from "react-icons/bs";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { TbTrashFilled } from "react-icons/tb";
const CartItem = ({ item }: any) => {
  return (
    <div className="w-full p-2 shadow-md shadow-black/10 rounded-md border border-black/10 flex items-center gap-4">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <Image
            src={item?.itemId?.image}
            alt="store item image"
            width={80}
            height={80}
          />

          <div>
            <h3 className="font-bold ">{item?.itemId?.name}</h3>
            <p className="text-xs">Points: {item?.itemId?.points}pts</p>
          </div>
        </div>

        <div className="flex items-center flex-col gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size={"icon"} className="bg-[#685AFF] text-white">
                <BsPeopleFill />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <div className="flex flex-col gap-2 p-2">
                <div className="flex items-center gap-2 p-2 shadow shadow-black/10 rounded-md border border-black/10">
                  <div className="rounded-full w-14 h-14 relative overflow-hidden">
                    <Image
                      src={"/dashboard assets/boy.jpg"}
                      alt="profile image"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-col gap justify-center">
                    <h2>{"Mark Twain"}</h2>
                    <span className="text-xs">
                      <strong>Level 24- </strong>
                      Apprentice
                    </span>

                    <div className="flex items-center gap-2">
                      {/* clan logo container */}
                      <div className="w-4 h-4 rounded bg-slate-500"></div>

                      <span className="text-xs">1st division captain</span>
                    </div>
                  </div>
                </div>

                {/* girl */}

                <div className="flex items-center gap-2 p-2 shadow shadow-black/10 rounded-md border border-black/10">
                  <div className="rounded-full w-14 h-14 relative overflow-hidden">
                    <Image
                      src={"/dashboard assets/girl.avif"}
                      alt="profile image"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-col gap justify-center">
                    <h2>{"Liza Twain"}</h2>
                    <span className="text-xs">
                      <strong>Level 14- </strong>
                      Novice
                    </span>

                    <div className="flex items-center gap-2">
                      {/* clan logo container */}
                      <div className="w-4 h-4 rounded bg-slate-500"></div>

                      <span className="text-xs">1st division captain</span>
                    </div>
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size={"icon"} className="bg-red-500 text-white">
            <TbTrashFilled />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
