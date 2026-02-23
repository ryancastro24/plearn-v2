import DesktopCardKidDetails from "./DesktopCardKidDetails";
const DesktopKidDetailsContainer = () => {
  return (
    <div className="w-full flex flex-col gap-5">
      <DesktopCardKidDetails
        profileImage="/dashboard assets/boy.jpg"
        name="MARK TWAIN"
        level={24}
        rank="Apprentice"
        clanRank="1st division captain"
      />

      <DesktopCardKidDetails
        profileImage="/dashboard assets/girl.avif"
        name="LIZA TWAIN"
        level={14}
        rank="Novice"
        clanRank="Member"
      />
    </div>
  );
};

export default DesktopKidDetailsContainer;
