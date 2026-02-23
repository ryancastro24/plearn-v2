"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TiHeartOutline } from "react-icons/ti";
import { FaReply } from "react-icons/fa";
import { AiOutlineDislike } from "react-icons/ai";
import { IoChatbubbles } from "react-icons/io5";
import Link from "next/link";
type ForumCommentsProps = {
  profileImage: string;
  name: string;
  email: string;
  comment: string;
};

const ForumComments = ({
  profileImage,
  name,
  email,
  comment,
}: ForumCommentsProps) => {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReplySubmit = () => {
    if (!replyText.trim()) return;

    console.log("Reply:", replyText);
    setReplyText("");
    setShowReply(false);
  };

  return (
    <div className="flex items-start p-3 border flex-col gap-2 border-black/10 rounded">
      <div className="flex gap-2">
        <Image
          src={profileImage}
          alt={`${name}'s profile picture`}
          width={45}
          height={45}
          className="rounded-full"
        />

        <div className="flex flex-col">
          <h3 className="font-bold">{name}</h3>
          <p className="text-xs text-gray-500">{email}</p>
        </div>
      </div>

      <p className="text-sm mt-1">{comment}</p>

      {/* Action Buttons */}
      <div className="flex items-end w-full gap-2 justify-end">
        <Button size="icon" variant="secondary">
          <TiHeartOutline />
        </Button>

        <Button
          size="icon"
          variant="secondary"
          onClick={() => setShowReply(!showReply)}
        >
          <FaReply />
        </Button>

        <Button size="icon" variant="secondary">
          <AiOutlineDislike />
        </Button>

        <Link href={"/dashboard/forum/1"} className="no-underline text-inherit">
          <Button size="icon" variant="secondary">
            <IoChatbubbles />
          </Button>
        </Link>
      </div>

      {/* Reply Dropdown */}
      <div
        className={`w-full transition-all duration-300 overflow-hidden ${
          showReply ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex gap-2">
          <Input
            placeholder="Write your reply..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <Button
            className="bg-linear-to-r from-[#685AFF] to-[#008CFF] text-white"
            onClick={handleReplySubmit}
          >
            Reply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForumComments;
