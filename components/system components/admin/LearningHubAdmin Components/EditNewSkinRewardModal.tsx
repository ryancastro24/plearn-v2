"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import AddNewSkinRewardModal from "./AddNewSkinRewardModal";
import { updateReward } from "@/backend/learnginworldtopicreward";
// // 👉 IMPORTANT: replace this with your real API
// import { updateReward } from "@/backend/learnginworldtopicreward";

const EditNewSkinRewardModal = ({ reward, topics, id }: any) => {
  const queryClient = useQueryClient();

  // ================= LOCAL STATE =================
  const [open, setOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<any>(null);
  const [priceType, setPriceType] = useState("");
  const [qty, setQty] = useState(1);
  const [selectedSkinId, setSelectedSkinId] = useState<string>("");

  // ================= PREFILL ON OPEN =================
  useEffect(() => {
    if (!reward) return;

    setSelectedTopic(reward.topicId);
    setPriceType(reward.priceType);
    setQty(reward.quantity || 1);
    setSelectedSkinId(reward.heroSkinId?._id || "");
  }, [reward, open]);

  // ================= UPDATE MUTATION =================
  const { mutate: editReward, isPending } = useMutation({
    mutationFn: (payload: any) => updateReward(payload, reward._id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["worldtopicrewards", id],
      });

      toast.success("Reward updated successfully");
      setOpen(false);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update reward");
    },
  });

  // ================= SUBMIT =================
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedTopic || !priceType) {
      return toast.error("Please complete required fields");
    }

    if (priceType === "heroskin" && !selectedSkinId) {
      return toast.error("Please select a hero skin");
    }

    editReward({
      rewardId: reward._id,
      topicId: selectedTopic._id,
      priceType,
      quantity: priceType === "heroskin" ? 1 : qty,
      heroSkinId: priceType === "heroskin" ? selectedSkinId : undefined,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* TRIGGER BUTTON */}
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="text-xs h-7">
          Edit
        </Button>
      </DialogTrigger>

      {/* MODAL */}
      <DialogContent className="max-w-150">
        <DialogHeader>
          <DialogTitle>Edit Reward</DialogTitle>
          <DialogDescription>
            Update reward details for this level
          </DialogDescription>
        </DialogHeader>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            {/* LEVEL */}
            <div className="flex flex-col gap-1">
              <Label>Level</Label>
              <Select
                value={selectedTopic?._id}
                onValueChange={(value) => {
                  const topic = topics?.find((t: any) => t._id === value);
                  setSelectedTopic(topic);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {topics?.map((topic: any, index: number) => (
                      <SelectItem key={topic._id} value={topic._id}>
                        Level {index + 1} - {topic.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* PRICE TYPE */}
            <div className="flex flex-col gap-1">
              <Label>Price Type</Label>
              <Select value={priceType} onValueChange={setPriceType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select price type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="goldcoins">Gold Coins</SelectItem>
                    <SelectItem value="magicgems">Magic Gems</SelectItem>
                    <SelectItem value="heroskin">Hero Skin</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* QTY */}
            <div className="flex flex-col gap-1">
              <Label>Quantity</Label>
              <Input
                type="number"
                min={1}
                value={qty}
                onChange={(e) => setQty(parseInt(e.target.value) || 1)}
                disabled={priceType === "heroskin"}
              />
            </div>

            {/* HERO SKIN */}
            <div className="flex flex-col gap-1">
              <Label>Hero Skin</Label>
              <AddNewSkinRewardModal
                selectedSkinId={selectedSkinId}
                setSelectedSkinId={setSelectedSkinId}
                selectedPriceType={priceType}
              />
            </div>
          </div>

          {/* ACTIONS */}
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>

            <Button
              type="submit"
              disabled={isPending}
              className="bg-linear-to-r from-[#FF5B5B] to-[#F04886] text-white"
            >
              {isPending ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditNewSkinRewardModal;
