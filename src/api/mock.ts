import type {
  ApiResp, ApiOk, ApiErr,
  SpecSummary, SpecNormalizeRequest, SpecNormalizeResult,
  RunRecord, RunDetail, RunSummary, ReplayEvent
} from "./types";

function ok<T>(data: T): ApiOk<T> { return { ok: true, status: 200, data }; }
function err(message: string): ApiErr { return { ok: false, status: 500, message }; }

async function load<T>(path: string): Promise<T> {
  const r = await fetch(path, { cache: "no-store" });
  if (!r.ok) throw new Error(`Mock fetch failed: ${path}`);
  return (await r.json()) as T;
}

export function getMockApi() {
  return {
    async listSpecs(): Promise<ApiResp<SpecSummary[]>> {
      try { return ok(await load<SpecSummary[]>("/mock-data/specs.json")); }
      catch (e) { return err((e as Error).message); }
    },
    async normalizeSpec(_body: SpecNormalizeRequest): Promise<ApiResp<SpecNormalizeResult>> {
      void _body;
      try { return ok(await load<SpecNormalizeResult>("/mock-data/spec_normalize.json")); }
      catch (e) { return err((e as Error).message); }
    },
    async startRun(_payload: Record<string, unknown>): Promise<ApiResp<RunDetail>> {
      void _payload;
      try { return ok(await load<RunDetail>("/mock-data/run_detail.json")); }
      catch (e) { return err((e as Error).message); }
    },
    async listRuns(): Promise<ApiResp<RunRecord[]>> {
      try { return ok(await load<RunRecord[]>("/mock-data/runs.json")); }
      catch (e) { return err((e as Error).message); }
    },
    async getRun(id: string): Promise<ApiResp<RunDetail>> {
      void id;
      try { return ok(await load<RunDetail>("/mock-data/run_detail.json")); }
      catch (e) { return err((e as Error).message); }
    },
    async getRunSummary(id: string): Promise<ApiResp<RunSummary>> {
      void id;
      try { return ok(await load<RunSummary>("/mock-data/run_summary.json")); }
      catch (e) { return err((e as Error).message); }
    },
    async getRunReplay(id: string): Promise<ApiResp<ReplayEvent[]>> {
      void id;
      try { return ok(await load<ReplayEvent[]>("/mock-data/run_replay.json")); }
      catch (e) { return err((e as Error).message); }
    },
  };
}
