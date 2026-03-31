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
const DeleteItemInStoreModal = () => {
  return (
    <>
      <Dialog>
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
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>

          <div>
            <div className="flex items-center gap-2">
              <Image
                src={"/store page assets/store image 4.png"}
                alt="item image"
                width={100}
                height={100}
              />

              <div className="flex flex-col gap-2 pr-10">
                <h3>MIni Dragon Pet (Blue)</h3>
                <p className="text-xs">
                  Tiny chibi dragon companion with smooth shiny scales and big
                  sparkling eyes.
                </p>
                <h2 className="text-2xl">5600Pts</h2>
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"secondary"}>Cancel</Button>
            </DialogClose>
            <Button variant={"destructive"}>Delete item</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteItemInStoreModal;
