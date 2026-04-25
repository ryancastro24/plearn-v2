import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getAllStoreItems } from "@/lib/itemQueryOptions";
import Image from "next/image";

const AddNewSkinRewardModal = ({
  selectedSkinId,
  setSelectedSkinId,
  selectedPriceType,
}: any) => {
  const { data: items } = useQuery(getAllStoreItems());

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            disabled={selectedPriceType !== "heroskin"}
            variant="outline"
            className="w-full"
          >
            Hero Skin
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-200">
          <DialogHeader>
            <DialogTitle>Available Skins</DialogTitle>
            <DialogDescription>
              Pick a fun new skin to make your hero look extra cool! ✨
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-wrap gap-3">
            {items?.map((item: any) => {
              const isSelected = selectedSkinId === item._id;

              return (
                <div
                  key={item._id}
                  onClick={() => setSelectedSkinId(item._id)}
                  className={`p-2 border rounded w-24 h-24 flex flex-col items-center justify-center cursor-pointer transition-all
                    ${
                      isSelected
                        ? "border-blue-500 scale-105 shadow-md"
                        : "border-gray-300"
                    }
                    hover:scale-105 hover:shadow-sm`}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={50}
                    height={50}
                  />

                  <h3 className="font-bold text-[10px] mt-2 text-center">
                    {item.name}
                  </h3>
                </div>
              );
            })}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewSkinRewardModal;
