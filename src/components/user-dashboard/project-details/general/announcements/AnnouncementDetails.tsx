import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import CommentsSection from "./CommentsSection";

type Props = {
  isDialogOpen: boolean;
  setIsDialogOpen: (value: boolean) => void;
  title: string;
  message: string;
  image: string;
  name: string;
  onEdit: () => void;
};

export default function AnnouncementDetails({
  isDialogOpen,
  setIsDialogOpen,
  title,
  message,
  image,
  name,
  onEdit,
}: Props) {
  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
          <DialogHeader className="sticky top-0 z-10 p-4 bg-gray-50">
            <DialogTitle className="flex justify-between items-center">
              <h2 className="text-xl font-bold">{title}</h2>
              <div className=" flex items-center gap-3">
                <button onClick={onEdit}>
                  <Image src="/icons/edit.svg" alt="edit" width={15} height={15} />
                </button>
                <button>
                  <Image src="/icons/share.svg" alt="edit" width={15} height={15} />
                </button>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="overflow-y-auto h-[70vh] space-y-6 p-4 md:px-6 lg:px-8">
            <div className="flex font-medium items-center space-x-16">
              <span className=" text-gray-500 flex gap-3 item-center">
                <Image src="/icons/profile.svg" alt="recipients" width={20} height={20} />
                <p>Recipients</p>
              </span>
              <p>Elsa Harris</p>
            </div>

            <div className="flex font-medium items-center space-x-12">
              <span className=" text-gray-500 flex gap-3 item-center">
                <Image src="/icons/home.svg" alt="recipients" width={20} height={20} />
                <p>Department</p>
              </span>
              <span>5 March 2025</span>
            </div>

            <div className="flex font-medium items-center space-x-12">
              <span className=" text-gray-500 flex gap-3 item-center">
                <Image src="/icons/profile.svg" alt="recipients" width={20} height={20} />
                <p>Created By</p>
              </span>
              <div className=" flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={image} alt="Created By" />
                  <AvatarFallback>{name[0]}</AvatarFallback>
                </Avatar>
                <span>{name}</span>
              </div>
            </div>

            <div>
              <span className="font-medium text-gray-500 flex gap-3 item-center">
                <Image src="/icons/message3.svg" alt="recipients" width={20} height={20} />
                <p>Message</p>
              </span>
              <Textarea
                className="mt-2"
                disabled
                defaultValue="Pre-Production (4 weeks): Research key topics and identify industry experts for interviews. Scout locations, including restaurants, tech hubs, and packaging facilities. Scriptwriting and storyboarding."
                value={message}
              />
            </div>

            <div>
              <span className="font-medium text-gray-500">Attachment:</span>
              <div className="flex space-x-2 mt-2">
                <Button variant="outline" className="space-x-2">
                  <span>script.doc</span>
                </Button>
                <Button variant="outline" className="space-x-2">
                  <span>script.pdf</span>
                </Button>
                <Button variant="outline" className="space-x-2">
                  +
                </Button>
              </div>
            </div>

            <Tabs defaultValue="comments" className=" w-full">
              <TabsList className="  -ml-2 ">
                <TabsTrigger
                  value="comments"
                  className="data-[state=active]:bg-gray-100 shadow-none data-[state=active]:text-black border-none"
                >
                  Comments
                </TabsTrigger>
              </TabsList>
              <TabsContent value="comments" className=" border p-4 rounded-xl">
                <CommentsSection image={image} name={name} />
              </TabsContent>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
