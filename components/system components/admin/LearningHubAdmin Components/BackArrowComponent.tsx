"use client";

import { Button } from "@/components/ui/button";
import { TbArrowBackUp } from "react-icons/tb";
import { useRouter } from "next/navigation";

const BackArrowComponent = () => {
  const router = useRouter();

  return (
    <Button
      variant={"secondary"}
      className="flex items-center gap-2 mb-5"
      onClick={() => router.back()}
    >
      <TbArrowBackUp />
      <h3>Back</h3>
    </Button>
  );
};

export default BackArrowComponent;
