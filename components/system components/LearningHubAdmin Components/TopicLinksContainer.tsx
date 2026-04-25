"use client";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PiWarningFill } from "react-icons/pi";

type TopicLinksProps = {
  title: string;
  description: string;
  id: string;
  topicid: string;
  index: number;
  countslide: number;
};

const TopicLinksContainer = ({
  title,
  description,
  topicid,
  id,
  index,
  countslide,
}: TopicLinksProps) => {
  return (
    <Link href={`/dashboard/admin/learninghub/${id}/topic_creation/${topicid}`}>
      <div className="group h-auto min-h-fit relative flex items-center gap-2 hover:text-[#ff5b5b] border border-black/10 shadow shadow-black/15 p-3 rounded-lg">
        <div className="bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center group-hover:bg-[#ff5b5b] transition-colors">
          <h2 className=" group-hover:text-white">{index + 1}</h2>
        </div>

        <div className="flex flex-col">
          <h2 className="font-bold">{title}</h2>
          <h3 className="text-xs">{description}</h3>
        </div>

        {countslide == 0 && (
          <div className="absolute top-[-4] right-[-4]">
            <Tooltip>
              <TooltipTrigger>
                <div className="relative inline-flex">
                  {/* Ping animation (background) */}
                  <PiWarningFill className="absolute text-orange-400 text-lg animate-ping opacity-75" />

                  {/* Static icon (always visible) */}
                  <PiWarningFill className="relative text-orange-500 text-lg" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>No slides available in this topic</p>
              </TooltipContent>
            </Tooltip>
          </div>
        )}
      </div>
    </Link>
  );
};

export default TopicLinksContainer;
