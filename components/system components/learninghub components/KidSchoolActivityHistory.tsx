import KidSchoolActivity from "./KidSchoolActivity";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import { Button } from "@/components/ui/button";
const KidSchoolActivityHistory = () => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <h2>Activity History</h2>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="xs">
            <SlArrowLeft />
          </Button>

          <p className=" text-sm">1</p>
          <Button variant="outline" size="xs">
            <SlArrowRight />
          </Button>
        </div>
      </div>

      <div className="mt-2">
        <KidSchoolActivity
          title="Cleaning the House"
          points={200}
          status="completed"
        />

        <KidSchoolActivity
          title="Reading story book"
          points={200}
          status="completed"
        />
      </div>
    </div>
  );
};

export default KidSchoolActivityHistory;
