import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type AIButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  className?: string;
};

const AIButton: React.FC<AIButtonProps> = ({ text, className, ...props }) => {
  return (
    <Button
      className={cn(
        "flex gap-3 bg-green-500 hover:bg-green-200 bg-opacity-20 px-4 py-3 border-2 border-green-500 rounded-md w-fit relative text-gray-900",
        className
      )}
      {...props}
    >
      <Image src="/icons/ai.svg" alt="icons" width={23} height={23} />
      {text}

      <Image
        src="/ai.svg"
        alt="AI Icon"
        width={30}
        height={30}
        className="absolute -right-3 -top-3"
      />
    </Button>
  );
};

export default AIButton;
