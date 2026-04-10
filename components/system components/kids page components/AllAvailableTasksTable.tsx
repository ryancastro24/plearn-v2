"use client";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

import { Badge } from "@/components/ui/badge";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CiMenuKebab } from "react-icons/ci";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import UpdateTaskStatusDialog from "./UpdateTaskStatusDialog";
const categories = [
  "chores",
  "academics",
  "sports",
  "social",
  "hobbits",
  "behavior",
];

import TaskUpdateModal from "./TaskUpdateModal";
import DeleteTaskModal from "./DeleteTaskModal";
import { HiOutlineDocumentText } from "react-icons/hi";
import { LuTrash2 } from "react-icons/lu";
import { FiEdit3 } from "react-icons/fi";
import { LuFileCheck } from "react-icons/lu";

const AllAvailableTaskTable = ({
  tasks,
  selectedTaskId,
  setSelectedTaskId,
  handleTaskDone,
  taskDonePending,
  kidname,
}: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Pagination logic
  const totalPages = Math.ceil(tasks.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedTasks = tasks.slice(startIndex, endIndex);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  const [selectedTaskToUpdate, setSelectedTaskToUpdate] = useState({
    description: "",
    category: "",
    points: 0,
    deadlineDate: "", // ISO string
    deadlineTime: "",
    remarks: "",
    id: "",
  });

  const [openTaskUpdateModal, setOpenTaskUpdateModal] = useState(false);
  const [openDoneDialog, setOpenDoneDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  return (
    <div className="w-full shadow-md shadow-black/20 border border-black/5 p-2 rounded">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-[clamp(0.9rem,3.5vw,1rem)]">All Tasks</h1>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-3 md:flex">
            <InputGroup>
              <InputGroupInput placeholder="Search..." />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
            </InputGroup>

            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectGroup>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Pagination Controls */}
            <div className="flex justify-end items-center gap-2 w-full ">
              <Button
                size="sm"
                onClick={handlePrev}
                disabled={currentPage === 1}
              >
                Prev
              </Button>
              <span className="flex items-center text-sm">
                Page {currentPage}
              </span>
              <Button
                size="sm"
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>

          <div className="block md:hidden w-44">
            <Combobox items={categories}>
              <ComboboxInput
                className="text-sm"
                placeholder="Select category"
              />
              <ComboboxContent className="w-40">
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </div>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Task ID</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="hidden md:table-cell">Category</TableHead>
            <TableHead className="hidden md:table-cell text-right">
              Points
            </TableHead>
            <TableHead className="hidden md:table-cell text-right">
              Deadline
            </TableHead>
            <TableHead className="hidden md:table-cell text-right">
              Status
            </TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {paginatedTasks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-6">
                No tasks found
              </TableCell>
            </TableRow>
          ) : (
            paginatedTasks.map((task: any) => (
              <TableRow key={task.taskId}>
                <TableCell className="font-medium">{task.taskId}</TableCell>
                <TableCell>{task.taskDescription}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {task.category}
                </TableCell>
                <TableCell className="hidden md:table-cell text-right">
                  {task.points}
                </TableCell>
                <TableCell className="hidden md:table-cell text-right">
                  {task.deadlineDate}
                </TableCell>
                <TableCell className={`hidden md:table-cell text-right  `}>
                  <Badge
                    className={`text-white ${
                      task.approvalStatus?.toLowerCase() === "done"
                        ? "bg-green-500"
                        : task.approvalStatus?.toLowerCase() === "pending"
                          ? "bg-orange-500"
                          : "bg-red-500"
                    }`}
                  >
                    {" "}
                    {task.approvalStatus == "done"
                      ? "Done "
                      : task.approvalStatus == "pending"
                        ? "Pending"
                        : "Failed"}
                  </Badge>
                </TableCell>

                <TableCell className="text-right">
                  <div className="hidden md:block">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant={"outline"}>
                          <CiMenuKebab />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuGroup>
                          <DropdownMenuLabel>Action menu</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedTaskToUpdate({
                                description: task.taskDescription,
                                category: task.category,
                                points: task.points,
                                deadlineDate: task.deadlineDate, // ISO string
                                deadlineTime: task.deadlineTime,
                                remarks: task.remarks,
                                id: task._id,
                              });
                              setOpenTaskUpdateModal(true);
                            }}
                          >
                            <FiEdit3 /> Edit task
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            disabled={
                              task.approvalStatus === "done" ||
                              task.approvalStatus === "failed"
                            }
                            onClick={() => {
                              setSelectedTaskId(task._id);
                              setOpenDoneDialog(true);
                            }}
                          >
                            <HiOutlineDocumentText /> Update status
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            onClick={() => {
                              setOpenDeleteDialog(true);
                              setSelectedTaskId(task._id);
                            }}
                            className="text-sm"
                            variant="destructive"
                          >
                            <LuTrash2 /> Delete task
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="md:hidden">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          Category: {task.category}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Points: {task.points}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Deadline: {task.deadlineDate}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Status: {task.approvalStatus}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <DeleteTaskModal
        selectedTaskId={selectedTaskId}
        setOpenDeleteDialog={setOpenDeleteDialog}
        openDeleteDialog={openDeleteDialog}
      />

      <TaskUpdateModal
        openTaskUpdateModal={openTaskUpdateModal}
        setOpenTaskUpdateModal={setOpenTaskUpdateModal}
        setSelectedTaskToUpdate={setSelectedTaskToUpdate}
        selectedTaskToUpdate={selectedTaskToUpdate}
      />

      <UpdateTaskStatusDialog
        handleTaskDone={handleTaskDone}
        taskDonePending={taskDonePending}
        openDoneDialog={openDoneDialog}
        setOpenDoneDialog={setOpenDoneDialog}
        selectedTaskId={selectedTaskId}
        kidname={kidname}
      />
    </div>
  );
};

export default AllAvailableTaskTable;
