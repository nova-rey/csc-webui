import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { getRunReplay, type RunReplayFrame, type RunReplayPayload } from "../api/client";
import ReplayControls from "../components/replay/ReplayControls";
import ReplayTable from "../components/replay/ReplayTable";

const chartMode = (import.meta.env.VITE_CSC_REPLAY_CHART ?? "full").toLowerCase();
const ReplayChartLazy = chartMode === "off" ? null : lazy(() => import("../components/replay/ReplayChart"));

export default function Replay() {
  const { id } = useParams();
  const [frames, setFrames] = useState<RunReplayFrame[]>([]);
  const [meta, setMeta] = useState<RunReplayPayload["meta"]>();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    setPlaying(false);
    getRunReplay(id)
      .then((payload) => {
        const list = Array.isArray(payload?.frames) ? payload.frames : [];
        setFrames(list);
        setMeta(payload?.meta);
        setIndex(0);
      })
      .catch((e: Error) => {
        setFrames([]);
        setMeta(undefined);
        setError(e.message || "Failed to load replay");
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (index >= frames.length && frames.length > 0) {
      setIndex(frames.length - 1);
    }
  }, [frames.length, index]);

  useEffect(() => {
    if (!playing || frames.length === 0) return;
    const baseMs = 400;
    const intervalMs = Math.max(50, baseMs / Math.max(speed, 0.25));
    const timer = window.setInterval(() => {
      setIndex((prev) => {
        if (prev >= frames.length - 1) {
          setPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, intervalMs);
    return () => window.clearInterval(timer);
  }, [playing, speed, frames.length]);

  useEffect(() => {
    if (frames.length === 0) {
      setPlaying(false);
      setIndex(0);
    }
  }, [frames.length]);

  const current = frames[index];

  const summary = useMemo(() => {
    if (!meta) return [] as Array<{ label: string; value: string }>;
    const items: Array<{ label: string; value: string }> = [];
    if (typeof meta.seed === "number") items.push({ label: "Seed", value: String(meta.seed) });
    if (typeof meta.started_at === "string")
      items.push({ label: "Started", value: new Date(meta.started_at).toLocaleString() });
    if (typeof meta.duration_ms === "number") {
      const seconds = meta.duration_ms / 1000;
      const formatted = seconds >= 60 ? `${(seconds / 60).toFixed(1)} min` : `${seconds.toFixed(1)} s`;
      items.push({ label: "Runtime", value: formatted });
    }
    if (typeof meta.peak === "number") items.push({ label: "Peak Bankroll", value: meta.peak.toLocaleString() });
    if (typeof meta.drawdown_pct === "number")
      items.push({ label: "Drawdown", value: `${(meta.drawdown_pct * 100).toFixed(1)}%` });
    return items;
  }, [meta]);

  if (!id) {
    return <div className="text-sm text-gray-600">No replay specified.</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-2">
        <h1 className="text-2xl font-semibold">Replay {id}</h1>
        {loading && <span className="text-sm text-gray-500">Loading…</span>}
      </div>

      {error && <div className="text-sm text-red-600">{error}</div>}

      {summary.length > 0 && (
        <div className="flex flex-wrap gap-4 text-sm bg-white border rounded p-3">
          {summary.map((item) => (
            <div key={item.label} className="flex flex-col">
              <span className="text-gray-500">{item.label}</span>
              <span className="font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      )}

      <ReplayControls
        length={frames.length}
        index={index}
        setIndex={setIndex}
        playing={playing}
        setPlaying={setPlaying}
        speed={speed}
        setSpeed={setSpeed}
      />

      {ReplayChartLazy ? (
        <Suspense fallback={<div className="text-sm text-gray-600">Loading chart…</div>}>
          <ReplayChartLazy frames={frames} index={index} />
        </Suspense>
      ) : (
        <div className="text-sm text-gray-600">(Chart disabled; showing table view)</div>
      )}

      {current && (
        <div className="bg-white border rounded p-3 text-sm">
          <h2 className="font-semibold mb-2">Current Roll</h2>
          <div className="grid sm:grid-cols-3 gap-2">
            <div>
              <div className="text-gray-500">Roll</div>
              <div>{current.roll}</div>
            </div>
            <div>
              <div className="text-gray-500">Dice</div>
              <div>
                {current.dice[0]} + {current.dice[1]}
              </div>
            </div>
            <div>
              <div className="text-gray-500">Bankroll</div>
              <div>{current.bankroll_after}</div>
            </div>
          </div>
          <div className="mt-2 text-gray-600">
            Point: {current.point_on ?? "—"} · Events: {(current.events ?? []).join(", ") || "—"}
          </div>
        </div>
      )}

      {frames.length === 0 && !loading && (
        <div className="text-sm text-gray-600">No replay frames available.</div>
      )}

      <ReplayTable frames={frames} index={index} />
    </div>
  );
}
