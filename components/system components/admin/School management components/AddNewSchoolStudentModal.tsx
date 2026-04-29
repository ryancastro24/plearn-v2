import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { LuPlus } from "react-icons/lu";
const AddNewSchoolStudentModal = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            size="icon"
            className="rounded-full bg-[#507FFF] text-white self-end sm:self-auto"
          >
            <LuPlus />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-135">
          <DialogHeader>
            <DialogTitle>Add new student</DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <Label>Firstname</Label>
              <Input placeholder="Enter firstname" />
            </div>

            <div className="flex flex-col gap-1">
              <Label>Middlename</Label>
              <Input placeholder="Enter middlename" />
            </div>

            <div className="flex flex-col gap-1">
              <Label>Lastname</Label>
              <Input placeholder="Enter lastname" />
            </div>

            <div className="flex flex-col gap-1">
              <Label>Grade level</Label>
              <Select>
                <SelectTrigger className="w-45">
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectGroup>
                    <SelectItem value="kindergarten">Kindergarten</SelectItem>
                    <SelectItem value="grade1">Grade I</SelectItem>
                    <SelectItem value="grade2">Grade II</SelectItem>
                    <SelectItem value="grade3">Grade III</SelectItem>
                    <SelectItem value="grade4">Grade IV</SelectItem>
                    <SelectItem value="grade5">Grade V</SelectItem>
                    <SelectItem value="grade6">Grade VI</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <DialogClose>Close</DialogClose>

            <Button className="bg-[#FF5B5B] text-white">Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddNewSchoolStudentModal;
