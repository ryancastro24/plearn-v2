import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SchoolCardContainer from "@/components/system components/admin/School management components/SchoolCardContainer";
import { getAllSchoolsQuery } from "@/lib/schoolQueryOptions";
import SchoolEnrollmentCard from "./SchoolEnrollmentCard";
import { useQuery } from "@tanstack/react-query";
const EnrollKidModal = () => {
  const { data: schools } = useQuery(getAllSchoolsQuery());
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-linear-to-r from-[#FF5B5B] to-[#F04886] text-white">
          Enroll kid
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-250">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {schools?.map((val: any) => (
            <SchoolEnrollmentCard
              key={val._id}
              schoolLogo={val.logo}
              schoolname={val.name}
              schoolid={val.schoolId}
              id={val._id}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EnrollKidModal;
