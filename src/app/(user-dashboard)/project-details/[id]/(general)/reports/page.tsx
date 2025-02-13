"use client";

import { useEffect, useState, FormEvent } from "react";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { Panel, PanelGroup } from "react-resizable-panels";

import {
  useGetAiWorkStatus,
  useGetSuggestions,
  useStartAIWork,
} from "@/lib/react-query/queriesAndMutations/aiSuggestions";
import { formatError } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import CrewPage from "@/components/report/CrewPage";
import ReportDetails from "@/components/report/ReportDetails";
import SuppliersPage from "@/components/report/SuppliersPage";
import Tabs from "@/components/Tabs";
import ResizeHandle from "@/components/report/ResizeHandle";
import ReportAIChat from "@/components/report/ReportAIChat";
import { AddTabDialog } from "@/components/report/AddTabDialog";
import { Button } from "@/components/ui/button";

// Default tabs available in the application.
const defaultTabs = [
  "Crew",
  "Suppliers",
  "Logistics",
  "Compliance",
  "Culture",
  "Budget",
  "Sustainability",
];

const ReportsPage = () => {
  // Tab & Dialog State
  const [activeTab, setActiveTab] = useState(defaultTabs[0]);
  const [customTabs, setCustomTabs] = useState<{ title: string; description: string }[]>([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [newTabTitle, setNewTabTitle] = useState("");
  const [newTabDescription, setNewTabDescription] = useState("");

  // Combine default and custom tab titles.
  const allTabs = [...defaultTabs, ...customTabs.map((tab) => tab.title)];

  // Handler to add a new tab.
  const handleAddTab = (e: FormEvent) => {
    e.preventDefault();
    if (newTabTitle.trim() !== "") {
      setCustomTabs((prev) => [...prev, { title: newTabTitle, description: newTabDescription }]);
      setActiveTab(newTabTitle);
      setNewTabTitle("");
      setNewTabDescription("");
      setDialogOpen(false);
    }
  };

  const [aiWorkStatus, setAiWorkStatus] = useState<"pending" | "success">("pending");
  const [taskId, setTaskId] = useState<string | null>(() => localStorage.getItem("taskId"));

  const searchParams = useSearchParams();
  const task_Id = searchParams.get("taskId");
  const { toast } = useToast();
  const { id: projectId }: { id: string } = useParams();

  const {
    data,
    isPending: isPendingAiStatus,
    isError: isErrorAiStatus,
  } = useGetAiWorkStatus(taskId!);

  const {
    data: allAiReports,
    isPending,
    isError,
    refetch,
  } = useGetSuggestions(projectId, aiWorkStatus);

  const { mutateAsync: regenerateAiWork } = useStartAIWork();

  useEffect(() => {
    if (task_Id) {
      setTaskId(task_Id);
      localStorage.setItem("taskId", task_Id);
    }
  }, [task_Id]);

  useEffect(() => {
    if (data?.status) setAiWorkStatus(data?.status);
    if (data?.status === "success") localStorage.removeItem("taskId");
  }, [data]);

  const handleRegenerateAiWork = async (reportName: string) => {
    try {
      const res = await regenerateAiWork({ projectId, reportName });
      if (res?.task_id) {
        setTaskId(res?.task_id);
        localStorage.setItem("taskId", res?.task_id);
      }
    } catch (error) {
      const { title, description } = formatError(error);
      toast({
        title,
        description,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      {/* Add Tab Dialog */}
      <AddTabDialog
        open={isDialogOpen}
        setOpen={setDialogOpen}
        newTabTitle={newTabTitle}
        setNewTabTitle={setNewTabTitle}
        newTabDescription={newTabDescription}
        setNewTabDescription={setNewTabDescription}
        handleAddTab={handleAddTab}
      />

      <PanelGroup direction="horizontal" className="container mx-auto p-4">
        <Panel>
          {/* Header: Plus Icon & Tabs */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={allTabs} />
            <Button
              onClick={() => setDialogOpen(true)}
              className="flex gap-3 items-center rounded-md border-none bg-gray-200 hover:bg-gray-300"
              title="Add new tab"
              variant="outline"
              size="sm"
            >
              <Image src="/icons/plus.svg" height={20} width={20} alt="plus-icon" />
              Add
            </Button>
          </div>

          {/* Content Panel */}
          <div className="overflow-y-scroll max-h-[85vh]">
            {defaultTabs.includes(activeTab) && activeTab === "Crew" && (
              <CrewPage
                report={allAiReports?.data.suggested_crew}
                isPending={isPending || isPendingAiStatus}
                isError={isError || isErrorAiStatus}
                handleRegenerateAiWork={handleRegenerateAiWork}
              />
            )}
            {defaultTabs.includes(activeTab) && activeTab === "Suppliers" && (
              <SuppliersPage
                report={allAiReports?.data.suggested_suppliers}
                isPending={isPending || isPendingAiStatus}
                isError={isError || isErrorAiStatus}
                handleRegenerateAiWork={handleRegenerateAiWork}
              />
            )}
            {defaultTabs.includes(activeTab) && activeTab === "Logistics" && (
              <ReportDetails
                report={allAiReports?.data.suggested_logistics}
                isPending={isPending || isPendingAiStatus}
                isError={isError || isErrorAiStatus}
                refetch={refetch}
                handleRegenerateAiWork={handleRegenerateAiWork}
                name="logistics"
              />
            )}
            {defaultTabs.includes(activeTab) && activeTab === "Compliance" && (
              <ReportDetails
                report={allAiReports?.data.suggested_compliance}
                isPending={isPending || isPendingAiStatus}
                isError={isError || isErrorAiStatus}
                refetch={refetch}
                handleRegenerateAiWork={handleRegenerateAiWork}
                name="compliance"
              />
            )}
            {defaultTabs.includes(activeTab) && activeTab === "Culture" && (
              <ReportDetails
                report={allAiReports?.data.suggested_culture}
                isPending={isPending || isPendingAiStatus}
                isError={isError || isErrorAiStatus}
                refetch={refetch}
                handleRegenerateAiWork={handleRegenerateAiWork}
                name="culture"
              />
            )}
            {defaultTabs.includes(activeTab) && activeTab === "Budget" && (
              <ReportDetails
                report={allAiReports?.data.suggested_budget}
                isPending={isPending || isPendingAiStatus}
                isError={isError || isErrorAiStatus}
                refetch={refetch}
                handleRegenerateAiWork={handleRegenerateAiWork}
                name="budget"
              />
            )}
            {defaultTabs.includes(activeTab) && activeTab === "Sustainability" && (
              <ReportDetails
                report={allAiReports?.data.suggested_sustainability}
                isPending={isPending || isPendingAiStatus}
                isError={isError || isErrorAiStatus}
                refetch={refetch}
                handleRegenerateAiWork={handleRegenerateAiWork}
                name="sustainability"
              />
            )}
            {/* Render custom tab content */}
            {!defaultTabs.includes(activeTab) && (
              <div className="p-4">
                {customTabs.find((tab) => tab.title === activeTab) ? (
                  <>
                    <h1 className="text-2xl font-bold mb-2">{activeTab}</h1>
                    <p>{customTabs.find((tab) => tab.title === activeTab)?.description}</p>
                  </>
                ) : (
                  <p>No content available.</p>
                )}
              </div>
            )}
          </div>
        </Panel>
        <ResizeHandle />
        <Panel defaultSize={30} maxSize={70} minSize={20}>
          <ReportAIChat />
        </Panel>
      </PanelGroup>
    </>
  );
};

export default ReportsPage;
