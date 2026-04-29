import SchoolManagementDetailsContainer from "@/components/system components/admin/School management components/SchoolManagementDetailsContainer";
type Props = Promise<{ id: string }>;
const SchoolManagementDetails = async ({ params }: { params: Props }) => {
  const { id } = await params;
  return (
    <div className="md:p-2 p-3 w-full">
      <SchoolManagementDetailsContainer id={id} />
    </div>
  );
};

export default SchoolManagementDetails;
