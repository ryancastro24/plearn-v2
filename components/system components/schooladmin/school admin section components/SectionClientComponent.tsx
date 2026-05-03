"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSectionsBySchoolQuery } from "@/lib/sectionsQueryOptions";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import AddNewSectionModal from "./AddNewSectionModal";
import { Search } from "lucide-react";

const SectionClientComponent = () => {
  const [search, setSearch] = useState("");

  const { data, isLoading, isFetching } = useQuery(getSectionsBySchoolQuery());

  const sections = data?.data || [];

  // 🔍 simple search filter
  const filteredSections = sections.filter((sec: any) => {
    const text = `${sec.title} ${sec.subject} ${sec.grade}`.toLowerCase();
    return text.includes(search.toLowerCase());
  });

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Available Sections</h2>

      {/* TOP BAR */}
      <div className="flex items-center gap-2">
        <InputGroup className="w-125">
          <InputGroupInput
            placeholder="Search sections..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>

        <AddNewSectionModal />
      </div>

      {/* CONTENT */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* LOADING */}
        {isLoading || isFetching ? (
          <p className="text-sm text-gray-500">Loading sections...</p>
        ) : filteredSections.length === 0 ? (
          <p className="text-sm text-gray-500">No sections found</p>
        ) : (
          filteredSections.map((sec: any) => (
            <div
              key={sec._id}
              className="border rounded-xl p-4 bg-white shadow-sm space-y-2"
            >
              {/* TITLE */}
              <h3 className="font-semibold text-base">{sec.title}</h3>

              {/* META */}
              <div className="text-sm text-gray-600">
                <p>Grade: {sec.grade}</p>
                <p>Subject: {sec.subject}</p>
              </div>

              {/* TEACHER */}
              <div className="text-sm">
                <span className="font-medium">Teacher: </span>
                {sec.teacherId?.firstname} {sec.teacherId?.lastname}
              </div>

              {/* SCHEDULE */}
              <div className="text-xs text-gray-500">
                <p>
                  Time: {sec.schedule?.startTime} - {sec.schedule?.endTime}
                </p>
                <p>Days: {sec.workingDays?.join(", ")}</p>
              </div>

              {/* STUDENT COUNT */}
              <div className="text-xs text-gray-500">
                Students: {sec.students?.length || 0}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SectionClientComponent;
