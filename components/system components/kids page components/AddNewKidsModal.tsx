"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HiPlusCircle } from "react-icons/hi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AddNewKidsModal = () => {
  const characteristicsOptions = [
    "Friendly",
    "Helpful",
    "Creative",
    "Active",
    "Curious",
    "Responsible",
    "Kind",
    "Shy",
  ];

  const [selectedCharacteristics, setSelectedCharacteristics] = React.useState<
    string[]
  >([]);

  const toggleCharacteristic = (value: string) => {
    setSelectedCharacteristics((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  return (
    <Dialog>
      <DialogTrigger className="w-15 h-15 md:w-18 md:h-18 flex items-center justify-center cursor-pointer hover:bg-[#f84949] bg-[#FF5B5B] text-white rounded-full shadow shadow-black/20">
        <HiPlusCircle className="md:text-5xl text-4xl" />
      </DialogTrigger>

      <DialogContent className="max-w-150">
        <DialogHeader>
          <DialogTitle>Add your kid</DialogTitle>
          <DialogDescription>
            Create an account for your kid for better learning and lifestyle
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="account" className="w-full">
          <TabsList>
            <TabsTrigger
              className="data-[state=active]:bg-[#ff5b5b] data-[state=active]:text-white"
              value="personalinfo"
            >
              Personal information
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-[#ff5b5b] data-[state=active]:text-white"
              value="otherinfo"
            >
              Other information
            </TabsTrigger>
          </TabsList>
          <TabsContent value="personalinfo">
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-1">
                  <Label>Firstname </Label>
                  <Input placeholder="Enter firstname" />
                </div>

                <div className="flex flex-col gap-1">
                  <Label>Middlename</Label>
                  <Input placeholder="Enter middlename" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-1">
                  <Label>Lastname</Label>
                  <Input placeholder="Enter lastname" />
                </div>

                <div className="flex flex-col gap-1">
                  <Label>Gender </Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-1">
                  <Label>Address </Label>
                  <Input placeholder="Enter address" />
                </div>

                <div className="flex flex-col gap-1">
                  <Label>Birthday</Label>
                  <Input type="date" />
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="otherinfo">
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-1">
                  <Label>Citizenship</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent defaultValue={"filipino"}>
                      <SelectGroup>
                        <SelectItem value="filipino">Filipino</SelectItem>
                        <SelectItem value="chinese">Chinese </SelectItem>
                        <SelectItem value="american">American </SelectItem>
                        <SelectItem value="japanese">Japanese </SelectItem>
                        <SelectItem value="korean">Korean </SelectItem>
                        <SelectItem value="french">French </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-1">
                  <Label>Pofile image </Label>
                  <Input type="file" />
                </div>
              </div>

              <div className="flex flex-col gap-1 col-span-2">
                <Label>Characteristics</Label>

                <div className="flex flex-wrap gap-2 rounded-md border p-3">
                  {characteristicsOptions.map((item) => {
                    const isSelected = selectedCharacteristics.includes(item);

                    return (
                      <button
                        type="button"
                        key={item}
                        onClick={() => toggleCharacteristic(item)}
                        className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                          isSelected
                            ? "bg-[#FF5B5B] text-white border-[#FF5B5B]"
                            : "bg-white text-black hover:bg-gray-100"
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>

                {selectedCharacteristics.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedCharacteristics.map((item) => (
                      <div
                        key={item}
                        className="rounded-full bg-[#FF5B5B]/15 text-[#FF5B5B] px-3 py-1 text-sm font-medium border border-[#FF5B5B]/30"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex items-center gap-3">
          <DialogClose asChild>
            <Button variant={"secondary"}>Close</Button>
          </DialogClose>
          <Button className="text-white bg-[#ff5b5b]"> Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewKidsModal;
