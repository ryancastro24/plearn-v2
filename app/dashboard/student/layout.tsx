import StudentDesktopSideNavigation from "@/components/system components/student/student dashboard component/StudentSideNavigation";
const StudentRootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <StudentDesktopSideNavigation />
      <main className="p-4 w-full">{children}</main>
    </div>
  );
};

export default StudentRootLayout;
