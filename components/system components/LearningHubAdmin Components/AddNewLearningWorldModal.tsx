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
const AddNewLearningWorldModal = () => {
  const [selectedWorld, setSelectedWorld] = useState("");

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-[#FF5B5B] rounded text-white">
            Add new world
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-150">
          <DialogHeader>
            <DialogTitle className="text-sm">
              Create a new wonderful world
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 mt-5">
            <div className="w-full grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <Label>Title</Label>
                <Input placeholder="Enter world title" />
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
              <Label>Description</Label>
              <Textarea placeholder="Enter description" />
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

export default AddNewLearningWorldModal;
