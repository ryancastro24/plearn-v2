import SchoolManagementDetailsContainer from "@/components/system components/School management components/SchoolManagementDetailsContainer";
type Props = Promise<{ id: string }>;
const SchoolManagementDetails = async ({ params }: { params: Props }) => {
  const { id } = await params;
  return (
    <div className="md:p-5 p-3 w-full">
      <SchoolManagementDetailsContainer />
    </div>
  );
};

export default SchoolManagementDetails;
