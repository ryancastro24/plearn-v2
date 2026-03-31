import TopKidsCardContainer from "@/components/system components/admin leader board components/TopKidsCardContainer";
import TopClanContainer from "@/components/system components/admin leader board components/TopClanContainer";

const AdminLeaderBoard = () => {
  return (
    <div className="w-full p-5">
      <div className="grid grid-cols-6 gap-5 w-full">
        {/* LEFT SIDE */}
        <div className="col-span-4 w-full">
          <TopKidsCardContainer />
        </div>

        {/* RIGHT SIDE (STICKY) */}
        <div className="col-span-2 w-full">
          <div className="sticky top-5">
            <div className="border flex flex-col gap-2 border-black/10 p-4 shadow shadow-black/30 w-full rounded-lg bg-white">
              <h2 className="text-sm font-semibold">Top performing clans</h2>

              <TopClanContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLeaderBoard;
