import ClassInnerDetailsContainer from "@/components/system components/teacher/teacher dashboard components/ClassInnerDetailsContainer";

type ClassInnerDetailsProps = Promise<{
  class_id: string;
}>;
const ClassInnerDetails = async ({
  params,
}: {
  params: ClassInnerDetailsProps;
}) => {
  const { class_id } = await params;
  return (
    <div className=" w-full">
      <ClassInnerDetailsContainer />
    </div>
  );
};

export default ClassInnerDetails;
