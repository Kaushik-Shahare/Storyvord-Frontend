"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

type Props = {
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
};

const CreateButton = ({ setOpenDialog, openDialog }: Props) => {
  return (
    <Button
      onClick={() => setOpenDialog(!openDialog)}
      className=" rounded-md bg-transparent border border-gray-500 flex gap-3 font-semibold"
      variant="outline"
    >
      <Image src="/icons/plus.svg" width={16} height={16} alt="" />
      Create announcement
    </Button>
  );
};

export default CreateButton;
