import Image from "next/image";
import SchoolHubContainer from "@/components/system components/learninghub components/SchoolHubContainer";
const SchoolHub = async ({
  params,
}: {
  params: Promise<{ schoolid: string }>;
}) => {
  const { schoolid } = await params;
  return (
    <div className="flex flex-col gap-5 p-4 w-full  ">
      <div className="flex items-center gap-4 mb-6">
        <Image
          src={"/learninghub page assets/sample school logo.png"}
          alt="sample school l  ogo"
          width={60}
          height={60}
        />

        <div className="flex flex-col">
          <h2 className="text-lg font-bold">Future Kids Inc.</h2>
          <h3 className="text-sm">info@futurekids.com</h3>
        </div>
      </div>

      <SchoolHubContainer />
    </div>
  );
};

export default SchoolHub;
