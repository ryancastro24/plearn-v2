import Link from "next/link";
type TopicLinksProps = {
  title: string;
  description: string;
  id: string;
  topicid: string;
  index: number;
};
const TopicLinksContainer = ({
  title,
  description,
  topicid,
  id,
  index,
}: TopicLinksProps) => {
  return (
    <Link href={`/dashboard/admin_learninghub/${id}/topic_creation/${topicid}`}>
      <div className="group flex items-center gap-2 hover:text-[#ff5b5b]">
        <div className="bg-gray-300 w-10 h-10 rounded-full flex items-center justify-center group-hover:bg-[#ff5b5b] transition-colors">
          <h2 className="font-bold group-hover:text-white">{index + 1}</h2>
        </div>

        <div className="flex flex-col">
          <h2 className="font-bold">{title}</h2>
          <h3 className="text-xs">{description}</h3>
        </div>
      </div>
    </Link>
  );
};

export default TopicLinksContainer;
