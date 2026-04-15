// get all items
export const getAllItems = async () => {
  const res = await fetch("http://localhost:5000/api/items");

  if (!res.ok) throw new Error("Not authenticated");

  return res.json();
};

// get all on sale items
export const getAllOnSaleItems = async () => {
  const res = await fetch("http://localhost:5000/api/items/onsaleitems");

  if (!res.ok) throw new Error("Not authenticated");

  return res.json();
};

// add new item
export const createItem = async (formData: FormData) => {
  const obj = Object.fromEntries(formData.entries());
  console.log(obj);
  const res = await fetch("http://localhost:5000/api/items", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to create item");
  return res.json();
};

// update item
export const updateItem = async (formData: FormData, id: string) => {
  const obj = Object.fromEntries(formData.entries());
  console.log(obj);
  const res = await fetch(`http://localhost:5000/api/items/${id}`, {
    method: "PUT",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to create item");
  return res.json();
};

// delete item
export const deleteItem = async (id: string) => {
  console.log("item id", id);
  const res = await fetch(`http://localhost:5000/api/items/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete item");
  }
  return res.json();
};
