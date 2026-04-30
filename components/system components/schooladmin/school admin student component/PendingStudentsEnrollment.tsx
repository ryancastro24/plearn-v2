import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getRankByLevel } from "@/lib/rankLabels";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approveEnrollment } from "@/backend/enrolledStudent";
import { toast } from "react-toastify";
const PendingStudentsEnrollment = ({
  pendingSearch,
  setPendingSearch,
  pagePending,
  setPagePending,
  totalPendingPages,
  pendingPaginated,
  pendingGrade,
  setPendingGrade,
}: any) => {
  const queryClient = useQueryClient();
  const { mutate: approveEnrollmentMutation, isPending } = useMutation({
    mutationFn: (id: string) => approveEnrollment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schoolstudents"] });
      toast.success("Enrollment approved successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to approve enrollment");
    },
  });

  const handleApprove = (id: string) => {
    approveEnrollmentMutation(id);
  };
  return (
    <div className="space-y-4 w-full">
      <h2 className="text-lg font-semibold text-red-600">
        Pending / Not Enrolled
      </h2>

      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <InputGroup className="w-80">
            <InputGroupInput
              placeholder="Search name or ID..."
              value={pendingSearch}
              onChange={(e) => {
                setPendingSearch(e.target.value);
                setPagePending(1);
              }}
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>

          <Select
            value={pendingGrade}
            onValueChange={(val) => {
              setPendingGrade(val);
              setPagePending(1);
            }}
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Pre-school">Pre-school</SelectItem>
              <SelectItem value="Grade 1">Grade 1</SelectItem>
              <SelectItem value="Grade 2">Grade 2</SelectItem>
              <SelectItem value="Grade 3">Grade 3</SelectItem>
              <SelectItem value="Grade 4">Grade 4</SelectItem>
              <SelectItem value="Grade 5">Grade 5</SelectItem>
              <SelectItem value="Grade 6">Grade 6</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button
            disabled={pagePending === 1}
            onClick={() => setPagePending((p: any) => p - 1)}
          >
            Prev
          </Button>
          <span>
            {pagePending} / {totalPendingPages || 1}
          </span>
          <Button
            disabled={pagePending === totalPendingPages}
            onClick={() => setPagePending((p: any) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden w-full">
        <Table className="w-full">
          <TableHeader className="bg-muted w-full">
            <TableRow>
              <TableHead className="font-semibold">ID</TableHead>
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Grade</TableHead>
              <TableHead className="font-semibold">Rank</TableHead>
              <TableHead className="font-semibold">Level</TableHead>
              <TableHead className="font-semibold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="w-full">
            {pendingPaginated.map((s: any) => (
              <TableRow className="w-full " key={s._id}>
                <TableCell>-</TableCell>
                <TableCell>
                  {s?.studentId?.firstname} {s?.studentId?.lastname}
                </TableCell>
                <TableCell>{s.gradeLevel}</TableCell>
                <TableCell>{getRankByLevel(s?.studentId?.level)}</TableCell>
                <TableCell>{s?.studentId?.level || "-"}</TableCell>
                <TableCell>
                  <Button size="sm" onClick={() => handleApprove(s._id)}>
                    {isPending ? "Approving..." : "Approve"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PendingStudentsEnrollment;
