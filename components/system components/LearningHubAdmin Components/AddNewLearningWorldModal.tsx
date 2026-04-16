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
import { worlds } from "@/lib/worldsArray";
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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addNewWorld } from "@/backend/learningworlds";

const AddNewLearningWorldModal = () => {
  const [selectedWorld, setSelectedWorld] = useState("");
  const queryClient = useQueryClient();
  const [newWorld, setNewWorld] = useState({
    title: "",
    subject: "",
    description: "",
    worldImage: "",
    world: "",
  });

  const { mutate: addNewWorldMutate, isPending } = useMutation({
    mutationFn: addNewWorld,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["learningworlds"] });
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    addNewWorldMutate(newWorld);
  };

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
                <Input
                  value={newWorld.title}
                  onChange={(e) =>
                    setNewWorld({ ...newWorld, title: e.target.value })
                  }
                  placeholder="Enter world title"
                />
              </div>

              <div className="flex flex-col gap-1">
                <Label>Subject</Label>
                <Select
                  onValueChange={(value) =>
                    setNewWorld({ ...newWorld, subject: value })
                  }
                >
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
              <Textarea
                value={newWorld.description}
                onChange={(e) =>
                  setNewWorld({ ...newWorld, description: e.target.value })
                }
                placeholder="Enter description"
              />
            </div>

            <div className="flex flex-col gap-4">
              <Label>Available worlds</Label>
              <div className="flex gap-3 flex-wrap">
                {worlds.map((world) => (
                  <div
                    key={world.name}
                    onClick={() => {
                      setSelectedWorld(world.name);
                      setNewWorld({
                        ...newWorld,
                        world: world.name,
                        worldImage: world.image,
                      });
                    }}
                    className={`w-15 h-15 relative overflow-hidden rounded cursor-pointer transition ${
                      selectedWorld === world.name
                        ? "border-2 shadow shadow-black/30 border-[#ff5b5b] scale-125"
                        : ""
                    }`}
                  >
                    <Image
                      src={world.image}
                      alt={world.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
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
            <Button onClick={handleSubmit} className="bg-[#ff5b5b] text-white">
              {isPending ? "Creating..." : "Create world"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewLearningWorldModal;
