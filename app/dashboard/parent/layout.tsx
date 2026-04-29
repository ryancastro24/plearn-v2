import DesktopSideNavigation from "@/components/system components/parent/dasboard components/DesktopSideNavigation";
const ParentRootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <DesktopSideNavigation />
      <main className="p-4 w-full">{children}</main>
    </div>
  );
};
export default ParentRootLayout;
