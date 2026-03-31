import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import { AiFillMessage } from "react-icons/ai";
const AddNewCommentModal = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger className="w-15 h-15 md:w-18 md:h-18 flex items-center justify-center  cursor-pointer hover:bg-[#f84949]   bg-[#FF5B5B] text-white  rounded-full shadow shadow-black/20">
          <AiFillMessage className="md:text-5xl text-4xl" />
        </DialogTrigger>
        <DialogContent className="p-3 max-w-125">
          <DialogHeader>
            <DialogTitle className="text-left">
              Share it with others
            </DialogTitle>

            <div className="mt-4">
              <Textarea placeholder="what's on your mind? " />
            </div>
          </DialogHeader>

          <DialogFooter>
            <div className="flex items-center gap-4">
              <DialogClose asChild>
                <Button className="cursor-pointer" variant={"secondary"}>
                  Cancel
                </Button>
              </DialogClose>

              <Button className="bg-[#FF5B5B] cursor-pointer hover:bg-[#f84949]">
                Post Comment
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewCommentModal;
