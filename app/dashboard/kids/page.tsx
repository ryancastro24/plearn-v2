import MobileDropDownOption from "@/components/system components/kids page components/MobileDropDownOption";
import DesktopKidDetailsContainer from "@/components/system components/kids page components/DesktopKidDetailsContainer";
import AddNewKidsModal from "@/components/system components/kids page components/AddNewKidsModal";
const KidsPage = () => {
  return (
    <div className="flex flex-col gap-2 p-2 w-full relative">
      <h1>Manage your kids</h1>

      <div className="[@media(min-width:650px)]:hidden ">
        <MobileDropDownOption />
      </div>

      <div className="[@media(min-width:650px)]:block hidden">
        <DesktopKidDetailsContainer />
      </div>

      <div className="absolute bottom-5 right-5">
        <AddNewKidsModal />
      </div>
    </div>
  );
};

export default KidsPage;
