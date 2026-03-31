import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { DatePicker } from "./DatePicker";

const AddNewTaskModal = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-linear-to-r from-[#FF5B5B] to-[#F04886] h-12 rounded w-full text-white">
            Add new task
          </Button>
        </DialogTrigger>
        <DialogContent className="p-3 md:p-6 max-w-150  ">
          <DialogHeader>
            <DialogTitle>Add new task</DialogTitle>
          </DialogHeader>

          <div className="grid md:grid-cols-2 gap-2">
            <div className="flex flex-col gap-2">
              <Label>Description</Label>
              <Input placeholder="Enter description" />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Category</Label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectGroup>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label>Points</Label>
              <Input placeholder="Enter points" type="number" />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Deadline Date</Label>
              <DatePicker />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Deadline Time</Label>
              <Input
                type="time"
                id="time-picker-optional"
                step="1"
                defaultValue="08:30:00"
                className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Remarks</Label>
              <Input placeholder="Enter remarks" type="text" />
            </div>

            <Button className="bg-linear-to-r from-[#FF5B5B] to-[#F04886] h-12 rounded w-full text-white mt-2">
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddNewTaskModal;
