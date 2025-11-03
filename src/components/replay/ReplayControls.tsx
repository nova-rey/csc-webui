import type { Dispatch, SetStateAction } from "react";

export default function ReplayControls({
  length,
  index,
  setIndex,
  playing,
  setPlaying,
  speed,
  setSpeed,
}: {
  length: number;
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  playing: boolean;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  speed: number;
  setSpeed: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-sm">
      <button
        onClick={() => setPlaying((p) => !p)}
        className="border px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 transition"
      >
        {playing ? "Pause" : "Play"}
      </button>
      <input
        type="range"
        min={0}
        max={Math.max(0, length - 1)}
        value={index}
        onChange={(e) => setIndex(Number(e.target.value))}
        aria-label="Scrub"
        className="w-48"
      />
      <div className="flex items-center gap-1">
        <span>Speed</span>
        <button
          onClick={() => setSpeed(0.5)}
          className={`border px-2 rounded ${speed === 0.5 ? "bg-gray-200" : "bg-white"}`}
        >
          0.5×
        </button>
        <button
          onClick={() => setSpeed(1)}
          className={`border px-2 rounded ${speed === 1 ? "bg-gray-200" : "bg-white"}`}
        >
          1×
        </button>
        <button
          onClick={() => setSpeed(2)}
          className={`border px-2 rounded ${speed === 2 ? "bg-gray-200" : "bg-white"}`}
        >
          2×
        </button>
      </div>
      <div aria-live="polite" className="ml-auto text-gray-700">
        Roll: {length === 0 ? 0 : index + 1}/{length}
      </div>
    </div>
  );
}
