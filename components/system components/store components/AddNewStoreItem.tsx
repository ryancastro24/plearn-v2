"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { HiPlusCircle } from "react-icons/hi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageDropZone from "./ImageDropzone";
const AddNewStoreItem = () => {
  const [onSale, setOnSale] = useState(false);
  return (
    <div>
      <Dialog>
        <DialogTrigger className="w-15 h-15 md:w-18 md:h-18 flex items-center justify-center  cursor-pointer hover:bg-[#f84949]   bg-[#FF5B5B] text-white  rounded-full shadow shadow-black/20">
          <HiPlusCircle className="md:text-5xl text-4xl" />
        </DialogTrigger>
        <DialogContent className="p-3 max-w-200">
          <DialogHeader>
            <DialogTitle className="text-left">Add new item</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-5 gap-5">
            <div className="flex flex-col gap-2 w-full col-span-3">
              <div className="flex flex-col gap-1">
                <Label className="text-xs">Item Description</Label>
                <Input placeholder="Enter item description" />
              </div>

              <div className="flex justify-between items-center gap-2">
                <div className="flex flex-col gap-1 w-full">
                  <Label className="text-xs">Item name</Label>
                  <Input placeholder="Enter item name" />
                </div>

                <div className="flex items-center gap-2 w-full">
                  <div className="flex flex-col gap-1">
                    <Label className="text-xs">Points</Label>
                    <Input placeholder="Enter points" type="number" />
                  </div>

                  <div className="flex flex-col gap-1">
                    <Label className="text-xs">On Sale</Label>
                    <Switch
                      checked={onSale}
                      onCheckedChange={(value) => setOnSale(value)}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center gap-2 w-full">
                <div className="flex flex-col gap-1 w-full">
                  <Label
                    className={` text-xs ${!onSale ? "text-gray-300" : ""}`}
                  >
                    Discount in percent
                  </Label>
                  <Input
                    disabled={!onSale}
                    placeholder="Enter discount percent"
                    type="number"
                  />
                </div>

                <div className="flex flex-col gap-1 w-full">
                  <Label
                    className={`text-xs ${!onSale ? "text-gray-300" : ""}`}
                  >
                    Discount Deadline
                  </Label>
                  <Input disabled={!onSale} type="date" />
                </div>
              </div>

              <div className="flex justify-between items-center gap-2 w-full">
                <div className="flex flex-col gap-1 w-full">
                  <Label className="text-xs">Category</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-1 w-full">
                  <Label className="text-xs">Rarity</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select rarity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-between items-center gap-2 w-full">
                <div className="flex flex-col gap-1 w-full">
                  <Label className="text-xs">Power</Label>
                  <Input type="number" placeholder="Enter item power" />
                </div>

                <div className="flex flex-col gap-1 w-full">
                  <Label className="text-xs">Type</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <ImageDropZone />
          </div>

          <DialogFooter>
            <div className="flex items-center gap-4">
              <DialogClose asChild>
                <Button className="cursor-pointer" variant={"secondary"}>
                  Close
                </Button>
              </DialogClose>

              <Button className="bg-[#FF5B5B] cursor-pointer hover:bg-[#f84949]">
                Add new item
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewStoreItem;
