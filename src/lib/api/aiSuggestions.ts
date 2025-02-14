import { NEW_API_URL_V2 } from "@/constant/constant";
import { customFetch } from "./api";

export const allReportName = [
  "logistics",
  "crew",
  "budget",
  "compliance",
  "culture",
  "sustainability",
  "supplier",
] as const;

export const getSuggestions = async (projectId: string) => {
  return customFetch(`${NEW_API_URL_V2}/project/reports/generated/?project_id=${projectId}`, {
    method: "GET",
  });
};

export const getReportList = async (projectId: string) => {
  return customFetch(`${NEW_API_URL_V2}/project/reports/list/?project_id=${projectId}`, {
    method: "GET",
  });
};

export const createCustomReport = async (data: {
  project_id: string;
  name: string;
  display_name: string;
  prompt_template: string;
}) => {
  return customFetch(`${NEW_API_URL_V2}/project/custom-reports/create/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const startAiWork = async ({
  projectId,
  reportName,
}: {
  projectId: string;
  reportName?: string;
}) => {
  const regenerate = reportName ? [reportName] : allReportName;
  return customFetch(`${NEW_API_URL_V2}/project/reports/generate/?project_id=${projectId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ reports: regenerate }),
  });
};

export const getAiWorkStatus = async (taskId: string) => {
  return customFetch(`${NEW_API_URL_V2}/project/v2/taskstatus/?task_id=${taskId}`, {
    method: "GET",
  });
};

export const getRequirements = async (reqId: string) => {
  return customFetch(`${NEW_API_URL_V2}/v2/requirement/?req_id=${reqId}`, {
    method: "GET",
  });
};
