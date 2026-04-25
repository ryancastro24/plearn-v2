import React from "react";

const KidInventory = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  return <div>KidInventory id {id}</div>;
};

export default KidInventory;
