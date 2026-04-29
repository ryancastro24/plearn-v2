import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const EditTeacherDetailsModal = ({
  editDetailsOpen,
  setEditDetailsOpen,
}: any) => {
  return (
    <Dialog open={editDetailsOpen} onOpenChange={setEditDetailsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Teacher Details</DialogTitle>
          <DialogDescription>
            Make changes to the teacher's information here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Edit teacher details form fields would go here */}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTeacherDetailsModal;
