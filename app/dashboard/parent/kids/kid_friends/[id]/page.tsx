import KidFriendSection from "@/components/system components/parent/kids page components/KidFriendSection";
const KidsFriends = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return (
    <div className="w-full h-full">
      <KidFriendSection />
    </div>
  );
};

export default KidsFriends;
