"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import { EllipsisVertical } from "lucide-react";
import ScriptForm from "@/components/user-dashboard/project-details/breakdown-more/script/ScriptForm";
import { useParams, useRouter } from "next/navigation";

const PLACEHOLDER = `Title: "The Breakthrough"
Characters:
Aarav – A young instructional designer, feeling overwhelmed.
Meera – His supportive mentor.
Scene: A small office, Aarav sits at his desk, staring at a half-finished e-learning module on his screen. Meera walks in.
Meera: (smiling) You’ve been staring at that screen for a while. What’s on your mind?
Aarav: (sighs) I just feel stuck. I want this course to be engaging, but I keep second-guessing my ideas. What if it’s not good enough?
Meera: Ah, the perfectionist dilemma. Let me ask you something—why did you choose this field?
Aarav: Because I love creating learning experiences that actually help people. I want them to enjoy the process, not just go through the motions.
Meera: Ah, the perfectionist dilemma. Let me ask you something—why did you choose this field?
Aarav: Because I love creating learning experiences that actually help people. I want them to enjoy the process, not just go through the motions.`;

export const MENU = [
  {
    name: "Costumes (10)",
    icon: "costumes.svg",
  },
  {
    name: "Set Dressings (0)",
    icon: "costumes.svg",
  },
  {
    name: "Graphics (0)",
    icon: "graphics.svg",
  },
  {
    name: "Sound (0)",
    icon: "sound.svg",
  },
  {
    name: "Props (0)",
    icon: "props.svg",
  },
  {
    name: "Camera & Lights (0)",
    icon: "shot.svg",
  },
  {
    name: "Others",
  },
];

const SCENES = [
  "1  Ext night day/outdoor shoot",
  "2   ext day day/indoor shoot",
  "3   int day day/outdoor shoot",
  "4   Int night day/indoor shoot",
];

const Details = () => {
  const [value, setValue] = useState(PLACEHOLDER);
  const { id } = useParams();
  const router = useRouter();
  return (
    <div className=" p-6">
      <section className=" flex gap-4">
        <Button
          className=" rounded-md bg-background-2"
          onClick={() => router.push(`/project-details/${id}/script`)}
        >
          Script{" "}
        </Button>
        <Button
          className=" rounded-md"
          variant="outline"
          onClick={() => router.push(`/project-details/${id}/scenes`)}
        >
          Scenes
        </Button>
      </section>
      <section className="flex justify-between items-start gap-6 pt-6">
        {/* Left Section */}
        <div className="hidden lg:block space-y-4 bg-white p-3">
          <Button className=" rounded-md bg-transparent flex gap-3" variant="outline">
            <Image src="/icons/plus.svg" alt="" width={20} height={20} />
            Create Scene
          </Button>
          {SCENES.map((menu) => (
            <button
              key={menu}
              className=" flex justify-between gap-3 text-gray-500 font-poppins-semibold hover:bg-gray-100 w-full p-3 rounded-md border shadow-sm border-l-4 border-gray-200 border-l-gray-600"
            >
              {menu}
              <EllipsisVertical />
            </button>
          ))}
        </div>

        {/* Middle section */}
        <div className="flex-1 h-[98%] bg-white">
          <div className="p-2">
            <ScriptForm />
          </div>
          <div className="h-[95%] relative">
            <textarea
              className="w-full h-full focus:outline-none md:p-12 md:px-16 p-4 font-josefin"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              rows={15}
            />
            <p className=" absolute font-poppins-semibold text-lg top-3 right-3">1</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-60 hidden lg:block space-y-4">
          <div className="bg-white  space-y-4 p-2">
            {MENU.map((menu) => (
              <button
                key={menu.name}
                className=" flex justify-start gap-3 text-gray-500 font-poppins-medium hover:bg-gray-100 w-full py-2 px-3 rounded-md"
              >
                <Image src={`/icons/creative-hub/${menu.icon}`} alt="" width={20} height={20} />
                <p className=" font-base">{menu.name}</p>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Details;
