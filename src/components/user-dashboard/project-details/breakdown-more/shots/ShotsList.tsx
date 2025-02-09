import React, { useState, useEffect } from "react";
import { EllipsisVertical } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

type Shot = {
  id: number;
  image: string;
  shotNumber: number;
  description: string;
  shootSize: string;
  movement: string;
  shootType: string;
  estimatedTime: string;
};

const ShotsList = ({
  selectedShots,
  setSelectedShots,
}: {
  selectedShots: number[];
  setSelectedShots: React.Dispatch<React.SetStateAction<number[]>>;
}) => {
  const [shots, setShots] = useState<Shot[]>([
    {
      id: 1,
      image: "/gaurav.svg",
      shotNumber: 1,
      description: "Close-up of Character A",
      shootSize: "Close-up",
      movement: "Static",
      shootType: "Indoor",
      estimatedTime: "00:30",
    },
    {
      id: 2,
      image: "/gaurav.svg",
      shotNumber: 2,
      description: "Wide shot of group",
      shootSize: "Wide",
      movement: "Pan",
      shootType: "Outdoor",
      estimatedTime: "01:00",
    },
    {
      id: 3,
      image: "/gaurav.svg",
      shotNumber: 3,
      description: "Over-the-shoulder shot",
      shootSize: "Medium",
      movement: "Tilt",
      shootType: "Studio",
      estimatedTime: "00:45",
    },
  ]);

  const [debouncedShot, setDebouncedShot] = useState<Shot | null>(null);

  const handleInputChange = (id: number, field: keyof Shot, value: string | number) => {
    const updatedShots = shots.map((shot) => (shot.id === id ? { ...shot, [field]: value } : shot));
    setShots(updatedShots);

    const updatedShot = updatedShots.find((shot) => shot.id === id) || null;
    setDebouncedShot(updatedShot);
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedShots((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((shotId) => shotId !== id)
        : [...prevSelected, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectedShots((prevSelected) =>
      prevSelected.length === shots.length ? [] : shots.map((shot) => shot.id)
    );
  };

  const isShotSelected = (id: number) => selectedShots.includes(id);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (debouncedShot) {
        console.log("Updated shot:", debouncedShot);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [debouncedShot]);

  return (
    <div className="pt-6">
      <div className="w-full">
        <div className="grid grid-cols-[50px_100px_1fr_1fr_1fr_1fr_1fr_1fr] bg-white font-semibold rounded-lg shadow-sm">
          <div className="p-4">
            <Checkbox
              checked={selectedShots.length === shots.length && shots.length > 0}
              onCheckedChange={() => toggleSelectAll()}
              className="data-[state=checked]:bg-green-500 data-[state=checked]:border-none"
            />
          </div>
          <div className="p-4">Image</div>
          <div className="p-4 flex justify-center">Shot</div>
          <div className="p-4">Description</div>
          <div className="p-4">Shoot Size</div>
          <div className="p-4">Movement</div>
          <div className="p-4">Shoot Type</div>
          <div className="p-4 rounded-r-lg">Est. Time</div>
        </div>
        {shots.map((shot) => (
          <div
            key={shot.id}
            className="grid grid-cols-[50px_100px_1fr_1fr_1fr_1fr_1fr_1fr] bg-white hover:bg-gray-50 transition-shadow mt-6 py-5 shadow-sm rounded-lg items-center"
          >
            <div className="p-4">
              <Checkbox
                checked={isShotSelected(shot.id)}
                onCheckedChange={() => handleCheckboxChange(shot.id)}
                className="data-[state=checked]:bg-green-500 data-[state=checked]:border-none"
              />
            </div>
            <div className="">
              <Image
                src={shot.image}
                alt="Shot Thumbnail"
                className="w-full h-full rounded-lg"
                width={20}
                height={20}
              />
            </div>
            <div className="p-4 flex justify-center">
              <input
                type="number"
                value={shot.shotNumber}
                onChange={(e) => handleInputChange(shot.id, "shotNumber", Number(e.target.value))}
                className="w-full text-center border-none outline-none focus:border-b focus:border-gray-400"
              />
            </div>
            <div className="p-4">
              <input
                type="text"
                value={shot.description}
                onChange={(e) => handleInputChange(shot.id, "description", e.target.value)}
                className="w-full border-none outline-none focus:border-b focus:border-gray-400"
              />
            </div>
            <div className="p-4">
              <input
                type="text"
                value={shot.shootSize}
                onChange={(e) => handleInputChange(shot.id, "shootSize", e.target.value)}
                className="w-full border-none outline-none focus:border-b focus:border-gray-400"
              />
            </div>
            <div className="p-4">
              <input
                type="text"
                value={shot.movement}
                onChange={(e) => handleInputChange(shot.id, "movement", e.target.value)}
                className="w-full border-none outline-none focus:border-b focus:border-gray-400"
              />
            </div>
            <div className="p-4">
              <input
                type="text"
                value={shot.shootType}
                onChange={(e) => handleInputChange(shot.id, "shootType", e.target.value)}
                className="w-full border-none outline-none focus:border-b focus:border-gray-400"
              />
            </div>
            <div className="p-4 flex justify-between">
              <input
                type="text"
                value={shot.estimatedTime}
                onChange={(e) => handleInputChange(shot.id, "estimatedTime", e.target.value)}
                className="w-full border-none outline-none focus:border-b focus:border-gray-400"
              />
              <EllipsisVertical />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShotsList;
