import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getRun, RunDetail as RunDetailType } from "../api/runs";
import RunStatusBadge from "../components/RunStatusBadge";

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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Run {run.id}</h1>
        <RunStatusBadge status={run.status} />
      </div>

      <div className="grid md:grid-cols-2 gap-4 bg-white p-4 rounded border text-sm">
        <div>
          <div className="text-gray-500">Name</div>
          <div className="font-medium">{run.name}</div>
        </div>
        <div>
          <div className="text-gray-500">Started</div>
          <div>{new Date(run.started_at).toLocaleString()}</div>
        </div>
        <div>
          <div className="text-gray-500">Seed</div>
          <div>{run.seed ?? "—"}</div>
        </div>
        <div>
          <div className="text-gray-500">Bankroll End</div>
          <div>{run.bankroll_end != null ? `$${run.bankroll_end.toLocaleString()}` : "—"}</div>
        </div>
        <div>
          <div className="text-gray-500">Hands Played</div>
          <div>{run.hands_played ?? "—"}</div>
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

      {run.artifacts && (
        <div className="bg-white p-4 rounded border">
          <h2 className="text-lg font-semibold mb-2">Artifacts</h2>
          <ul className="list-disc list-inside text-sm">
            {Object.entries(run.artifacts).map(([key, value]) => (
              <li key={key}>
                <a className="text-blue-600 underline" href={value} download>
                  {key}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="bg-white p-4 rounded border text-sm text-gray-600">
        <p>Replay feature coming soon…</p>
      </div>
    </div>
  );
}
