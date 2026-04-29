import SchoolHubClientComponent from "@/components/system components/parent/learninghub components/SchoolHubClientComponent";
const SchoolHub = async ({
  params,
}: {
  params: Promise<{ schoolid: string }>;
}) => {
  const { schoolid } = await params;
  return <SchoolHubClientComponent schoolid={schoolid} />;
};

export default SchoolHub;
