import StoreItems from "./StoreItems";

const StoreItemsContainer = ({ allItems }: any) => {
  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-2 justify-items-center  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 w-full">
        {allItems?.map((item: any) => (
          <StoreItems key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default StoreItemsContainer;
