import { useEffect, useState } from "react";
import { listRuns, getRun } from "../api/client";
import type { RunRecord, RunDetail } from "../api/types";

export default function Runs() {
  const [runs, setRuns] = useState<RunRecord[] | null>(null);
  const [sel, setSel] = useState<RunDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listRuns().then((r) => r.ok ? setRuns(r.data) : setError(`${r.status}: ${r.message}`));
  }, []);

  async function openRun(id: string) {
    const r = await getRun(id);
    if (r.ok) setSel(r.data);
  }

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <h2 className="font-semibold mb-2">Runs</h2>
        <ul className="divide-y divide-gray-200 bg-white rounded shadow">
          {(runs ?? []).map((r) => (
            <li key={r.id} className="p-2 flex items-center justify-between">
              <div>
                <div className="font-mono text-sm">{r.id}</div>
                <div className="text-xs text-gray-600">{r.status} • {r.started_at}</div>
              </div>
              <button className="text-indigo-600 text-sm font-medium" onClick={() => openRun(r.id)}>
                Details
              </button>
            </li>
          ))}
        </ul>
        {error && <div className="text-sm text-red-700 mt-2">{error}</div>}
      </div>
      <div>
        <h2 className="font-semibold mb-2">Details</h2>
        {sel ? (
          <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto">
{JSON.stringify(sel, null, 2)}
          </pre>
        ) : (
          <div className="text-sm text-gray-600">Select a run.</div>
        )}
      </div>
    </div>
  );
}
