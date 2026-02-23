"use client";

import CarouselItemsContainer from "@/components/system components/store components/CarouselItemsContainer";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import StoreItemsContainer from "@/components/system components/store components/StoreItemsContainer";
import OpenCartContainer from "@/components/system components/store components/OpenCartContainer";
import { Search } from "lucide-react";

const Storepage = () => {
  return (
    <div className="w-full p-2 flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between">
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

        <div className="h-full">
          {/* ✅ ref goes to REAL button */}

          <OpenCartContainer />
        </div>
      </div>

      <CarouselItemsContainer />
      <div>
        <StoreItemsContainer />
      </div>
    </div>
  );
};

export default Storepage;
