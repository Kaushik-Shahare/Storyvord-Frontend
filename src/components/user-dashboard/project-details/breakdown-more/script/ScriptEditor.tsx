"use client";
import React, { useState } from "react";
import ScriptHeader from "./ScriptHeader";
import ScriptFooter from "./ScriptFooter";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ScriptAnalysis from "./ScriptAnalysis";
import { useParams, useRouter } from "next/navigation";
import { useGetProjectDetails } from "@/lib/react-query/queriesAndMutations/project";

const PLACEHOLDER = `INT. SMALL BEDROOM – EARLY MORNING

(A ray of sunlight filters through a cracked window. A messy desk sits in the corner, papers scattered everywhere. The faint sound of an alarm clock beeping fills the room.)


                      JAYA 

(20s, wearing oversized glasses and a hoodie) stirs under a blanket, groaning as the alarm grows louder. She lazily reaches out to **her** nightstand and fumbles for her phone.*`;

export const MENU = [
  {
    name: "Scene Heading",
    icon: "image.svg",
  },
  {
    name: "Action",
    icon: "action.svg",
  },
  {
    name: "Character",
    icon: "character.svg",
  },
  {
    name: "Parenthetical",
    icon: "parenthetical.svg",
  },
  {
    name: "Dialogue",
    icon: "dialogue.svg",
  },
  {
    name: "General",
    icon: "general.svg",
  },
  {
    name: "Transition",
    icon: "transition.svg",
  },
  {
    name: "Shot",
    icon: "shot.svg",
  },
];

const ScriptEditor = () => {
  const [value, setValue] = useState(PLACEHOLDER);
  const [openAnalysis, setOpenAnalysis] = useState(false);
  const { id: projectId } = useParams<{ id: string }>();

  const {
    data: singleProject,
    isPending: projectDetailsLoading,
    isError,
  } = useGetProjectDetails(projectId);

  const router = useRouter();
  return (
    <div className=" font-poppins-medium h-full">
      <ScriptHeader setOpenAnalysis={setOpenAnalysis} projectName={singleProject?.name} />
      <section className="flex justify-between items-start h-[90%] gap-6 p-3 xl:px-16 lg:px-10 lg:pt-8 lg:pb-0">
        {/* Left Section */}
        <div className="flex-1 h-[98%]">
          <div className=" hover:overflow-y-auto h-[95%] relative">
            <textarea
              className="w-full h-full focus:outline-none lg:pt-24 lg:px-20 md:p-12 p-4 font-josefin"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <p className=" absolute font-poppins-semibold text-lg top-3 right-3">1</p>
          </div>
          <ScriptFooter />
        </div>

        {/* Right Section */}
        <div className="w-64 xl:w-72 hidden lg:block space-y-4">
          <Button
            className=" w-full rounded-sm bg-background-2 hover:bg-background-2 relative"
            onClick={() => router.push("scenes")}
          >
            Convert to Scenes
            <Image
              src="/ai.svg"
              alt=""
              width={30}
              height={30}
              className=" absolute -right-3 -top-3"
            />
          </Button>
          <div className="bg-white  space-y-4 p-2">
            {MENU.map((menu) => (
              <button
                key={menu.name}
                className=" flex justify-start gap-3 text-gray-500 font-poppins-semibold hover:bg-gray-100 w-full py-2 px-3 rounded-md"
              >
                <Image src={`/icons/creative-hub/${menu.icon}`} alt="" width={20} height={20} />
                <p>{menu.name}</p>
              </button>
            ))}
          </div>
        </div>
      </section>
      <ScriptAnalysis open={openAnalysis} setOpen={setOpenAnalysis} />
    </div>
  );
};

export default ScriptEditor;
