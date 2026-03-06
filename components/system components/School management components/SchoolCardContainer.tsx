import Link from "next/link";
import Image from "next/image";
type SchoolContainerProps = {
  schoolLogo: string;
  schoolname: string;
  schoolid: string;
};

const SchoolCardContainer = ({
  schoolLogo,
  schoolname,
  schoolid,
}: SchoolContainerProps) => {
  return (
    <Link href={"/dashboard/school_management/1"}>
      <div className="flex items-center gap-3 p-2 rounded shadow shadow-black/30 border border-black/10">
        <Image src={schoolLogo} alt="school logo" width={70} height={70} />
        <div className="flex flex-col">
          <h2 className="text-lg font-bold">{schoolname}</h2>
          <h3 className="text-sm">{schoolid}</h3>
        </div>
      </div>
    </Link>
  );
};

export default SchoolCardContainer;
