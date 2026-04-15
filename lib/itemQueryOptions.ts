import { queryOptions } from "@tanstack/react-query";
import { getAllItems, getAllOnSaleItems } from "@/backend/items";

export const getAllStoreItems = () => {
  return queryOptions({
    queryKey: ["items"],
    queryFn: getAllItems,
  });
};

export const getAllStoreOnSaleItems = () => {
  return queryOptions({
    queryKey: ["onsaleitems"],
    queryFn: getAllOnSaleItems,
  });
};
