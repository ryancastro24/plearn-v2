import Link from "next/link";
import Image from "next/image";
type SchoolContainerProps = {
  schoolLogo: string;
  schoolname: string;
  schoolid: string;
  id: string;
};

const SchoolEnrollmentCard = ({
  schoolLogo,
  schoolname,
  schoolid,
  id,
}: SchoolContainerProps) => {
  return (
    <Link href={`/dashboard/school_management/schoolenrollment/${id}`}>
      <div className="  flex flex-col items-center hover:shadow-lg gap-3 p-2 rounded shadow shadow-black/30 border border-black/10">
        <Image src={schoolLogo} alt="school logo" width={200} height={200} />
        <div className="flex flex-col min-w-0">
          <h2 className=" text-center text-sm">{schoolname}</h2>
          <h3 className="text-center">{schoolid}</h3>
        </div>
      </div>
    </Link>
  );
};

export default SchoolEnrollmentCard;
