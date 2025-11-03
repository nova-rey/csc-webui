import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getRun } from "../api/runs";
import type { RunDetail as RunDetailType } from "../api/runs";
import RunStatusBadge from "../components/RunStatusBadge";
import ManifestPreview from "../components/ManifestPreview";

export default function RunDetail() {
  const { id } = useParams();
  const [run, setRun] = useState<RunDetailType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    getRun(id)
      .then((data) => setRun(data))
      .catch((err) => {
        console.error("Failed to load run", err);
        setError("Failed to load run");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (!id) {
    return <div>No run selected.</div>;
  }

  if (loading) {
    return <div>Loading run details…</div>;
  }

  if (error) {
    return (
      <div className="space-y-2">
        <div className="text-red-700">{error}</div>
        <Link className="text-blue-600 underline" to="/runs">
          Back to runs
        </Link>
      </div>
    );
  }

  if (!run) {
    return <div>No data available.</div>;
  }

  const drawdownPercent = run.drawdown_pct != null ? `${(run.drawdown_pct * 100).toFixed(1)}%` : "—";
  const runtime =
    typeof run.duration_ms === "number"
      ? run.duration_ms >= 60_000
        ? `${(run.duration_ms / 60000).toFixed(1)} min`
        : `${(run.duration_ms / 1000).toFixed(1)} s`
      : "—";
  const summaryPeak =
    run.summary && typeof run.summary["peak_bankroll"] === "number"
      ? (run.summary["peak_bankroll"] as number)
      : undefined;
  const peakBankroll =
    typeof run.peak === "number"
      ? `$${run.peak.toLocaleString()}`
      : typeof summaryPeak === "number"
        ? `$${summaryPeak.toLocaleString()}`
        : "—";
  const bankrollEnd = run.bankroll_end != null ? `$${run.bankroll_end.toLocaleString()}` : "—";
  const handsPlayed = run.hands_played != null ? run.hands_played.toLocaleString() : "—";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Run {run.id}</h1>
        <div className="flex items-center gap-3">
          <Link to={`/replay/${run.id}`} className="text-sm text-blue-600 underline">
            View Replay
          </Link>
          <RunStatusBadge status={run.status} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 bg-white p-4 rounded border text-sm">
        <div>
          <div className="text-gray-500">Name</div>
          <div className="font-medium">{run.name}</div>
        </div>
        <div>
          <div className="text-gray-500">Started at</div>
          <div>{new Date(run.started_at).toLocaleString()}</div>
        </div>
        <div>
          <div className="text-gray-500">Seed</div>
          <div>{run.seed ?? "—"}</div>
        </div>
        <div>
          <div className="text-gray-500">Runtime</div>
          <div>{runtime}</div>
        </div>
        <div>
          <div className="text-gray-500">Hands Played</div>
          <div>{handsPlayed}</div>
        </div>
        <div>
          <div className="text-gray-500">Bankroll End</div>
          <div>{bankrollEnd}</div>
        </div>
        <div>
          <div className="text-gray-500">Peak Bankroll</div>
          <div>{peakBankroll}</div>
        </div>
        <div>
          <div className="text-gray-500">Drawdown</div>
          <div>{drawdownPercent}</div>
        </div>
      </div>

      {run.summary && (
        <div className="bg-white p-4 rounded border">
          <h2 className="text-lg font-semibold mb-2">Summary</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            {Object.entries(run.summary).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <dt className="text-gray-600">{key}</dt>
                <dd className="font-medium">{String(value)}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {run.artifacts && Object.keys(run.artifacts).length > 0 && (
        <div className="bg-white p-4 rounded border">
          <h2 className="text-lg font-semibold mb-2">Artifacts</h2>
          <ul className="list-disc list-inside text-sm space-y-2">
            {Object.entries(run.artifacts).map(([label, href]) => (
              <li key={label}>
                <a href={href} download className="text-blue-600 underline">
                  {label}
                </a>
                {label === "manifest" && typeof href === "string" && href.endsWith(".json") && (
                  <details className="mt-1">
                    <summary className="cursor-pointer text-sm text-gray-700">Preview manifest</summary>
                    <ManifestPreview url={href} />
                  </details>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
