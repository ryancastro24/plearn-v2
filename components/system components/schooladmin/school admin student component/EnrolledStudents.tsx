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
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { getRankByLevel } from "@/lib/rankLabels";
const EnrolledStudents = ({
  enrolledSearch,
  setEnrolledSearch,
  pageAll,
  setPageAll,
  totalAllPages,
  enrolledPaginated,
  enrolledGrade,
  setEnrolledGrade,
}: any) => {
  return (
    <div className="space-y-4 w-full ">
      <h2 className="text-lg font-semibold text-green-600 mt-5">
        Enrolled Students
      </h2>

      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <InputGroup className="w-80">
            <InputGroupInput
              placeholder="Search name or ID..."
              value={enrolledSearch}
              onChange={(e) => {
                setEnrolledSearch(e.target.value);
                setPageAll(1);
              }}
            />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>

          <Select
            value={enrolledGrade}
            onValueChange={(val) => {
              setEnrolledGrade(val);
              setPageAll(1);
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
            disabled={pageAll === 1}
            onClick={() => setPageAll((p: any) => p - 1)}
          >
            Prev
          </Button>
          <span>
            {pageAll} / {totalAllPages || 1}
          </span>
          <Button
            disabled={pageAll === totalAllPages}
            onClick={() => setPageAll((p: any) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden w-full">
        <Table className="w-full">
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead className="font-semibold">ID</TableHead>
              <TableHead className="font-semibold">Name</TableHead>
              <TableHead className="font-semibold">Grade</TableHead>
              <TableHead className="font-semibold">Rank</TableHead>
              <TableHead className="font-semibold">Level</TableHead>
              <TableHead className="font-semibold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enrolledPaginated.map((s: any) => (
              <TableRow key={s._id}>
                <TableCell>{s.studentSchoolIdNumber}</TableCell>
                <TableCell>
                  {s?.studentId?.firstname} {s?.studentId?.lastname}
                </TableCell>
                <TableCell>{s.gradeLevel}</TableCell>
                <TableCell>{getRankByLevel(s?.studentId?.level)}</TableCell>
                <TableCell>{s?.studentId?.level || "-"}</TableCell>
                <TableCell>
                  <Button size="sm" variant="secondary">
                    View
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

export default EnrolledStudents;
