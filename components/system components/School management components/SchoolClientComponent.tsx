"use client";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useQuery } from "@tanstack/react-query";
import AddNewSchoolDialog from "@/components/system components/admin/School management components/AddNewSchoolDialog";
import { Search } from "lucide-react";
import SchoolCardContainer from "@/components/system components/admin/School management components/SchoolCardContainer";
import { getAllSchoolsQuery } from "@/lib/schoolQueryOptions";
const SchoolClientComponent = () => {
  const { data: schools } = useQuery(getAllSchoolsQuery());
  return (
    <div className="w-full p-4 flex flex-col gap-4 ">
      <div className="flex items-center gap-2">
        <InputGroup className="w-115">
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>

        <AddNewSchoolDialog />
      </div>

      <div className="grid md:grid-cols-4 gap-3 ">
        {schools?.map((val: any) => (
          <SchoolCardContainer
            key={val._id}
            schoolLogo={val.logo}
            schoolname={val.name}
            schoolid={val.schoolId}
            id={val._id}
          />
        ))}
      </div>
    </div>
  );
};

export default SchoolClientComponent;
