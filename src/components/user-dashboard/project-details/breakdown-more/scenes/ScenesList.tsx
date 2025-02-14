import React, { useState, useEffect } from "react";
import { EllipsisVertical } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { ScenesShimmer } from "./ScenesShimmer";

type Scene = {
  id: number;
  sceneName: string;
  description: string;
  characters: string;
  shootingDate: string;
  scriptPages: string;
  estimatedTime: string;
};

const ScenesList = ({
  selectedScenes,
  setSelectedScenes,
}: {
  selectedScenes: number[];
  setSelectedScenes: React.Dispatch<React.SetStateAction<number[]>>;
}) => {
  const [scenes, setScenes] = useState<Scene[]>([
    {
      id: 1,
      sceneName: "Scene 1",
      description: "Description 1",
      characters: "Character A, B",
      shootingDate: "2025-06-21",
      scriptPages: "2/10",
      estimatedTime: "01:00",
    },
    {
      id: 2,
      sceneName: "Scene 2",
      description: "Description 2",
      characters: "Character C, D",
      shootingDate: "2025-06-22",
      scriptPages: "3/10",
      estimatedTime: "01:30",
    },
    {
      id: 3,
      sceneName: "Scene 3",
      description: "Description 3",
      characters: "Character E, F",
      shootingDate: "2025-06-23",
      scriptPages: "1/10",
      estimatedTime: "00:45",
    },
  ]);

  const [debouncedScene, setDebouncedScene] = useState<Scene | null>(null);

  const handleInputChange = (id: number, field: keyof Scene, value: string) => {
    const updatedScenes = scenes.map((scene) =>
      scene.id === id ? { ...scene, [field]: value } : scene
    );
    setScenes(updatedScenes);

    const updatedScene = updatedScenes.find((scene) => scene.id === id) || null;
    setDebouncedScene(updatedScene);
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedScenes(
      (prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((sceneId) => sceneId !== id) // Unselect
          : [...prevSelected, id] // Select
    );
  };

  const toggleSelectAll = () => {
    setSelectedScenes((prevSelected) =>
      prevSelected.length === scenes.length ? [] : scenes.map((scene) => scene.id)
    );
  };

  const isSceneSelected = (id: number) => selectedScenes.includes(id);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (debouncedScene) {
        console.log("Updated scene:", debouncedScene);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [debouncedScene]);

  // TODO: Remove this when APIs is available
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <div className="pt-6">
      <div className="w-full">
        <div className="grid grid-cols-[50px_2fr_1fr_1fr_1fr_1fr] bg-white font-semibold rounded-lg shadow-sm">
          <div className="p-4">
            <Checkbox
              checked={selectedScenes.length === scenes.length && scenes.length > 0}
              onCheckedChange={(checked) => toggleSelectAll()}
              className="data-[state=checked]:bg-green-500 data-[state=checked]:border-none"
            />
          </div>
          <div className="p-4">Scene & Setting</div>
          <div className="p-4">Characters</div>
          <div className="p-4">Shooting Date</div>
          <div className="p-4">Script Pages</div>
          <div className="p-4 rounded-r-lg">Estimated Time</div>
        </div>

        {loading ? (
          <ScenesShimmer />
        ) : (
          scenes.map((scene) => (
            <div
              key={scene.id}
              className="grid grid-cols-[50px_2fr_1fr_1fr_1fr_1fr] bg-white hover:bg-gray-50 transition-shadow mt-4 py-5 shadow-sm rounded-lg border-l-8 border-sky-300 items-center"
            >
              <div className="p-4">
                <Checkbox
                  checked={isSceneSelected(scene.id)}
                  onCheckedChange={(checked) => handleCheckboxChange(scene.id)}
                  className="data-[state=checked]:bg-green-500 data-[state=checked]:border-none"
                />
              </div>
              <div className="p-4 flex gap-5 items-center">
                <p className="font-poppins-semibold">{scene.id}</p>
                <div>
                  <input
                    type="text"
                    value={scene.sceneName}
                    onChange={(e) => handleInputChange(scene.id, "sceneName", e.target.value)}
                    className="w-full font-poppins-medium text-lg border-none outline-none focus:border-b focus:border-gray-400"
                  />
                  <input
                    type="text"
                    value={scene.description}
                    onChange={(e) => handleInputChange(scene.id, "description", e.target.value)}
                    className="w-full border-none outline-none focus:border-b focus:border-gray-400"
                  />
                </div>
              </div>
              <div className="p-4">
                <input
                  type="text"
                  value={scene.characters}
                  onChange={(e) => handleInputChange(scene.id, "characters", e.target.value)}
                  className="w-full border-none outline-none focus:border-b focus:border-gray-400"
                />
              </div>
              <div className="p-4">
                <input
                  type="date"
                  value={scene.shootingDate}
                  onChange={(e) => handleInputChange(scene.id, "shootingDate", e.target.value)}
                  className="w-full border-none outline-none focus:border-b focus:border-gray-400"
                />
              </div>
              <div className="p-4">
                <input
                  type="text"
                  value={scene.scriptPages}
                  onChange={(e) => handleInputChange(scene.id, "scriptPages", e.target.value)}
                  className="w-full border-none outline-none focus:border-b focus:border-gray-400"
                />
              </div>
              <div className="p-4 flex justify-between">
                <input
                  type="text"
                  value={scene.estimatedTime}
                  onChange={(e) => handleInputChange(scene.id, "estimatedTime", e.target.value)}
                  className="w-full border-none outline-none focus:border-b focus:border-gray-400"
                />
                <EllipsisVertical />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ScenesList;
