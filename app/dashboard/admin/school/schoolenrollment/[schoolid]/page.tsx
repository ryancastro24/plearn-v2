import SchoolEnrollmentClientComponent from "@/components/system components/learninghub components/SchoolEnrollmentClientComponent";
type Props = Promise<{ schoolid: string }>;
const SchoolEnrollMent = async ({ params }: { params: Props }) => {
  const { schoolid } = await params;

  return <SchoolEnrollmentClientComponent id={schoolid} />;
};

export default SchoolEnrollMent;
