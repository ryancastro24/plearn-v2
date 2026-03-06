import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { LuPlus } from "react-icons/lu";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CiMenuKebab } from "react-icons/ci";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const SchoolStudentTableData = () => {
  return (
    <div className="shadow shadow-black/30 border border-black/10 rounded p-3 w-full flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="text-sm">Enrolled Students</h2>

        <div className="flex items-center gap-2">
          <InputGroup className="w-34">
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>

          <Button
            size={"icon"}
            className={"rounded-full bg-[#507FFF] text-white"}
          >
            <LuPlus />
          </Button>
        </div>
      </div>

      <Table>
        <TableCaption>Available enrolled students</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-25">School Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Grade Level</TableHead>
            <TableHead className="text-right">Points</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">12345</TableCell>
            <TableCell>Juan Dela Cruz</TableCell>
            <TableCell>Grade III</TableCell>
            <TableCell>10,250</TableCell>
            <TableCell className="flex items-center justify-center">
              <CiMenuKebab />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default SchoolStudentTableData;
