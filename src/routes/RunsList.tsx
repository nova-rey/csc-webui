import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listRuns, launchRun } from "../api/runs";
import type { RunSummary } from "../api/runs";
import RunStatusBadge from "../components/RunStatusBadge";

export default function RunsList() {
  const [runs, setRuns] = useState<RunSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const [launching, setLaunching] = useState(false);

  async function refresh() {
    setLoading(true);
    try {
      setRuns(await listRuns());
    } catch (err) {
      console.error("Failed to load runs", err);
    } finally {
      setLoading(false);
    }
  }

  async function startRun() {
    setLaunching(true);
    try {
      await launchRun({ spec_id: "demo" });
      await refresh();
    } catch (err) {
      console.error("Failed to launch run", err);
    } finally {
      setLaunching(false);
    }
  }

  useEffect(() => {
    refresh();
    const timer = setInterval(refresh, 15000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Runs</h1>
        <div className="space-x-2">
          <button
            onClick={refresh}
            disabled={loading}
            className="border px-3 py-1 rounded bg-gray-100 disabled:opacity-60"
          >
            {loading ? "Refreshing…" : "Refresh"}
          </button>
          <button
            onClick={startRun}
            disabled={launching}
            className="border px-3 py-1 rounded bg-green-100 disabled:opacity-60"
          >
            {launching ? "Launching…" : "Start Run"}
          </button>
        </div>
      </div>

      <table className="min-w-full border text-sm bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-2 py-1 border">ID</th>
            <th className="px-2 py-1 border">Name</th>
            <th className="px-2 py-1 border">Status</th>
            <th className="px-2 py-1 border">Seed</th>
            <th className="px-2 py-1 border">Started</th>
            <th className="px-2 py-1 border"></th>
          </tr>
        </thead>
        <tbody>
          {runs.map((run) => (
            <tr key={run.id}>
              <td className="border px-2 py-1 font-mono text-xs md:text-sm">{run.id}</td>
              <td className="border px-2 py-1">{run.name}</td>
              <td className="border px-2 py-1">
                <RunStatusBadge status={run.status} />
              </td>
              <td className="border px-2 py-1">{run.seed}</td>
              <td className="border px-2 py-1">{new Date(run.started_at).toLocaleString()}</td>
              <td className="border px-2 py-1 text-right">
                <Link className="underline text-blue-600" to={`/runs/${run.id}`}>
                  View
                </Link>
              </td>
            </tr>
          ))}
          {runs.length === 0 && (
            <tr>
              <td colSpan={6} className="text-center py-3 text-sm text-gray-600">
                No runs found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
