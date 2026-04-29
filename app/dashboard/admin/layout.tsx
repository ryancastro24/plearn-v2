import AdminDesktopSideNavigation from "@/components/system components/admin/admin dashboard components/AdminDesktopSideNavigation";
const AdminRootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <AdminDesktopSideNavigation />
      <main className="p-4 w-full">{children}</main>
    </div>
  );
};

export default AdminRootLayout;
