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
            {TYPE.map((type) => (
              <div key={type}>
                <h3 className=" text-xl text-gray-800">{type}</h3>
                <div className=" flex justify-start gap-4 mt-2">
                  <Image src="/chart.svg" alt="" width={50} height={50} className=" w-28" />
                  <div className=" flex flex-col justify-around items-center">
                    <span className="flex justify-between gap-5">
                      <p>Task 1</p>
                      <p>52.1%</p>
                    </span>
                    <span className="flex justify-between gap-5">
                      <p>Task 2</p>
                      <p>22.8%</p>
                    </span>
                    <span className="flex justify-between gap-5">
                      <p>Task 3</p>
                      <p>13.9%</p>
                    </span>
                    <span className="flex justify-between gap-5">
                      <p>Task 4</p>
                      <p>11.2%</p>
                    </span>
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
