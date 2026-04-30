import LinechartSchoolDetails from "./LinechartSchoolDetails";
import SchoolDetailsPieChart1 from "./SchoolDetailsPieChart1";
import SchoolDetailsPieChart2 from "./SchoolDetailsPieChart2";
import SchoolDetailsPieChart3 from "./SchoolDetailsPieChart3";
const SchoolAnalytics = () => {
  return (
    <div className="flex flex-col gap-4 mt-2">
      <div>
        <LinechartSchoolDetails />
      </div>
      <div className="grid md:grid-cols-3  gap-6">
        <SchoolDetailsPieChart1 />
        <SchoolDetailsPieChart2 />
        <SchoolDetailsPieChart3 />
      </div>
    </div>
  );
};

export default SchoolAnalytics;
