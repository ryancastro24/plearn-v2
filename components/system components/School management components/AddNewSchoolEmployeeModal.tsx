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
const AddNewSchoolEmployeeModal = () => {
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
            <DialogTitle>Add new employee</DialogTitle>
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
              <Label>Position</Label>
              <Select>
                <SelectTrigger className="w-45">
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent className="w-full">
                  <SelectGroup>
                    <SelectItem value="teacher1">Teacher I</SelectItem>
                    <SelectItem value="teacher2">Teacher II</SelectItem>
                    <SelectItem value="teacher3">Teacher III</SelectItem>
                    <SelectItem value="masterteacher1">
                      Master Teacher I
                    </SelectItem>
                    <SelectItem value="masterteacher2">
                      Master Teacher II
                    </SelectItem>
                    <SelectItem value="masterteacher3">
                      Master Teacher III
                    </SelectItem>
                    <SelectItem value="masterteacher4">
                      Master Teacher IV
                    </SelectItem>
                    <SelectItem value="head teacher">Head Teacher</SelectItem>
                    <SelectItem value="principal">Principal</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-1">
              <Label>Email</Label>
              <Input placeholder="Enter email" type="email" />
            </div>

            <div className="flex flex-col gap-1">
              <Label>Phone number</Label>
              <Input placeholder="Enter phonenumber" type="number" />
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

export default AddNewSchoolEmployeeModal;
