import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

const LearningHubRewards = () => {
  return (
    <div className="w-full relative p-4 col-span-2 shadow shadow-black/30 border border-black/10 rounded-lg">
      <h2 className="text-sm">Rewards available</h2>

      <div></div>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-linear-to-r from-[#685AFF] to-[#008CFF] text-white hover:bg-[#685AFF] absolute bottom-4 ">
            Add new reward
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-150">
          <DialogHeader>
            <DialogTitle>Add a new reward</DialogTitle>
            <DialogDescription>
              Create new reward for each level or even better prices
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3 w-full">
              <div className="flex flex-col gap-1 w-full">
                <Label>Level</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="1">Level 1</SelectItem>
                      <SelectItem value="2">Level 2</SelectItem>
                      <SelectItem value="3">Level 3</SelectItem>
                      <SelectItem value="4">Level 4</SelectItem>
                      <SelectItem value="5">Level 5</SelectItem>
                      <SelectItem value="6">Level 6</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1 w-full">
                <Label>Price Type</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select price type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="goldcoins">Gold Coins</SelectItem>
                      <SelectItem value="magicgems">Magic gems</SelectItem>
                      <SelectItem value="heroskin">Hero skin</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <Label>Hero skin</Label>
              <Input placeholder="Upload hero skin" type="file" />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"secondary"}>Close</Button>
            </DialogClose>
            <Button className="bg-[#ff5b5b] text-white">Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LearningHubRewards;
