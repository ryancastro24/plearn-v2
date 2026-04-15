type CartItemData = {
  itemId: string;
  userId: string;
};
// add new cart item
export const addNewCartItem = async (cartItem: CartItemData) => {
  const response = await fetch("http://localhost:5000/api/cartItems", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(cartItem),
  });

  // ✅ parse response body FIRST
  const data = await response.json();

  if (!response.ok) {
    // ✅ create custom error and attach backend data
    const err: any = new Error("Request failed");

    throw err;
  }

  return data;
};

// get user cart items
export const getAllUserCartItems = async (id: string) => {
  const res = await fetch(`http://localhost:5000/api/cartItems/${id}`);

  if (!res.ok) throw new Error("Not authenticated");

  return res.json();
};
