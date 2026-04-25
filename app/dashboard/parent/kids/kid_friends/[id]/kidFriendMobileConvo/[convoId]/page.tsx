import React from "react";

const KidFriendMobileConvo = async ({
  params,
}: {
  params: Promise<{ convoId: string }>;
}) => {
  const { convoId } = await params;
  return (
    <div>
      <h1>Kid Friend Mobile Conversation: {convoId}</h1>
    </div>
  );
};

export default KidFriendMobileConvo;
