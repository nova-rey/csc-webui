import axios from "axios";
import type {
  ApiResp,
  ApiOk,
  ApiErr,
  SpecSummary,
  SpecNormalizeRequest,
  SpecNormalizeResult,
  RunRecord,
  RunDetail,
  RunSummary,
  ReplayEvent,
} from "./types";
import { getMockApi } from "./mock";

const BASE = import.meta.env.VITE_CSC_BASE_URL || "http://localhost:8080/api/v1";
const TOKEN = import.meta.env.VITE_CSC_TOKEN;
const USE_MOCK = (import.meta.env.VITE_CSC_USE_MOCK || "").toLowerCase() === "true";

export function baseUrl() {
  return BASE;
}

export function authHeaders() {
  return TOKEN ? { headers: { Authorization: `Bearer ${TOKEN}` } } : {};
}

export function useMock() {
  return USE_MOCK;
}

const api = axios.create({
  baseURL: BASE,
  headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {},
  timeout: 15000,
});

function ok<T>(status: number, data: T): ApiOk<T> {
  return { ok: true, status, data };
}
function err(status: number, message: string, details?: unknown): ApiErr {
  return { ok: false, status, message, details };
}

type ApiErrorPayload = { message?: string; [key: string]: unknown } | undefined;

function normalizeError(e: unknown): ApiErr {
  if (axios.isAxiosError(e)) {
    const payload = e.response?.data as ApiErrorPayload;
    const status = e.response?.status ?? 0;
    const msg = payload?.message ?? e.message ?? "Network error";
    return err(status, msg, payload);
  }
  if (e instanceof Error) {
    return err(0, e.message, e);
  }
  return err(0, "Unknown error", e);
}

const mock = USE_MOCK ? getMockApi() : null;

export async function listSpecs(): Promise<ApiResp<SpecSummary[]>> {
  if (mock) return mock.listSpecs();
  try {
    const r = await api.get("/spec");
    return ok(r.status, r.data as SpecSummary[]);
  } catch (error) {
    return normalizeError(error);
  }
}

export async function normalizeSpec(
  body: SpecNormalizeRequest,
): Promise<ApiResp<SpecNormalizeResult>> {
  if (mock) return mock.normalizeSpec(body);
  try {
    const r = await api.post("/spec/normalize", body);
    return ok(r.status, r.data as SpecNormalizeResult);
  } catch (error) {
    return normalizeError(error);
  }
}

export async function startRun(payload: Record<string, unknown>): Promise<ApiResp<RunDetail>> {
  if (mock) return mock.startRun(payload);
  try {
    const r = await api.post("/runs/start", payload);
    return ok(r.status, r.data as RunDetail);
  } catch (error) {
    return normalizeError(error);
  }
}

export async function listRuns(): Promise<ApiResp<RunRecord[]>> {
  if (mock) return mock.listRuns();
  try {
    const r = await api.get("/runs");
    return ok(r.status, r.data as RunRecord[]);
  } catch (error) {
    return normalizeError(error);
  }
}

export async function getRun(id: string): Promise<ApiResp<RunDetail>> {
  if (mock) return mock.getRun(id);
  try {
    const r = await api.get(`/runs/${encodeURIComponent(id)}`);
    return ok(r.status, r.data as RunDetail);
  } catch (error) {
    return normalizeError(error);
  }
}

export async function getRunSummary(id: string): Promise<ApiResp<RunSummary>> {
  if (mock) return mock.getRunSummary(id);
  try {
    const r = await api.get(`/runs/${encodeURIComponent(id)}/summary`);
    return ok(r.status, r.data as RunSummary);
  } catch (error) {
    return normalizeError(error);
  }
}

export async function getRunReplay(id: string): Promise<ApiResp<ReplayEvent[]>> {
  if (mock) return mock.getRunReplay(id);
  try {
    const r = await api.get(`/runs/${encodeURIComponent(id)}/replay`);
    return ok(r.status, r.data as ReplayEvent[]);
  } catch (error) {
    return normalizeError(error);
  }
}

export async function getApiStatus(): Promise<
  { ok: boolean; api_version?: string; server?: string; time?: string; endpoints?: string[] } | { ok: false; error: string }
> {
  try {
    if (useMock()) {
      const r = await axios.get("/mock-data/status.json");
      return r.data;
    } else {
      const r = await axios.get(`${baseUrl()}/status`, authHeaders());
      // tolerant shape; many backends won't have /status yet
      return typeof r.data === "object" && r.data ? { ok: true, ...(r.data as any) } : { ok: true };
    }
  } catch (e: any) {
    return { ok: false, error: e?.message ?? "unknown error" };
  }
}
