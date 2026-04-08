"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { LuTrash2 } from "react-icons/lu";
import { FiEdit3 } from "react-icons/fi";
import { LuFileCheck } from "react-icons/lu";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CiMenuKebab } from "react-icons/ci";

const CurrentTaskTable = ({
  tasks,
  setOpenDeleteDialog,
  openDeleteDialog,
  handleDeleteTask,
  deletePending,
  selectedTaskId,
  setSelectedTaskId,
}: any) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 3;

  // Pagination logic
  const totalPages = Math.ceil(tasks.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedTasks = tasks.slice(startIndex, endIndex);
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="w-full md:col-span-3 shadow-md shadow-black/20 border border-black/5 p-2 rounded">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-[clamp(0.9rem,3.5vw,1rem)]">Current Tasks</h1>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-3 md:flex">
            <InputGroup>
              <InputGroupInput placeholder="Search..." />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
            </InputGroup>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={handlePrev}
                disabled={currentPage === 1}
              >
                Prev
              </Button>

              <Button
                size="sm"
                onClick={handleNext}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>

          {/* Pagination Controls */}
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
          {paginatedTasks.map((task: any) => (
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
              <TableCell className="hidden md:table-cell text-right">
                {task.approvalStatus}
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
                        <DropdownMenuItem>
                          <FiEdit3 /> Edit task
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <LuFileCheck /> Done task
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
                      <DropdownMenuItem>Points: {task.points}</DropdownMenuItem>
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
          ))}
        </TableBody>
      </Table>

      <AlertDialog onOpenChange={setOpenDeleteDialog} open={openDeleteDialog}>
        <AlertDialogContent className="max-w-125">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              task from our servers
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => handleDeleteTask(e, selectedTaskId)}
              variant={"destructive"}
            >
              {" "}
              <LuTrash2 /> {deletePending ? "Deleting..." : "Delete task"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CurrentTaskTable;
