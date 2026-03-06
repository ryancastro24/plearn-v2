import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import AddNewSchoolDialog from "@/components/system components/School management components/AddNewSchoolDialog";
import { Search } from "lucide-react";

import SchoolCardContainer from "@/components/system components/School management components/SchoolCardContainer";
const SchoolManagement = () => {
  return (
    <div className="w-full p-5 flex flex-col gap-4 ">
      <div className="flex items-center gap-2">
        <InputGroup className="w-115">
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>

        <AddNewSchoolDialog />
      </div>

      <div className="grid md:grid-cols-4 ">
        <SchoolCardContainer
          schoolLogo="/learninghub page assets/sample school logo.png"
          schoolname="Future Kids Inc."
          schoolid="9123124124"
        />
      </div>
    </div>
  );
};

export default SchoolManagement;
