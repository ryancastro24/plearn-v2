import Image from "next/image";
import ClassAttendanceModal from "@/components/system components/teacher dashboard components/ClassAttendanceModal";
type ClassDetailsPageProps = Promise<{
  id: string;
}>;
const ClassDetailsPage = async ({
  params,
}: {
  params: ClassDetailsPageProps;
}) => {
  const { id } = await params;
  return (
    <div className="relative w-full h-100vh">
      <h2>hello</h2>
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

export default ClassDetailsPage;
