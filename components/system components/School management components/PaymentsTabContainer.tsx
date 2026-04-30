import PaymentTabTableData from "./PaymentTabTableData";
import PaymentActivationTab from "./PaymentActivationTab";
import OtherSubscriptionContainer from "./OtherSubscriptionContainer";
const PaymentsTabContainer = () => {
  return (
    <div className="w-full mt-5 flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-5 w-full md:max-h-75 ">
        <PaymentTabTableData />
        <PaymentActivationTab />
      </div>

      <div>
        <OtherSubscriptionContainer />
      </div>
    </div>
  );
};

export default PaymentsTabContainer;
