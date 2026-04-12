import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
const DashboardAdsSubscriptionModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full text-white bg-linear-to-r from-[#FF5B5B] to-[#F04886] rounded">
          Avail now
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-150">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DashboardAdsSubscriptionModal;
