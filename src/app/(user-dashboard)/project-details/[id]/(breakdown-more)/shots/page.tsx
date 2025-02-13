"use client";
import Image from "next/image";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import CreateShots from "@/components/user-dashboard/project-details/breakdown-more/shots/CreateShots";
import Navbar from "@/components/user-dashboard/project-details/breakdown-more/shots/Navbar";
import ShotsList from "@/components/user-dashboard/project-details/breakdown-more/shots/ShotsList";

const Shots = () => {
  const [createScriptDialog, setCreateScriptDialog] = useState(false);
  const [uploadScriptDialog, setUploadScriptDialog] = useState(false);
  const [selectedShots, setSelectedShots] = useState<number[]>([]);

  //data will come from api
  const [data, stData] = useState(true);
  return (
    <div className=" w-full p-4">
      <h2 className="hidden md:block text-xl font-semibold">Shots</h2>
      {data ? (
        <>
          <Navbar selectedShots={selectedShots} />
          <ShotsList selectedShots={selectedShots} setSelectedShots={setSelectedShots} />
        </>
      ) : (
        <div>
          <p className=" text-center md:mt-8">
            Design shots to map out your project&apos;s visual flow. Include key details like
            composition, movement, and framing to bring your creative vision to life.
          </p>
          <section className=" flex justify-center items-center mt-36 gap-6">
            <Button
              onClick={() => setCreateScriptDialog(true)}
              className=" flex gap-2 bg-green-500 hover:bg-green-700"
            >
              <Image src="/icons/plus-3.svg" alt="icon" width={13} height={13} />
              Create Shots
            </Button>
          </section>
        </div>
      )}
      <CreateShots openDialog={createScriptDialog} setOpenDialog={setCreateScriptDialog} />
    </div>
  );
};

export default Shots;
