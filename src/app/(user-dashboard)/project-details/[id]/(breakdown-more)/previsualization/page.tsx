import ShotCard from "@/components/user-dashboard/project-details/breakdown-more/previsualization/ShotCard";
import React from "react";

const DATA = [
  {
    id: "scene-1",
    title: "Scene 1 | Cafe Meeting - DAY-EXT",
    description:
      "Inside a warmly lit cafe filled with the hum of quiet conversation and the clink of coffee cups, Jordan sits across from Sam, a close friend. The envelope lies on the table between them.",
    shots: [
      {
        id: "shot-1",
        title: "Scene 1 - Shot 1",
        description: "Jordan looks up from their coffee as Sam speaks animatedly.",
        audio: "Background cafe noise, Sam's voice.",
        video: "close-up-jordan.mp4",
        image: "/fox.svg",
      },
      {
        id: "shot-2",
        title: "Scene 1 - Shot 2",
        description: "Sam gestures toward the envelope while smiling.",
        audio: "Background cafe noise, Sam's voice explaining something.",
        video: "close-up-sam.mp4",
        image: "/fox.svg",
      },
      {
        id: "shot-3",
        title: "Scene 1 - Shot 3",
        description: "The camera zooms in on the envelope lying on the table.",
        audio: "Muffled cafe noise, no dialogue.",
        video: "envelope-zoom.mp4",
        image: "/fox.svg",
      },
      {
        id: "shot-4",
        title: "Scene 1 - Shot 4",
        description: "Wide shot of both Jordan and Sam sitting across from each other.",
        audio: "Background cafe noise.",
        video: "wide-shot.mp4",
        image: "/fox.svg",
      },
    ],
  },
  {
    id: "scene-2",
    title: "Scene 2 | Street Encounter - DAY-EXT",
    description:
      "Jordan walks briskly down a crowded street when they bump into Sam, who appears unexpectedly.",
    shots: [
      {
        id: "shot-1",
        title: "Scene 2 - Shot 1",
        description: "Jordan walking down the street, looking distracted.",
        audio: "Street noise, distant chatter.",
        video: "jordan-walking.mp4",
        image: "/fox.svg",
      },
      {
        id: "shot-2",
        title: "Scene 2 - Shot 2",
        description: "Sam calls out to Jordan from across the street.",
        audio: "Sam's voice, faint at first, then louder.",
        video: "sam-calling.mp4",
        image: "/fox.svg",
      },
      {
        id: "shot-3",
        title: "Scene 2 - Shot 3",
        description: "Jordan stops and turns toward Sam, surprised.",
        audio: "Street noise fades, focus on Jordan's surprised reaction.",
        video: "jordan-surprised.mp4",
        image: "/fox.svg",
      },
      {
        id: "shot-4",
        title: "Scene 2 - Shot 4",
        description: "Wide shot of both Jordan and Sam meeting on the sidewalk.",
        audio: "Street noise resumes, indistinct conversation between them.",
        video: "wide-shot-street.mp4",
        image: "/fox.svg",
      },
    ],
  },
];

const Home = () => {
  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">Previsualization</h1>
      {DATA.map((scene) => (
        <div key={scene.id} className="mb-12 p-4">
          <h2 className="text-lg font-semibold mb-1">{scene.title}</h2>
          <p className="text-gray-600 mb-4 text-base">{scene.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {scene.shots.map((shot) => (
              <ShotCard
                key={shot.id}
                image={shot.image}
                title={shot.title}
                description={shot.description}
                audio={shot.audio}
                video={shot.video}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
