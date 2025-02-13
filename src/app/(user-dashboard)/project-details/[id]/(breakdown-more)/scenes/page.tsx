"use client";
import React, { useState } from "react";
import ButtonGroup from "@/components/user-dashboard/project-details/breakdown-more/scenes/ButtonGroup";
import CreateScenes from "@/components/user-dashboard/project-details/breakdown-more/scenes/CreateScenes";
import Navbar from "@/components/user-dashboard/project-details/breakdown-more/scenes/Navbar";
import ScenesList from "@/components/user-dashboard/project-details/breakdown-more/scenes/ScenesList";

const Scenes = () => {
  const [createScenesDialog, setCreateScenesDialog] = useState(false);
  const [uploadScenesDialog, setUploadScenesDialog] = useState(false);
  const [selectedScenes, setSelectedScenes] = useState<number[]>([]);

  //data will come from api
  const [data, stData] = useState(true);

  return (
    <div className=" w-full p-4">
      <h2 className="hidden md:block text-xl font-semibold">Scenes</h2>
      {data ? (
        <>
          <Navbar
            setCreateScenesDialog={setCreateScenesDialog}
            setUploadScenesDialog={setUploadScenesDialog}
            selectedScenes={selectedScenes}
          />
          <ScenesList selectedScenes={selectedScenes} setSelectedScenes={setSelectedScenes} />
        </>
      ) : (
        <section>
          <p className=" text-center md:mt-8">
            Import a screenplay in seconds to create a dynamic breakdown. All elements are
            automatically shared with relevant departments.
          </p>
          <ButtonGroup
            setCreateScenesDialog={setCreateScenesDialog}
            setUploadScenesDialog={setUploadScenesDialog}
            className="mt-36"
          />
        </section>
      )}
      <section>{/* scenes will come here */}</section>

      <CreateScenes openDialog={createScenesDialog} setOpenDialog={setCreateScenesDialog} />
    </div>
  );
};

export default Scenes;
