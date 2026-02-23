"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
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

const categories = [
  "chores",
  "academics",
  "sports",
  "social",
  "hobbits",
  "behavior",
];

const CurrentTaskTable = () => {
  return (
    <div className="w-full md:col-span-3 shadow-md shadow-black/20 border border-black/5 p-2 rounded">
      <div className="flex items-center justify-between">
        <h1 className="text-[clamp(0.9rem,3.5vw,1rem)] ">Current Tasks</h1>

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
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className={"block md:hidden w-44"}>
            <Combobox items={categories}>
              <ComboboxInput
                className={"text-sm"}
                placeholder="Select category"
              />
              <ComboboxContent className={"w-40"}>
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

            {/* Hidden on mobile */}
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
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Clean Bedroom</TableCell>

            {/* Hidden columns on mobile */}
            <TableCell className="hidden md:table-cell">Chores</TableCell>
            <TableCell className="hidden md:table-cell text-right">
              50
            </TableCell>
            <TableCell className="hidden md:table-cell text-right">
              Feb 20, 2026
            </TableCell>
            <TableCell className="hidden md:table-cell text-right">
              Pending
            </TableCell>

            {/* Action Column */}
            <TableCell className="text-right">
              {/* Desktop Action */}
              <div className="hidden md:block">
                <Button size="sm">Edit</Button>
              </div>

              {/* Mobile View Button */}
              <div className="md:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Category: Chores</DropdownMenuItem>
                    <DropdownMenuItem>Points: 50</DropdownMenuItem>
                    <DropdownMenuItem>Deadline: Feb 20, 2026</DropdownMenuItem>
                    <DropdownMenuItem>Status: Pending</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default CurrentTaskTable;
