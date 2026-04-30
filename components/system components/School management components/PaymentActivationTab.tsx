import { Button } from "@/components/ui/button";
const PaymentActivationTab = () => {
  return (
    <div className="w-full  md:col-span-2 gap-5 flex justify-between flex-col  shadow shadow-black/30 border border-black/10 rounded p-3">
      <h2 className="text-sm">Yearly Subscription</h2>
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-3xl">₱50,000</h3>
        <h3>Premium Model</h3>
      </div>

      <Button className="w-full bg-[#02EB1D] hover:bg-[#00d919]  text-white">
        Active
      </Button>
    </div>
  );
};

export default PaymentActivationTab;
