import SchoolEmployeesTableData from "./SchoolEmployeesTableData";
import SchoolStudentTableData from "./SchoolStudentTableData";
import SchoolActivityLogs from "./SchoolActivityLogs";
const ManageSchoolUsersTabContainer = () => {
  return (
    <div className="flex flex-col gap-4 mt-2">
      <div className="grid md:grid-cols-2 gap-5">
        <SchoolEmployeesTableData />
        <SchoolStudentTableData />
      </div>

      <div>
        <SchoolActivityLogs />
      </div>
    </div>
  );
};

export default ManageSchoolUsersTabContainer;
