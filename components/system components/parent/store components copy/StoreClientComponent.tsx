"use client";
import CarouselItemsContainer from "@/components/system components/parent/store components copy/CarouselItemsContainer";
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
import StoreItemsContainer from "@/components/system components/parent/store components copy/StoreItemsContainer";
import OpenCartContainer from "@/components/system components/parent/store components copy/OpenCartContainer";
import { Search } from "lucide-react";
import AddNewStoreItem from "@/components/system components/parent/store components copy/AddNewStoreItem";
import { useQueries } from "@tanstack/react-query";
import { useUser } from "@/lib/userContext";
import {
  getAllStoreItems,
  getAllStoreOnSaleItems,
} from "@/lib/itemQueryOptions";

import { useState, useMemo } from "react";

const StoreClientComponent = () => {
  const [allItems, onsaleitems] = useQueries({
    queries: [getAllStoreItems(), getAllStoreOnSaleItems()],
  });

  const { user } = useUser();

  const items = allItems.data || [];
  const onSaleItems = onsaleitems?.data || [];

  // ✅ NEW STATE
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  // ✅ FILTER LOGIC
  const filteredItems = useMemo(() => {
    return items.filter((item: any) => {
      // 🔍 Search filter
      const matchesSearch = item.name
        ?.toLowerCase()
        .includes(search.toLowerCase());

      // 🏷 Category filter
      const matchesCategory = category === "all" || item.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [items, search, category]);

  return (
    <div className="w-full p-2 flex flex-col gap-4 h-full relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* 🔍 SEARCH */}
          <InputGroup className="max-w-xs">
            <InputGroupInput
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>

          {/* 🏷 CATEGORY */}
          <Select onValueChange={(value) => setCategory(value)}>
            <SelectTrigger className="w-45">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="knight">Knight</SelectItem>
                <SelectItem value="archer">Archer</SelectItem>
                <SelectItem value="mage">Mage</SelectItem>
                <SelectItem value="all">All</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="h-full">
          <OpenCartContainer />
        </div>
      </div>

      {/* 🔥 On Sale (UNCHANGED) */}
      <CarouselItemsContainer onSaleItems={onSaleItems} />

      {/* 🔥 FILTERED ITEMS */}
      <div>
        <StoreItemsContainer allItems={filteredItems} />
      </div>

      {user?.userType === "admin" && (
        <div className="fixed bottom-5 right-5 z-50">
          <AddNewStoreItem />
        </div>
      )}
    </div>
  );
};

export default StoreClientComponent;
