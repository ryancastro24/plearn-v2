import ForumAnnouncementContainer from "@/components/system components/parent/forum components/ForumAnnouncementContainer";
import ForumCommentsContainer from "@/components/system components/parent/forum components/ForumCommentsContainer";
import AddNewCommentModal from "@/components/system components/parent/forum components/AddNewCommentModal";
const TasksPage = () => {
  return (
    <div className="flex flex-col gap-3 p-2 w-full relative">
      <ForumAnnouncementContainer />

      <ForumCommentsContainer />

      <div className="fixed bottom-8 right-8">
        <AddNewCommentModal />
      </div>
    </div>
  );
};

export default TasksPage;
