import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

interface ShotCardProps {
  image: string;
  title: string;
  description: string;
  audio: string;
  video: string;
}

const ShotCard: React.FC<ShotCardProps> = ({ image, title, description, audio, video }) => {
  return (
    <Card className="w-full border-2 shadow-sm">
      <Image
        src={image}
        alt={title}
        className="h-48 w-full object-cover rounded-t-lg"
        width={20}
        height={20}
      />
      <h3 className=" my-6 font-poppins-medium">{title}</h3>
      <CardContent className="space-y-4 p-0">
        <span className="text-gray-700 border-b pb-2 text-sm flex gap-3">
          <Image src="/icons/creative-hub/general.svg" alt="" width={20} height={20} />
          <p>{description}</p>
        </span>
        <span className="text-sm text-gray-500 flex gap-3  border-b pb-2">
          <Image src="/icons/mic.svg" alt="" width={20} height={20} />
          <p className="truncate overflow-hidden whitespace-nowrap text-ellipsis">{audio}</p>
        </span>
        <span className="text-sm text-gray-500 flex gap-3  border-b pb-2">
          <Image src="/icons/video.svg" alt="" width={20} height={20} />
          <p className="truncate overflow-hidden whitespace-nowrap text-ellipsis">{video}</p>
        </span>
      </CardContent>
    </Card>
  );
};

export default ShotCard;
