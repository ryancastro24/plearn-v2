import Image from "next/image";
import ClassAttendanceModal from "@/components/system components/teacher/teacher dashboard components/ClassAttendanceModal";
type ClassDetailsProps = Promise<{
  id: string;
}>;
const ClassDetails = async ({ params }: { params: ClassDetailsProps }) => {
  const { id } = await params;
  return (
    <div className="relative w-full h-screen">
      <Image
        src={`/learninghub page assets/${id}`}
        className="inset-0 absolute z-0"
        fill
        alt="class bg image"
      />
      <ClassAttendanceModal />
    </div>
  );
};

export default ClassDetails;
