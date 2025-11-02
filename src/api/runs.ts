import axios from "axios";
import { authHeaders, baseUrl, isMockEnabled } from "./client";

export interface RunSummary {
  id: string;
  name: string;
  status: string;
  seed: number;
  started_at: string;
}

export interface RunDetail extends RunSummary {
  bankroll_end?: number;
  hands_played?: number;
  drawdown_pct?: number;
  artifacts?: Record<string, string>;
  summary?: Record<string, unknown>;
}

export async function listRuns(): Promise<RunSummary[]> {
  if (isMockEnabled()) return (await axios.get("/mock-data/runs.json")).data;
  const response = await axios.get(`${baseUrl()}/runs`, authHeaders());
  return response.data;
}

export async function getRun(id: string): Promise<RunDetail> {
  if (isMockEnabled()) return (await axios.get("/mock-data/run_detail.json")).data;
  const response = await axios.get(`${baseUrl()}/runs/${id}`, authHeaders());
  return response.data;
}

export async function launchRun(payload: Record<string, unknown> = {}): Promise<RunDetail> {
  if (isMockEnabled()) return (await axios.get("/mock-data/run_detail.json")).data;
  const response = await axios.post(`${baseUrl()}/runs`, payload, authHeaders());
  return response.data;
}
