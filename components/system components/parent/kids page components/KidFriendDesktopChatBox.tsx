import Image from "next/image";
type KidFriendDesktopChatBoxProps = {
  profileImage: string | null;
  name: string;
  level: number;
  rank: string;
};

const KidFriendDesktopChatBox = ({
  profileImage,
  name,
  level,
  rank,
}: KidFriendDesktopChatBoxProps) => {
  return (
    <div className="w-full border h-full border-black/10 shadow shadow-black/30">
      <div className="w-full p-2 h-14 shadow-md shadow-black/10 flex items-center gap-3">
        <div className="w-14 h-14 rounded-full relative overflow-hidden">
          <Image
            src={profileImage || "/kids page assets/default-  .png"}
            alt={name}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <h2 className="text-sm">{name}</h2>
          <span className="text-xs">
            <strong>Level {level}</strong> - {rank}
          </span>
        </div>
      </div>
    </div>
  );
};

export default KidFriendDesktopChatBox;
