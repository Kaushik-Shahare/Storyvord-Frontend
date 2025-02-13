import React from "react";

const ScriptFooter = () => {
  return (
    <div className=" flex justify-between font-poppins-normal py-3 items-center gap-4">
      <button className=" text-sm md:text-base rounded-full px-3 md:px-6 py-1.5 md:py-2 bg-background-2 text-white">
        0/200
      </button>
      <p className=" text-sm md:text-base">1 Pages</p>
      <p className=" text-sm md:text-base">70 Words</p>
      <p className=" text-sm md:text-base">Writing: 00:00:20</p>
      <p className=" text-sm md:text-base">Thinking: 00:06:40</p>
    </div>
  );
};

export default ScriptFooter;
