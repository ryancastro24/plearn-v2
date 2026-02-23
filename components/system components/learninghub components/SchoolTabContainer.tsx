import SchoolTab from "./SchoolTab";

const SchoolTabContainer = () => {
  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <SchoolTab
        logo={"/learninghub page assets/sample school logo.png"}
        name="Future Kids Inc."
        email="info@futurekids.com"
      />
    </div>
  );
};

export default SchoolTabContainer;
