"use client";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { HiPlusCircle } from "react-icons/hi";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageDropZone from "./ImageDropzone";
import { createItem } from "@/backend/items";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
const AddNewStoreItem = () => {
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);
  const [onSale, setOnSale] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const [form, setForm] = useState({
    description: "",
    name: "",
    points: "",
    discount: "",
    discountDeadline: "",
    category: "",
    rarity: "",
    power: "",
    itemType: "",
  });

  const { mutate: addNewItem, isPending } = useMutation({
    mutationFn: ({ formData }: any) => createItem(formData),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"], exact: false });
      queryClient.invalidateQueries({
        queryKey: ["onsaleitems"],
        exact: false,
      });
      toast.success("Item added succesfully");
    },

    onError: (error: any) => {
      toast.error(error.message);
    },
    onSettled() {
      setOpenDialog(false);
    },
  });

  // 🧠 Handle input change
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 🚀 Submit handler
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("description", form.description || "");
    formData.append("name", form.name || "");
    formData.append("points", String(form.points || 0));
    formData.append("onSale", String(onSale));
    formData.append("discount", String(form.discount || 0));
    formData.append("discountDeadline", form.discountDeadline || "");
    formData.append("category", form.category || "");
    formData.append("rarity", form.rarity || "");
    formData.append("power", String(form.power || 0));
    formData.append("itemType", form.itemType || "");

    if (file) {
      formData.append("image", file);
    }

    // ✅ THIS IS THE FIX
    addNewItem({ formData });
  };

  return (
    <div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger className="w-15 h-15 md:w-18 md:h-18 flex items-center justify-center cursor-pointer hover:bg-[#f84949] bg-[#FF5B5B] text-white rounded-full shadow shadow-black/20">
          <HiPlusCircle className="md:text-5xl text-4xl" />
        </DialogTrigger>

        <DialogContent className="p-3 max-w-200">
          <DialogHeader>
            <DialogTitle className="text-left">Add new item</DialogTitle>
          </DialogHeader>

          {/* ✅ FORM START */}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-5 gap-5">
              <div className="flex flex-col gap-2 w-full col-span-3">
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">Item Description</Label>
                  <Input
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Enter item description"
                  />
                </div>

                <div className="flex justify-between items-center gap-2">
                  <div className="flex flex-col gap-1 w-full">
                    <Label className="text-xs">Item name</Label>
                    <Input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter item name"
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full">
                    <div className="flex flex-col gap-1">
                      <Label className="text-xs">Points</Label>
                      <Input
                        name="points"
                        type="number"
                        value={form.points}
                        onChange={handleChange}
                        placeholder="Enter points"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <Label className="text-xs">On Sale</Label>
                      <Switch
                        checked={onSale}
                        onCheckedChange={(value) => setOnSale(value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center gap-2 w-full">
                  <div className="flex flex-col gap-1 w-full">
                    <Label
                      className={`text-xs ${!onSale ? "text-gray-300" : ""}`}
                    >
                      Discount in percent
                    </Label>
                    <Input
                      name="discount"
                      disabled={!onSale}
                      type="number"
                      value={form.discount}
                      onChange={handleChange}
                      placeholder="Enter discount percent"
                    />
                  </div>

                  <div className="flex flex-col gap-1 w-full">
                    <Label
                      className={`text-xs ${!onSale ? "text-gray-300" : ""}`}
                    >
                      Discount discountDeadline
                    </Label>
                    <Input
                      name="discountDeadline"
                      disabled={!onSale}
                      type="date"
                      value={form.discountDeadline}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center gap-2 w-full">
                  {/* CATEGORY */}
                  <div className="flex flex-col gap-1 w-full">
                    <Label className="text-xs">Category</Label>
                    <Select
                      onValueChange={(value) =>
                        setForm((prev) => ({ ...prev, category: value }))
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select category" />
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

                  {/* RARITY */}
                  <div className="flex flex-col gap-1 w-full">
                    <Label className="text-xs">Rarity</Label>
                    <Select
                      onValueChange={(value) =>
                        setForm((prev) => ({ ...prev, rarity: value }))
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select rarity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="common">Common</SelectItem>
                          <SelectItem value="rare">Rare</SelectItem>
                          <SelectItem value="epic">Epic</SelectItem>
                          <SelectItem value="mythic">Mythic</SelectItem>
                          <SelectItem value="legendary">Legendary</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-between items-center gap-2 w-full">
                  <div className="flex flex-col gap-1 w-full">
                    <Label className="text-xs">Power</Label>
                    <Input
                      name="power"
                      type="number"
                      value={form.power}
                      onChange={handleChange}
                      placeholder="Enter item power"
                    />
                  </div>

                  {/* TYPE */}
                  <div className="flex flex-col gap-1 w-full">
                    <Label className="text-xs">Type</Label>
                    <Select
                      onValueChange={(value) =>
                        setForm((prev) => ({ ...prev, itemType: value }))
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select itemType" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="weapon">Weapon</SelectItem>
                          <SelectItem value="armor">Armor</SelectItem>
                          <SelectItem value="consumable">Consumable</SelectItem>
                          <SelectItem value="pet">Pet</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* IMAGE */}
              <ImageDropZone setFile={setFile} />
            </div>

            <DialogFooter>
              <div className="flex items-center gap-4">
                <DialogClose asChild>
                  <Button className="cursor-pointer" variant={"secondary"}>
                    Close
                  </Button>
                </DialogClose>

                <Button
                  type="submit"
                  disabled={isPending}
                  className="bg-[#FF5B5B] cursor-pointer hover:bg-[#f84949]"
                >
                  {isPending ? "Adding..." : "Add new item"}
                </Button>
              </div>
            </DialogFooter>
          </form>
          {/* ✅ FORM END */}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewStoreItem;
