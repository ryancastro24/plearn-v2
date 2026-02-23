import React from "react";
import CartItem from "./CartItem";
const CartItemContainer = () => {
  return (
    <div className="w-full grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2  gap-4 p-4 overflow-scroll">
      {" "}
      <CartItem /> <CartItem /> <CartItem /> <CartItem /> <CartItem />{" "}
      <CartItem />{" "}
    </div>
  );
};

export default CartItemContainer;
