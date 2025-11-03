import type { RunReplayFrame } from "../../api/client";

export default function ReplayTable({ frames, index }: { frames: RunReplayFrame[]; index: number }) {
  const start = Math.max(0, index - 25);
  const end = Math.min(frames.length, index + 25);
  const slice = frames.slice(start, end);

  return (
    <div className="overflow-auto border rounded">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-2 py-1 border">Roll</th>
            <th className="px-2 py-1 border">Dice</th>
            <th className="px-2 py-1 border">Bankroll</th>
            <th className="px-2 py-1 border">Point</th>
            <th className="px-2 py-1 border">Events</th>
          </tr>
        </thead>
        <tbody>
          {slice.map((frame) => {
            const isActive = frame.roll - 1 === index;
            return (
              <tr key={frame.roll} className={isActive ? "bg-yellow-50" : undefined}>
                <td className="border px-2 py-1 text-right">{frame.roll}</td>
                <td className="border px-2 py-1">
                  {frame.dice[0]} + {frame.dice[1]}
                </td>
                <td className="border px-2 py-1 text-right">{frame.bankroll_after}</td>
                <td className="border px-2 py-1 text-center">{frame.point_on ?? "—"}</td>
                <td className="border px-2 py-1">
                  {(frame.events ?? []).length > 0 ? (frame.events ?? []).join(", ") : "—"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
