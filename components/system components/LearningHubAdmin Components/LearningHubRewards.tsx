"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { createReward } from "@/backend/learnginworldtopicreward";
import { getWorldTopicRewardsQuery } from "@/lib/worldtopicrewardsQueryOptions";
import { toast } from "react-toastify";
import AddNewSkinRewardModal from "./AddNewSkinRewardModal";
import EditNewSkinRewardModal from "./EditNewSkinRewardModal";
import DeleteTopicRewardModal from "./DeleteTopicRewardModal";
const LearningHubRewards = ({ topics, id }: any) => {
  const queryClient = useQueryClient();
  const { data: rewards } = useQuery(getWorldTopicRewardsQuery(id));

  const [selectedTopic, setSelectedTopic] = useState<any>(null);
  const [priceType, setPriceType] = useState("");
  const [qty, setQty] = useState(1);
  const [selectedSkinId, setSelectedSkinId] = useState<string>("");

  // ✅ CREATE MUTATION
  const { mutate: addNewReward, isPending } = useMutation({
    mutationFn: createReward,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["worldtopicrewards", id] });

      toast.success("Reward created successfully");

      setSelectedTopic(null);
      setPriceType("");
      setSelectedSkinId("");
      setQty(1);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create reward");
    },
  });

  // ✅ SUBMIT
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedTopic || !priceType) {
      return toast.error("Please complete required fields");
    }

    if (priceType === "heroskin" && !selectedSkinId) {
      return toast.error("Please select a hero skin");
    }

    addNewReward({
      learningworldId: id,
      topicId: selectedTopic._id,
      priceType,
      quantity: priceType === "heroskin" ? 1 : qty,
      heroSkinId: priceType === "heroskin" ? selectedSkinId : undefined,
    });
  };

  return (
    <div className="w-full relative p-4 col-span-2 shadow shadow-black/30 border border-black/10 rounded-lg">
      <h2 className="text-sm mb-3">Rewards available</h2>

      {/* ================= REWARDS LIST ================= */}
      <div className="flex flex-col gap-3">
        {Array.isArray(rewards?.data) && rewards.data.length > 0 ? (
          rewards.data.map((reward: any) => (
            <div
              key={reward._id}
              className="relative group flex items-center justify-between p-3 bg-gray-100 rounded-lg"
            >
              {/* LEFT */}
              <div>
                <h3 className="font-semibold">{reward.title}</h3>
                <p className="text-sm text-muted-foreground">
                  Level{" "}
                  {topics?.findIndex((t: any) => t._id === reward.topicId._id) +
                    1}
                  : {reward.topicId.title}
                </p>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-2">
                {reward.priceType === "goldcoins" ? (
                  <Image
                    src="/dashboard assets/game coin.png"
                    alt="gold coin"
                    width={30}
                    height={30}
                  />
                ) : reward.priceType === "magicgems" ? (
                  <Image
                    src="/dashboard assets/gem.png"
                    alt="magic gem"
                    width={30}
                    height={30}
                  />
                ) : (
                  reward.heroSkinId?.image && (
                    <Image
                      src={reward.heroSkinId.image}
                      alt="hero skin"
                      width={50}
                      height={50}
                    />
                  )
                )}

                {reward.priceType !== "heroskin" && (
                  <span>{reward.quantity}</span>
                )}
              </div>

              {/* ================= HOVER ACTIONS ================= */}
              <div
                className="
                  absolute right-3 top-1/2 -translate-y-1/2
                  flex gap-2
                  opacity-0 scale-95
                  group-hover:opacity-100 group-hover:scale-100
                  transition-all duration-200
                  bg-white border shadow-md rounded-lg px-2 py-1
                "
              >
                <EditNewSkinRewardModal
                  reward={reward}
                  topics={topics}
                  id={id}
                />

                <DeleteTopicRewardModal id={reward._id} />
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted-foreground">No rewards available.</p>
        )}
      </div>

      {/* ================= ADD REWARD DIALOG ================= */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-5 bg-linear-to-r from-[#685AFF] to-[#008CFF] text-white">
            Add new reward
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-150">
          <DialogHeader>
            <DialogTitle>Add a new reward</DialogTitle>
            <DialogDescription>
              Create new reward for each level or better prizes
            </DialogDescription>
          </DialogHeader>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3">
              {/* LEVEL */}
              <div className="flex flex-col gap-1">
                <Label>Level</Label>
                <Select
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
                <Select onValueChange={setPriceType}>
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

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>

              <Button
                type="submit"
                disabled={isPending}
                className="bg-linear-to-r from-[#FF5B5B] to-[#F04886] text-white"
              >
                {isPending ? "Submitting..." : "Submit"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LearningHubRewards;
