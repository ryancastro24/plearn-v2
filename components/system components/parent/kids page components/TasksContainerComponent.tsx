import { useState, useMemo } from "react";
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
import { Button } from "../../../ui/button";
import { Search } from "lucide-react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { capitalize } from "./KidTasksClientComponent";

const TasksContainerComponent = ({ tasks }: any) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 3;

  // 🔍 Filtered Tasks (Search + Category)
  const filteredTasks = useMemo(() => {
    if (!tasks) return [];

    return tasks.filter((task: any) => {
      const fullName =
        `${task.kidId.firstname} ${task.kidId.lastname}`.toLowerCase();
      const description = task.taskDescription.toLowerCase();

      const matchesSearch =
        fullName.includes(search.toLowerCase()) ||
        description.includes(search.toLowerCase());

      const matchesCategory = category === "all" || task.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [tasks, search, category]);

  // 📄 Pagination
  const totalPages = Math.ceil(filteredTasks.length / ITEMS_PER_PAGE);

  const paginatedTasks = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTasks.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredTasks, currentPage]);

  // ⬅️➡️ Navigation
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="w-full flex h-full mt-8 md:mt-0 md:p-3 flex-col gap-4 md:col-span-3">
      <h2>Available Tasks</h2>

      <div className="flex items-center gap-2 justify-between">
        <div className="flex items-center gap-2">
          {/* 🔍 Search */}
          <InputGroup className="max-w-xs">
            <InputGroupInput
              placeholder="Search..."
              value={search}
              onChange={(e: any) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>

          {/* 📂 Category Filter */}
          <Select
            value={category}
            onValueChange={(value) => {
              setCategory(value);
              setCurrentPage(1); // reset page
            }}
          >
            <SelectTrigger className="w-45">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="householdchores">
                  Household Chores
                </SelectItem>
                <SelectItem value="academics">Academics</SelectItem>
                <SelectItem value="extracurricular">Extracurricular</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* 📄 Pagination Controls */}
        <div className="flex items-center gap-2 justify-center">
          <Button
            size={"icon"}
            variant={"secondary"}
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            <SlArrowLeft />
          </Button>

          <span className="text-sm">
            {currentPage} / {totalPages || 1}
          </span>

          <Button
            size={"icon"}
            variant={"secondary"}
            onClick={handleNext}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            <SlArrowRight />
          </Button>
        </div>
      </div>

      {/* 🧾 Task List */}
      {paginatedTasks.length > 0 ? (
        paginatedTasks.map((task: any) => (
          <TaskContainer
            key={task.taskId}
            profileImage="/dashboard assets/girl.avif"
            name={
              capitalize(task.kidId.firstname) +
              " " +
              capitalize(task.kidId.lastname)
            }
            task={task.taskDescription}
            kidId={task._id}
          />
        ))
      ) : (
        <p className="text-sm text-gray-500">No tasks found.</p>
      )}
    </div>
  );
};

export default TasksContainerComponent;
