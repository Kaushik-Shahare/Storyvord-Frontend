import Image from "next/image";
import React from "react";
import { EllipsisVertical } from "lucide-react";

const ICONS = ["download", "analysis", "share", "message-2"];
const ScriptHeader = ({
  setOpenAnalysis,
  projectName,
}: {
  setOpenAnalysis: (value: boolean) => void;
  projectName: string;
}) => {
  return (
    <div className=" font-poppins-medium">
      <header className=" flex justify-between items-center bg-white p-3">
        <h3 className=" text-lg">Screenwriting</h3>
        <h2 className=" text-xl hidden md:block truncate overflow-hidden whitespace-nowrap text-ellipsis max-w-[60%]">
          {projectName} gshdfg sdgf hsgdf sgf sgfgsfgsf
        </h2>
        <span className=" flex justify-between items-center gap-3 md:gap-8">
          {ICONS.map((icon) => (
            <button key={icon} onClick={() => icon === "analysis" && setOpenAnalysis(true)}>
              <Image
                src={`/icons/${icon}.svg`}
                alt={icon}
                width={20}
                height={20}
                className=" text-lg md:text-2xl cursor-pointer"
              />
            </button>
          ))}
          <EllipsisVertical />
        </span>
      </header>
    </div>
  );
};

export default ScriptHeader;
