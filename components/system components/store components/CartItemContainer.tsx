import React from "react";
import CartItem from "./CartItem";
const CartItemContainer = ({ cartItems }: any) => {
  console.log("cart items: ", cartItems);
  return (
    <div className="w-full grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2  gap-4 p-4 overflow-scroll">
      {" "}
      {cartItems?.map((item: any) => (
        <CartItem key={item._id} item={item} />
      ))}
    </div>
  );
};

export default CartItemContainer;
