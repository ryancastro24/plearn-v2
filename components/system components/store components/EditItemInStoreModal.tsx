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
import { MdModeEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateItem } from "@/backend/items";

const EditItemInStoreModal = ({
  selectedItem,
  setSelectedItem,
  itemId,
}: any) => {
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);
  const [onSale, setOnSale] = useState(selectedItem.onSale);
  const [file, setFile] = useState<File | null>(null);

  const { mutate: updateItemMutate, isPending } = useMutation({
    mutationFn: ({ formData, id }: any) => updateItem(formData, id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["items"], exact: false });
      queryClient.invalidateQueries({
        queryKey: ["onsaleitems"],
        exact: false,
      });
      toast.success("Item updated succesfully");
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
    setSelectedItem((prev: any) => ({ ...prev, [name]: value }));
  };

  // 🚀 Submit handler
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("description", selectedItem.description || "");
    formData.append("name", selectedItem.name || "");
    formData.append("points", String(selectedItem.points || 0));
    formData.append("onSale", String(onSale));
    formData.append("discount", String(selectedItem.discount || 0));
    formData.append("discountDeadline", selectedItem.discountDeadline || "");
    formData.append("category", selectedItem.category || "");
    formData.append("rarity", selectedItem.rarity || "");
    formData.append("power", String(selectedItem.power || 0));
    formData.append("itemType", selectedItem.itemType || "");

    if (file) {
      formData.append("image", file);
    }

    // ✅ PASS BOTH formData + id
    updateItemMutate({
      formData,
      id: itemId,
    });
  };

  return (
    <div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <Button
            size="icon"
            className="bg-[#685AFF] hover:bg-[#564bd8] text-white"
          >
            <MdModeEdit className="text-lg" />
          </Button>
        </DialogTrigger>

        <DialogContent className="p-3 max-w-200">
          <DialogHeader>
            <DialogTitle className="text-left">Update item</DialogTitle>
          </DialogHeader>

          {/* ✅ FORM START */}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-5 gap-5">
              <div className="flex flex-col gap-2 w-full col-span-3">
                <div className="flex flex-col gap-1">
                  <Label className="text-xs">Item Description</Label>
                  <Input
                    name="description"
                    value={selectedItem.description}
                    onChange={handleChange}
                    placeholder="Enter item description"
                  />
                </div>

                <div className="flex justify-between items-center gap-2">
                  <div className="flex flex-col gap-1 w-full">
                    <Label className="text-xs">Item name</Label>
                    <Input
                      name="name"
                      value={selectedItem.name}
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
                        value={selectedItem.points}
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
                      value={selectedItem.discount}
                      onChange={handleChange}
                      placeholder="Enter discount percent"
                    />
                  </div>

                  <div className="flex flex-col gap-1 w-full">
                    <Label
                      className={`text-xs ${!onSale ? "text-gray-300" : ""}`}
                    >
                      Discount Deadline
                    </Label>
                    <Input
                      name="discountDeadline"
                      disabled={!onSale}
                      type="date"
                      value={selectedItem.discountDeadline}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="flex justify-between items-center gap-2 w-full">
                  {/* CATEGORY */}
                  <div className="flex flex-col gap-1 w-full">
                    <Label className="text-xs">Category</Label>
                    <Select
                      defaultValue={selectedItem.category}
                      onValueChange={(value) =>
                        setSelectedItem((prev: any) => ({
                          ...prev,
                          category: value,
                        }))
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
                      defaultValue={selectedItem.rarity}
                      onValueChange={(value) =>
                        setSelectedItem((prev: any) => ({
                          ...prev,
                          rarity: value,
                        }))
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
                      value={selectedItem.power}
                      onChange={handleChange}
                      placeholder="Enter item power"
                    />
                  </div>

                  {/* TYPE */}
                  <div className="flex flex-col gap-1 w-full">
                    <Label className="text-xs">Type</Label>
                    <Select
                      defaultValue={selectedItem.itemType}
                      onValueChange={(value) =>
                        setSelectedItem((prev: any) => ({
                          ...prev,
                          itemType: value,
                        }))
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select type" />
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
                  {isPending ? "Updating..." : "Update item"}
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

export default EditItemInStoreModal;
