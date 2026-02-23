import TaskContainer from "./TaskContainer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "../../ui/button";
import { Search } from "lucide-react";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
const TasksContainerComponent = () => {
  return (
    <div className="w-full flex h-full mt-8 md:mt-0 md:p-3 flex-col gap-4 md:col-span-3">
      <h2>Available Tasks</h2>

      <div className="flex items-center gap-2 justify-between">
        <div className="flex items-center gap-2">
          <InputGroup className="max-w-xs">
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>

          <Select>
            <SelectTrigger className="w-45">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 justify-center">
          <Button size={"icon"} variant={"secondary"}>
            <SlArrowLeft />
          </Button>
          <Button size={"icon"} variant={"secondary"}>
            <SlArrowRight />
          </Button>
        </div>
      </div>
      <TaskContainer
        profileImage="/dashboard assets/boy.jpg"
        name="Mark Twain"
        task="Complete project documentation"
      />

      <TaskContainer
        profileImage="/dashboard assets/boy.jpg"
        name="Mark Twain"
        task="Cleaning the house"
      />

      <TaskContainer
        profileImage="/dashboard assets/girl.avif"
        name="Liza Twain"
        task="Answering Math Assignment"
      />
    </div>
  );
};

export default TasksContainerComponent;
