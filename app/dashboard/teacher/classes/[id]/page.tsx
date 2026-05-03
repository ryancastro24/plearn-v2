import TeacherSectionClientComponent from "@/components/system components/teacher/classes components/TeacherSectionClientComponent";
type ParamsProps = Promise<{
  id: string;
}>;
const SectionDetails = async ({ params }: { params: ParamsProps }) => {
  const { id } = await params;
  return <TeacherSectionClientComponent sectionId={id} />;
};

export default SectionDetails;
