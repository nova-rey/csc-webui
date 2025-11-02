import { useState } from "react";
import { getRunReplay } from "../api/client";
import type { ReplayEvent } from "../api/types";

export default function Replay() {
  const [runId, setRunId] = useState("");
  const [events, setEvents] = useState<ReplayEvent[] | null>(null);

  async function load() {
    if (!runId) return;
    const r = await getRunReplay(runId);
    if (r.ok) setEvents(r.data);
  }

  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold">Replay (Preview)</h1>
      <div className="flex gap-2">
        <input
          className="border rounded px-2 py-1 text-sm"
          placeholder="Run ID (e.g., run_1001)"
          value={runId}
          onChange={(e) => setRunId(e.target.value)}
        />
        <button className="bg-indigo-600 text-white px-3 py-1 rounded text-sm" onClick={load}>
          Load
        </button>
      </div>
      {events && (
        <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto">
{JSON.stringify(events, null, 2)}
        </pre>
      )}
    </div>
  );
}
