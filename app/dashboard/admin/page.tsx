import RegisteredKids from "@/components/system components/admin/admin dashboard components/RegisteredKids";
import MerchandiseSold from "@/components/system components/admin/admin dashboard components/MerchandiseSold";
import InGameSoldSkins from "@/components/system components/admin/admin dashboard components/InGameSoldSkins";
import TotalSales from "@/components/system components/admin/admin dashboard components/TotalSales";
import BarChartUpper from "@/components/system components/admin/admin dashboard components/BarchartUpper";
import PieChartLower from "@/components/system components/admin/admin dashboard components/PieChartLower";
import PieChartUpper from "@/components/system components/admin/admin dashboard components/PieChartUpper";
import LineGraphLower from "@/components/system components/admin/admin dashboard components/LineGraphLower";

const AdminDashboard = () => {
  return (
    <div className="p-2 md:p-6 w-full flex flex-col gap-5">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <RegisteredKids registeredKidsCount={2000} />
        <MerchandiseSold merchandiseSold={4060} />
        <InGameSoldSkins inGameSkinSoldCount={5752} />
        <TotalSales totalSalesCount={4560000} />
      </div>

      <div className="grid grid-cols-1  md:grid-cols-5 w-full h-full  gap-5">
        <div className="w-full md:col-span-3">
          <BarChartUpper />
        </div>

        <div className="w-full md:col-span-2">
          <PieChartUpper />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 w-full h-full gap-5">
        <div className="w-full md:col-span-3">
          <LineGraphLower />
        </div>
        <div className="w-full md:col-span-2">
          <PieChartUpper />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
