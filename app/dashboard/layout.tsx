import MobileSideNavigation from "@/components/system components/dasboard components/MobileSideNavigation";
import DesktopSideNavigation from "@/components/system components/dasboard components/DesktopSideNavigation";
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col  [@media(min-width:920px)]:flex-row min-h-screen">
      {/* Mobile Drawer */}

      <MobileSideNavigation />

      {/* Desktop navigation */}

      <DesktopSideNavigation />

      {children}
    </div>
  );
};

export default DashboardLayout;
