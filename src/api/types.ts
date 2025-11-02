// Basic shared primitives
export type ID = string;
export interface ApiOk<T> {
  ok: true;
  status: number;
  data: T;
}
export interface ApiErr {
  ok: false;
  status: number;
  message: string;
  details?: unknown;
}
export type ApiResp<T> = ApiOk<T> | ApiErr;

// Spec types
export interface SpecSummary {
  id: ID;
  name?: string;
  created_at?: string;
  updated_at?: string;
  notes?: string;
}

export interface SpecNormalizeRequest {
  spec: unknown;
  pretty?: boolean;
}
export interface SpecNormalizeResult {
  normalized: unknown;
  warnings?: string[];
}

// Run types
export interface RunRecord {
  id: ID;
  spec_id?: ID;
  seed?: number;
  started_at?: string;
  status?: "pending" | "running" | "done" | "error";
  label?: string;
}

export interface RunDetail extends RunRecord {
  artifacts?: {
    journal_csv?: string;
    summary_json?: string;
    manifest_json?: string;
  };
}

export interface RunSummary {
  id: ID;
  hands?: number;
  rolls?: number;
  bankroll_start?: number;
  bankroll_end?: number;
  pso_count?: number;
  notes?: string;
}

// Replay (simplified placeholder)
export interface ReplayEvent {
  t: number; // tick/sequence
  roll?: number; // dice total
  note?: string; // human-readable
}
