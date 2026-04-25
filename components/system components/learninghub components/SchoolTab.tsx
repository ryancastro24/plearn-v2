import Link from "next/link";
type SchoolTabProps = {
  logo: string;
  name: string;
  id: string;
  schoolId: string;
};

import Image from "next/image";
const SchoolTab = ({ logo, name, id, schoolId }: SchoolTabProps) => {
  return (
    <Link
      href={`/dashboard/parent/learninghub/schoolhub/${id}`}
      className="w-full"
    >
      <div className="flex w-full md:w-auto items-center gap-2 shadow shadow-black/10 border border-black/10 rounded-lg p-2 ">
        <Image src={logo} alt={name} width={80} height={80} />
        <div className="flex flex-col gap-2">
          <h3 className="text-lg">{name}</h3>
          <p className="text-sm">ID#: {schoolId}</p>
        </div>
      </div>
    </Link>
  );
};

export default SchoolTab;
