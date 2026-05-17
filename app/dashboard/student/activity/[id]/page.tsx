import React from "react";
type Props = Promise<{ id: string }>;
const ActivityPage = async ({ params }: { params: Props }) => {
  const { id } = await params;
  return (
    <div>
      <h2>activity id: {id}</h2>
    </div>
  );
};

export default ActivityPage;
