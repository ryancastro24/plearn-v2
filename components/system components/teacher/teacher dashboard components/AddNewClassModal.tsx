"use client";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const AddNewClassModal = () => {
  const [selectedWorld, setSelectedWorld] = useState("");

  const workingHoursOptions = [
    "Monday",
    "Tueday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const [selectedWorkingHours, setSelectedWorkingHours] = useState<string[]>(
    [],
  );

  const toggleWorkingHours = (value: string) => {
    setSelectedWorkingHours((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-[#FF5B5B] rounded text-white">
            Add new class
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-150">
          <DialogHeader>
            <DialogTitle className="text-sm">
              Create a new class using the unique worlds
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 mt-5">
            <div className="w-full grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <Label>Title</Label>
                <Input placeholder="Enter class title" />
              </div>

              <div className="flex flex-col gap-1">
                <Label>Subject</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="math">Math</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="history">History </SelectItem>
                      <SelectItem value="science">Science </SelectItem>
                      <SelectItem value="filipino">Filipino </SelectItem>
                      <SelectItem value="values_education">
                        Values Education
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex flex-col gap-1 col-span-2">
                <Label>Working houres</Label>

                <div className="flex flex-wrap gap-2 rounded-md border p-3">
                  {workingHoursOptions.map((item) => {
                    const isSelected = selectedWorkingHours.includes(item);

                    return (
                      <button
                        type="button"
                        key={item}
                        onClick={() => toggleWorkingHours(item)}
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

                {selectedWorkingHours.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedWorkingHours.map((item) => (
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

            <div className="w-full grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <Label>Start time</Label>
                <Input type="time" />
              </div>

              <div className="flex flex-col gap-1">
                <Label>End time</Label>
                <Input type="time" />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Label>Available worlds</Label>
              <div className="flex gap-3">
                <div
                  onClick={() => setSelectedWorld("lava world")}
                  className={`w-15 h-15 relative overflow-hidden rounded ${selectedWorld == "lava world" ? "border-2 shadow shadow-black/30 border-[#ff5b5b] scale-125" : ""}`}
                >
                  <Image
                    src={"/learninghub page assets/world1.png"}
                    alt="sample world"
                    fill
                    className="object-cover"
                  />
                </div>
                <div
                  onClick={() => setSelectedWorld("water world")}
                  className={`w-15 h-15 relative overflow-hidden rounded ${selectedWorld == "water world" ? "border-2 shadow shadow-black/30 border-[#ff5b5b] scale-125" : ""}`}
                >
                  <Image
                    src={"/learninghub page assets/world2.png"}
                    alt="sample world"
                    fill
                    className="object-cover"
                  />
                </div>
                <div
                  onClick={() => setSelectedWorld("space world")}
                  className={`w-15 h-15 relative overflow-hidden rounded ${selectedWorld == "space world" ? "border-2 shadow shadow-black/30 border-[#ff5b5b] scale-125" : ""}`}
                >
                  <Image
                    src={"/learninghub page assets/world3.png"}
                    alt="sample world"
                    fill
                    className="object-cover"
                  />
                </div>
                <div
                  onClick={() => setSelectedWorld("city world")}
                  className={`w-15 h-15 relative overflow-hidden rounded ${selectedWorld == "city world" ? "border-2 shadow shadow-black/30 border-[#ff5b5b] scale-125" : ""}`}
                >
                  <Image
                    src={"/learninghub page assets/world4.png"}
                    alt="sample world"
                    fill
                    className="object-cover"
                  />
                </div>
                <div
                  onClick={() => setSelectedWorld("desert world")}
                  className={`w-15 h-15 relative overflow-hidden rounded ${selectedWorld == "desert world" ? "border-2 shadow shadow-black/30 border-[#ff5b5b] scale-125" : ""}`}
                >
                  <Image
                    src={"/learninghub page assets/world5.png"}
                    alt="sample world"
                    fill
                    className="object-cover"
                  />
                </div>
                <div
                  onClick={() => setSelectedWorld("ice world")}
                  className={`w-15 h-15 relative overflow-hidden rounded ${selectedWorld == "ice world" ? "border-2 shadow shadow-black/30 border-[#ff5b5b] scale-125" : ""}`}
                >
                  <Image
                    src={"/learninghub page assets/world6.png"}
                    alt="sample world"
                    fill
                    className="object-cover"
                  />
                </div>
                <div
                  onClick={() => setSelectedWorld("forest world")}
                  className={`w-15 h-15 relative overflow-hidden rounded ${selectedWorld == "forest world" ? "border-2 shadow shadow-black/30 border-[#ff5b5b] scale-125" : ""}`}
                >
                  <Image
                    src={"/learninghub page assets/world7.png"}
                    alt="sample world"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div>
                <h3>{selectedWorld}</h3>
              </div>
            </div>
          </div>

          <DialogFooter className="flex items-center gap-5 mt-5">
            <DialogClose asChild>
              <Button variant={"secondary"}>Close</Button>
            </DialogClose>
            <Button className="bg-[#ff5b5b] text-white">Create world</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewClassModal;
