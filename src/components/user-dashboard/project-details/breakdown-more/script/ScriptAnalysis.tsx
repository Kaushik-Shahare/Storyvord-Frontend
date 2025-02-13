import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";

const TYPE = [
  "Action vs Dialogue",
  "Interior vs Exterior",
  "Dialogue Distribution",
  "Setting Distribution",
];

const DATA = [
  {
    title: "Action vs Dialogue",
    chart: "/chart1.svg",
    data: [
      { label: "Action", value: 47 },
      { label: "Dialogue", value: 53 },
    ],
  },
  {
    title: "Interior vs Exterior",
    chart: "/chart2.svg",
    data: [
      { label: "Interior", value: 35 },
      { label: "Exterior", value: 50 },
      { label: "Both", value: 15 },
    ],
  },
  {
    title: "Dialogue Distribution",
    chart: "/chart3.svg",
    data: [
      { label: "Casey", value: 10 },
      { label: "Jordan", value: 48 },
      { label: "Sam", value: 27 },
      { label: "Riley", value: 15 },
    ],
  },
  {
    title: "Setting Distribution",
    chart: "/chart4.svg",
    data: [
      { label: "City Park", value: 55 },
      { label: "Cozy Cafe", value: 25 },
      { label: "Apartment", value: 10 },
      { label: "Factory", value: 10 },
    ],
  },
];

const ScriptAnalysis = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  return (
    <Sheet open={open} onOpenChange={() => setOpen(!open)}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className=" text-2xl">Script Analysis </SheetTitle>
          <SheetDescription className=" space-y-6">
            {DATA.map((type) => (
              <div key={type.title}>
                <h3 className=" text-xl text-gray-800">{type.title}</h3>
                <div className=" flex justify-start gap-4 mt-2">
                  <Image src={type.chart} alt="" width={50} height={50} className=" w-28" />
                  <div className=" flex flex-col justify-center items-start gap-2">
                    {type.data.map((item) => (
                      <span key={item.label} className="flex justify-between gap-5">
                        <p>{item.label}</p>
                        <p>{item.value}</p>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default ScriptAnalysis;
