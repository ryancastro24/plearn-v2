import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HiTrash } from "react-icons/hi2";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteItem } from "@/backend/items";
import { toast } from "react-toastify";
import { useState } from "react";
const DeleteItemInStoreModal = ({ item }: any) => {
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);
  const { mutate: deleteItemMutate, isPending } = useMutation({
    mutationFn: ({ id }: any) => deleteItem(id),

    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: ["items"], exact: false });
      queryClient.invalidateQueries({
        queryKey: ["onsaleitems"],
        exact: false,
      });
      toast.success(data?.message || "Item deleted successfully");
    },

    onError(error: any) {
      toast.error(error?.message || "Something went wrong");
    },
    onSettled() {
      setOpenDialog(false);
    },
  });
  const handleDelete = (e: any) => {
    e.preventDefault();

    deleteItemMutate({ id: item._id });
  };

  return (
    <>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <Button
            size="icon"
            className="bg-[#FF5B5B] hover:bg-[#f84949] text-white shadow-md"
          >
            <HiTrash className="text-lg" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-155">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription className="text-xs">
              This action cannot be undone. This will permanently delete the
              item and remove the data from our servers.
            </DialogDescription>
          </DialogHeader>

          <div>
            <div className="flex items-center gap-2">
              <Image
                src={item?.image}
                alt="item image"
                width={100}
                height={100}
              />

              <div className="flex flex-col gap-2 pr-10">
                <h3>{item?.name}</h3>
                <p className="text-xs">{item?.description}</p>
                <h2 className="text-2xl">{item?.points.toLocaleString()}Pts</h2>
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"secondary"}>Cancel</Button>
            </DialogClose>
            <Button onClick={handleDelete} variant={"destructive"}>
              {isPending ? "Deleting..." : "Delete item"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteItemInStoreModal;
