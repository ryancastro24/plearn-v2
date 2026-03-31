import Image from "next/image";
import { Button } from "@/components/ui/button";
import { RiEdit2Fill } from "react-icons/ri";
import Link from "next/link";
type ClassCardProps = {
  id: number;
  title: string;
  subject: string;
  schedule: string;
  time: string;
  imageBackground: string;
};

const ClassCard = ({
  id,
  title,
  subject,
  schedule,
  time,
  imageBackground,
}: ClassCardProps) => {
  return (
    <div className="relative w-full h-70 rounded-2xl overflow-hidden shadow-md">
      {/* Background Image */}
      <Image
        src={imageBackground}
        alt="class background image"
        fill
        className="object-cover"
      />

      {/* Dark Overlay (bottom gradient style) */}
      <div className="absolute bottom-0 h-30 w-full bg-black/70" />

      {/* Bottom Content */}
      <div className="absolute bottom-0 w-full p-3 text-white">
        <h2 className="text-sm font-semibold">{title}</h2>
        <h3 className="text-xs opacity-90">{subject}</h3>
        <h3 className="text-[11px] opacity-80 mb-2">
          {schedule} | {time}
        </h3>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <Link href={`/class/${imageBackground.split("/")[2]}`}>
            <Button className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1 h-auto">
              Start class
            </Button>
          </Link>

          <Button variant="secondary" className="text-xs px-3 py-1 h-auto">
            Postpone class
          </Button>

          <Button
            size="icon"
            className="bg-blue-600 hover:bg-blue-700 text-white h-8 w-8"
          >
            <RiEdit2Fill size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
