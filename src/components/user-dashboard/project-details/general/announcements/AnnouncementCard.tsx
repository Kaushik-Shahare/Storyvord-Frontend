import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdDelete, MdEdit } from "react-icons/md";
import Loader from "@/components/Loader";
import Image from "next/image";
import AnnouncementDetails from "./AnnouncementDetails";
import { useGetUserProfile } from "@/lib/react-query/queriesAndMutations/auth/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type AnnouncementCardProps = {
  title: string;
  message: string;
  isLoading: boolean;
  onDelete: () => void;
  onEdit: () => void; // New onEdit prop
};

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({
  title,
  message,
  isLoading,
  onDelete,
  onEdit,
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {
    data: {
      data: { personal_info },
    },
  } = useGetUserProfile();
  return (
    <div>
      <Card
        className="relative max-h-[40rem] p-3 shadow-sm cursor-pointer"
        onClick={() => setIsDialogOpen(true)}
      >
        <CardHeader className=" flex flex-row justify-between items-center">
          <div className=" flex gap-4 items-center">
            <Avatar>
              <AvatarImage src={personal_info?.image} alt="Created By" />
              <AvatarFallback>{personal_info?.full_name?.at(0)}</AvatarFallback>
            </Avatar>
            <p className=" text-sm text-gray-500">Posted by {personal_info?.full_name}</p>
          </div>
          <p className=" text-sm text-gray-500 pr-6">1Hrs Ago</p>
        </CardHeader>
        <div className="absolute top-3 right-3 px-1" onClick={(e) => e.stopPropagation()}>
          <Popover>
            <PopoverTrigger className="">
              <BsThreeDotsVertical className=" w-5 h-5 text-gray-500 cursor-pointer" />
            </PopoverTrigger>
            <PopoverContent className="w-fit flex flex-col gap-2 p-2 border border-red-500 mr-8">
              {isLoading ? (
                <Loader />
              ) : (
                <button
                  className="cursor-pointer text-red-500 flex gap-2 items-center"
                  onClick={onDelete}
                >
                  <MdDelete className="w-6 h-6" title="Delete Announcement" />
                  <p>Delete</p>
                </button>
              )}
            </PopoverContent>
          </Popover>
        </div>
        <CardContent className=" py-2">
          <h3 className="text-sm font-semibold my-2">{title}</h3>
          <p className="text-gray-500 line-clamp-6 text-sm">{message}</p>

          <div className=" flex gap-4 justify-end">
            <span className=" flex gap-2 items-center">
              <Image src="/icons/eye.svg" alt={title} width={20} height={20} />
              <p className=" text-sm text-gray-500">15</p>
            </span>
            <span className=" flex gap-2 items-center">
              <Image src="/icons/message2.svg" alt={title} width={20} height={20} />
              <p className=" text-sm text-gray-500">4</p>
            </span>
          </div>
        </CardContent>
      </Card>
      <AnnouncementDetails
        title={title}
        message={message}
        image={personal_info?.image}
        name={personal_info?.full_name}
        onEdit={onEdit}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </div>
  );
};

export default AnnouncementCard;
