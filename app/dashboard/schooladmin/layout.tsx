import SchoolAdminDesktopSideNavigation from "@/components/system components/school admin components/SchoolAdminDesktopNavigation";
const SchoolAdminRootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <SchoolAdminDesktopSideNavigation />
      <main className="flex-1 p-4">{children}</main>
    </div>
  );
};

export default SchoolAdminRootLayout;
