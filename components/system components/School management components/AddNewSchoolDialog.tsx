import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
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
const AddNewSchoolDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#FF5B5B]">Add new school</Button>
      </DialogTrigger>
      <DialogContent className="max-w-150">
        <DialogHeader>
          <DialogTitle>Add a new school</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>School name</Label>
            <Input placeholder="Enter school name" />
          </div>

          <div className="flex flex-col gap-2">
            <Label>School address</Label>
            <Input placeholder="Enter school address" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label>Classification</Label>
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="light">Public</SelectItem>
                  <SelectItem value="dark">Private</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label>School logo</Label>
            <Input type="file" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"secondary"}>Close</Button>
          </DialogClose>

          <Button className="bg-[#FF5B5B] hover:bg-[#e14d4d]">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewSchoolDialog;
