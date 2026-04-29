"use client";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import AddNewClassModal from "./AddNewClassModal";
import { Search } from "lucide-react";
const ClassesContainer = () => {
  return (
    <div className="flex flex-col gap-2">
      <h2>Classes Today</h2>
      <div className="flex items-center gap-3 w-125">
        <InputGroup>
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
        <AddNewClassModal />
      </div>
    </div>
  );
};

export default ClassesContainer;
