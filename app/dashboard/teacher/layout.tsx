import TeacherDesktopSideNavigation from "@/components/system components/teacher/teacher dashboard components/TeacherDesktopSideNavigation";
const TeacherRootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <TeacherDesktopSideNavigation />
      <main className="p-4 w-full">{children}</main>
    </div>
  );
};
export default TeacherRootLayout;
