import ForumSingleCommentConvo from "@/components/system components/parent/forum components/ForumSingleCommentConvo";
const ForumSingleComment = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <div>
      <h1>forum id {id}</h1>
      <ForumSingleCommentConvo />
    </div>
  );
};

export default ForumSingleComment;
