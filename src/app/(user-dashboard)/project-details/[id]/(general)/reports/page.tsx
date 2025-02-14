"use client";

import { useEffect, useState, useMemo, FormEvent } from "react";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import { Panel, PanelGroup } from "react-resizable-panels";
import { useToast } from "@/components/ui/use-toast";
import CrewPage from "@/components/report/CrewPage";
import ReportDetails from "@/components/report/ReportDetails";
import SuppliersPage from "@/components/report/SuppliersPage";
import Tabs from "@/components/Tabs";
import ResizeHandle from "@/components/report/ResizeHandle";
import ReportAIChat from "@/components/report/ReportAIChat";
import { AddTabDialog } from "@/components/report/AddTabDialog";
import { Button } from "@/components/ui/button";

import {
  useCreateCustomReport,
  useGetAiWorkStatus,
  useGetReportList,
  useGetSuggestions,
  useStartAIWork,
} from "@/lib/react-query/queriesAndMutations/aiSuggestions";
import { formatError } from "@/lib/utils";

interface ReportTab {
  id: number;
  type: "system" | "custom";
  title: string;
  description?: string;
}

const ReportsPage = () => {
  const { toast } = useToast();
  const { id: projectId }: { id: string } = useParams();
  const searchParams = useSearchParams();
  const task_Id = searchParams.get("taskId");

  // Active tab state
  const [activeTab, setActiveTab] = useState<ReportTab | null>(null);
  const [aiWorkStatus, setAiWorkStatus] = useState<"pending" | "success">("pending");
  const [taskId, setTaskId] = useState<string | null>(() => localStorage.getItem("taskId"));

  // Add Tab dialog state
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [newTabTitle, setNewTabTitle] = useState("");
  const [newTabDescription, setNewTabDescription] = useState("");

  // Get tab data from API (system_reports & custom_reports)
  const {
    data: tabList,
    isPending: isPendingTablist,
    isError: isErrorTablist,
    refetch: refetchTabList,
  } = useGetReportList(projectId);

  // Wrap the initialization of allTabs in useMemo to avoid unnecessary re-creation.
  const allTabs: ReportTab[] = useMemo(() => {
    const systemTabs: ReportTab[] =
      tabList?.system_reports?.map((rep: any) => ({
        id: rep.id,
        type: "system" as const,
        title: rep.name.charAt(0).toUpperCase() + rep.name.slice(1),
      })) || [];
    const customTabs: ReportTab[] =
      tabList?.custom_reports?.map((rep: any) => ({
        id: rep.id,
        type: "custom" as const,
        title: rep.name
          .split("_")
          .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" "),
        description: rep.description, // if description exists
      })) || [];
    return [...systemTabs, ...customTabs];
  }, [tabList]);

  // Set initial active tab if not already set.
  useEffect(() => {
    if (!activeTab && allTabs.length > 0) {
      setActiveTab(allTabs[0]);
    }
  }, [activeTab, allTabs]);

  // Mutation to create a new custom report (i.e. add a new tab)
  const {
    mutateAsync: createCustomReport,
    isPending: isPendingCreateCustomReport,
    isError: isErrorCreateCustomReport,
  } = useCreateCustomReport();

  // Get AI status and suggestions.
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
    if (data?.status) setAiWorkStatus(data.status);
    if (data?.status === "success") localStorage.removeItem("taskId");
  }, [data]);

  const handleRegenerateAiWork = async (reportName: string) => {
    try {
      const res = await regenerateAiWork({ projectId, reportName });
      if (res?.task_id) {
        setTaskId(res.task_id);
        localStorage.setItem("taskId", res.task_id);
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

  // Handle adding a new custom tab.
  const handleAddTab = async (e: FormEvent) => {
    e.preventDefault();
    if (newTabTitle.trim() !== "") {
      const transformData = {
        project_id: projectId,
        name: newTabTitle.toLowerCase().replaceAll(" ", "_"),
        display_name: newTabTitle,
        prompt_template: `Given the following project details, suggest me ${newTabDescription}, and any relevant recommendations:\nProject Budget: {budget_currency}{budget}\nProject Brief: {project_brief}\n\nFormat requirements:\n- Use markdown with header levels ## for sections, ### for subsections\n- Include tables for cost comparisons\n- Use :warning: emoji for critical risks\n- Reference related report data where applicable`,
      };
      try {
        const newReport = await createCustomReport(transformData);
        // Set the newly added tab as active.
        setActiveTab({
          id: newReport.id,
          type: "custom",
          title: newTabTitle
            .split("_")
            .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" "),
          description: newTabDescription,
        });
        handleRegenerateAiWork(newTabTitle.toLocaleLowerCase().replaceAll(" ", "_"));
        setNewTabTitle("");
        setNewTabDescription("");
        setDialogOpen(false);
      } catch (error) {
        const { title, description } = formatError(error);
        toast({
          title,
          description,
          variant: "destructive",
        });
      }
    }
  };

  // Render the content based on the active tab.
  const renderActiveTabContent = () => {
    if (!activeTab) return <div>No active tab</div>;

    // For system and custom reports, match using report_type.
    const reportItem = allAiReports?.reports?.find((report: any) => {
      if (activeTab.type === "system") {
        return report.report_type === "systemreport" && report.report_id === activeTab.id;
      } else {
        return report.report_type === "customreport" && report.report_id === activeTab.id;
      }
    });
    const lowerTitle = activeTab.title.toLowerCase();

    // Use dedicated components for "crew" and "supplier", otherwise use ReportDetails.
    let Component;
    if (lowerTitle === "crew") {
      Component = CrewPage;
    } else if (lowerTitle === "supplier") {
      Component = SuppliersPage;
    } else {
      Component = ReportDetails;
    }

    const commonProps = {
      report: reportItem ? reportItem.data : null,
      isPending: isPending || isPendingAiStatus,
      isError: isError || isErrorAiStatus,
      handleRegenerateAiWork,
      refetch,
    };

    return <Component {...commonProps} name={lowerTitle} />;
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
          {/* Tabs Header with Add Button */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <Tabs
              activeTab={activeTab ? activeTab.title : ""}
              setActiveTab={(title: string) => {
                const selectedTab = allTabs.find((tab) => tab.title === title);
                if (selectedTab) setActiveTab(selectedTab);
              }}
              tabs={allTabs.map((tab) => tab.title)}
            />
            <Button
              onClick={() => setDialogOpen(true)}
              className="flex gap-1.5 px-4 items-center rounded-md border-none bg-gray-200 hover:bg-gray-300"
              title="Add new tab"
              variant="outline"
              size="sm"
            >
              <Image src="/icons/plus.svg" height={20} width={20} alt="plus-icon" />
              Add
            </Button>
          </div>
          {/* Content Panel */}
          <div className="overflow-y-scroll max-h-[85vh]">{renderActiveTabContent()}</div>
        </Panel>
        <ResizeHandle />
        <Panel defaultSize={25} maxSize={60} minSize={20}>
          <ReportAIChat />
        </Panel>
      </PanelGroup>
    </>
  );
};

export default ReportsPage;
