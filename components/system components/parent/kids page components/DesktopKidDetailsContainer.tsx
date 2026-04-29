import DesktopCardKidDetails from "./DesktopCardKidDetails";

type Kid = {
  _id: string;
  profileImage: string;
  firstname: string;
  lastname: string;
  level: number;
  rank: string;
  clanId: string;
  points: number;
};
type KidsProps = {
  kids: Kid[]; // array of kid objects
};

const DesktopKidDetailsContainer = ({ kids = [] }: KidsProps) => {
  return (
    <div className="w-full flex flex-col gap-5">
      {kids.map((kid) => (
        <DesktopCardKidDetails
          key={kid._id}
          profileImage={kid.profileImage}
          name={kid.firstname + " " + kid.lastname}
          level={kid.level}
          clanRank={kid.clanId}
          kid_id={kid._id}
          points={kid.points}
        />
      ))}
    </div>
  );
};

export default DesktopKidDetailsContainer;
