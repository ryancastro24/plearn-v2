import StoreItems from "./StoreItems";
const storeItems = [
  {
    id: 1,
    itemName: "Item 1",
    itemPoints: 500,
    itemDescription: "Description for Item 1",
    itemImage: "/store page assets/store image 1.png",
  },

  {
    id: 2,
    itemName: "Item 2",
    itemPoints: 500,
    itemDescription: "Description for Item 2",
    itemImage: "/store page assets/store image 2.png",
  },

  {
    id: 3,
    itemName: "Item 3",
    itemPoints: 500,
    itemDescription: "Description for Item 3",
    itemImage: "/store page assets/store image 3.png",
  },

  {
    id: 4,
    itemName: "Item 4",
    itemPoints: 500,
    itemDescription:
      "A silver helmet with tiny bunny-ear crests and icy blue highlights",
    itemImage: "/store page assets/store image 4.png",
  },

  {
    id: 5,
    itemName: "Item 5 ",
    itemPoints: 500,
    itemDescription: "Description for Item 5",
    itemImage: "/store page assets/store image 5.png",
  },

  {
    id: 6,
    itemName: "Item 6",
    itemPoints: 500,
    itemDescription: "Description for Item 6",
    itemImage: "/store page assets/store image 6.png",
  },

  {
    id: 7,
    itemName: "Item 7",
    itemPoints: 500,
    itemDescription: "Description for Item 7",
    itemImage: "/store page assets/store image 7.png",
  },

  {
    id: 8,
    itemName: "Item 8",
    itemPoints: 500,
    itemDescription: "Description for Item 8",
    itemImage: "/store page assets/store image 8.png",
  },

  {
    id: 9,
    itemName: "Item 9",
    itemPoints: 500,
    itemDescription: "Description for Item 9",
    itemImage: "/store page assets/store image 9.png",
  },

  {
    id: 10,
    itemName: "Item 10",
    itemPoints: 500,
    itemDescription: "Description for Item 10",
    itemImage: "/store page assets/store image 10.png",
  },

  {
    id: 11,
    itemName: "Item 11",
    itemPoints: 500,
    itemDescription: "Description for Item 11",
    itemImage: "/store page assets/store image 11.png",
  },

  {
    id: 12,
    itemName: "Item 12",
    itemPoints: 500,
    itemDescription: "Description for Item 12",
    itemImage: "/store page assets/store image 12.png",
  },
];
const StoreItemsContainer = () => {
  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-2 justify-items-center  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 w-full">
        {storeItems.map((item) => (
          <StoreItems key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default StoreItemsContainer;
