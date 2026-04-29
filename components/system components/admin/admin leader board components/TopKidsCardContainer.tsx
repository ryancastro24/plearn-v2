"use client";
import Top3KidsCard from "./Top3KidsCard";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import Image from "next/image";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CiMenuKebab } from "react-icons/ci";
import { students } from "@/lib/studentSampleData";
const Top3KidsCardContainer = () => {
  const sorted = [...students].sort((a, b) => b.points - a.points);

  return (
    <div className="flex flex-col gap-5">
      <div className="inline-flex items-center gap-2">
        <InputGroup>
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>

        <Select>
          <SelectTrigger className="w-45">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="light">Overlall</SelectItem>
              <SelectItem value="dark">Sports</SelectItem>
              <SelectItem value="system">English</SelectItem>
              <SelectItem value="system">Math</SelectItem>
              <SelectItem value="system">Science</SelectItem>
              <SelectItem value="system">History</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2">
        <h2>Current week top 3</h2>
        <div className=" flex items-center justify-between gap-4">
          {sorted.slice(0, 3).map((val, index) => (
            <Top3KidsCard key={val.id} {...val} rank={index} />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-5">
        <h2>Current week top 20</h2>

        <Table>
          <TableCaption>Top 20 outstading kids</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Place</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Level & Rank</TableHead>
              <TableHead className="">Clan</TableHead>
              <TableHead className="">Points</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.slice(3).map((val, index) => (
              <TableRow key={val.id}>
                <TableCell className="font-medium text-xs">
                  {index + 4}
                </TableCell>
                <TableCell className="text-xs">
                  <div className="flex  items-center h-full gap-2">
                    <Image
                      src={"/dashboard assets/boy.jpg"}
                      alt="kid profile"
                      width={30}
                      height={30}
                      className="rounded-full"
                    />

                    <span>{val.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-xs">
                  Level {val.level} | {val.rankLabel}
                </TableCell>
                <TableCell className=" text-xs">{val.clan}</TableCell>
                <TableCell className=" text-xs">{val.points}</TableCell>
                <TableCell className="text-right  text-xs">
                  <Button size={"icon"} variant={"secondary"}>
                    <CiMenuKebab />
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

export default Top3KidsCardContainer;
