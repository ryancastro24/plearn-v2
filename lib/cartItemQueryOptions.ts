import { queryOptions } from "@tanstack/react-query";
import { getAllUserCartItems } from "@/backend/cartItem";

export const getUserCartItems = (id: string) => {
  return queryOptions({
    queryKey: ["usercartitems", id],
    queryFn: () => getAllUserCartItems(id),
  });
};
