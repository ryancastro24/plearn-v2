import React from "react";

type WorldTopicsProps = Promise<{ worldid: string }>;
const WorldTopics = async ({ params }: { params: WorldTopicsProps }) => {
  const { worldid } = await params;
  return <div>WorldTopics {worldid}</div>;
};

export default WorldTopics;
