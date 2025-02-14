import React from "react";
import CreateButton from "./CreateButton";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type Props = {
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
  setSearchFilter: (value: string) => void;
  searchFilter: string;
};

const Navbar = ({ openDialog, setOpenDialog, searchFilter, setSearchFilter }: Props) => {
  return (
    <section className=" flex gap-2 md:gap-4 justify-between items-center">
      <CreateButton openDialog={openDialog} setOpenDialog={setOpenDialog} />
      <div className=" flex gap-4">
        <div className=" flex gap-2 border border-gray-600 rounded-md pl-3 w-32">
          <Image src="/icons/search.svg" width={16} height={16} alt="download" />
          <input
            type="text"
            placeholder="Search..."
            className=" bg-transparent focus:outline-none"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
        </div>
        <Button
          variant="outline"
          className="flex gap-3 font-semibold rounded-md bg-transparent border border-gray-500"
        >
          <Image src="/icons/sort.svg" width={16} height={16} alt="download" />
          Sort By
        </Button>
      </div>
    </section>
  );
};

export default Navbar;
