//@ts-nocheck
"use client";
import React, { useEffect, useState } from "react";
import {
  useCreateAnnouncement,
  useGetAllAnnouncements,
  useUpdateAnnouncement, // New hook for updating
} from "@/lib/react-query/queriesAndMutations/announcements";
import Announcement from "@/components/user-dashboard/project-details/general/announcements/Announcement";
import CreateAnnouncementDialog, {
  AnnouncementFormType,
} from "@/components/user-dashboard/project-details/general/announcements/CreateAnnouncementDialog";
import Navbar from "@/components/user-dashboard/project-details/general/announcements/Navbar";
import AnnouncementSkeleton from "@/components/user-dashboard/project-details/general/announcements/AnnouncementSkeleton";
import { ReturnAnnouncements } from "@/types";
import { useParams } from "next/navigation";
import { useCrewOptions } from "@/hooks/useCrewOptions";
import { useToast } from "@/components/ui/use-toast";
import { useGetUserProfile } from "@/lib/react-query/queriesAndMutations/auth/auth";

const Announcements = () => {
  const [sortAnnouncement, setSortAnnouncement] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create"); // Manage mode
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<AnnouncementFormType | null>(
    null
  ); // Manage selected data
  const { id: projectId }: { id: string } = useParams();
  const { toast } = useToast();
  const { data, isPending } = useGetAllAnnouncements(projectId);

  const {
    mutateAsync: createAnnouncement,
    isPending: isCreating,
    isError: createError,
  } = useCreateAnnouncement();

  const {
    mutateAsync: updateAnnouncement,
    isPending: isUpdating,
    isError: updateError,
  } = useUpdateAnnouncement(); // Hook for updating

  const { crewList } = useCrewOptions(projectId);

  const handleCreateAnnouncement = async (data: AnnouncementFormType) => {
    const transformData = { ...data, project: projectId };
    try {
      if (mode === "create") {
        await createAnnouncement(transformData);
      } else if (selectedAnnouncement?.id) {
        await updateAnnouncement({ announcementData: transformData, id: selectedAnnouncement.id });
      }
      setOpenDialog(false);
      setSelectedAnnouncement(null);
      setMode("create");
    } catch {
      toast({ title: "Error", description: "Failed to save announcement", variant: "destructive" });
    }
  };

  const handleEditAnnouncement = (announcement: ReturnAnnouncements) => {
    setSelectedAnnouncement({
      title: announcement.title,
      message: announcement.message,
      recipients: announcement.recipients,
      is_urgent: announcement.is_urgent,
      id: announcement.id, // Assuming ID is part of the announcement type
    });
    setMode("edit");
    setOpenDialog(true);
  };

  useEffect(() => {
    // Update the state with the original data first
    setSortAnnouncement(data?.results?.data);

    // Filter announcements based on the search filter
    const filteredAnnouncements = data?.results?.data?.filter((item) =>
      item.title.toLowerCase().includes(searchFilter.toLowerCase())
    );

    // Update the state with the filtered announcements
    setSortAnnouncement(filteredAnnouncements);
  }, [data, searchFilter]);

  return (
    <div className="w-full p-4">
      <h1 className="text-xl font-semibold mb-6">Announcements</h1>

      {isPending && <AnnouncementSkeleton />}

      <Navbar
        openDialog={openDialog}
        setOpenDialog={() => setOpenDialog(true)}
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
      />
      {data?.results?.data?.length === 0 && (
        <p className="text-center pt-24 text-gray-500 font-semibold">No Announcement</p>
      )}

      <section className="my-4 grid gap-4 grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3">
        {sortAnnouncement?.map((item: ReturnAnnouncements) => (
          <Announcement
            key={item.id}
            title={item.title}
            message={item.message}
            id={item.id}
            onEdit={() => handleEditAnnouncement(item)} // Pass the edit handler
          />
        ))}
      </section>

      <CreateAnnouncementDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        crewList={crewList}
        createAnnouncement={handleCreateAnnouncement}
        isPending={isCreating || isUpdating}
        isError={createError || updateError}
        mode={mode}
        initialData={selectedAnnouncement} // Pass initial data for edit mode
      />
    </div>
  );
};

export default Announcements;
