import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
  type ScriptableContext,
} from "chart.js";
import type { RunReplayFrame } from "../../api/client";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

export default function ReplayChart({ frames, index }: { frames: RunReplayFrame[]; index: number }) {
  const labels = useMemo(() => frames.map((frame) => String(frame.roll)), [frames]);
  const bankroll = useMemo(() => frames.map((frame) => frame.bankroll_after), [frames]);

  const data = useMemo<ChartData<"line", number[], string>>(
    () => ({
      labels,
      datasets: [
        {
          label: "Bankroll",
          data: bankroll,
          fill: false,
          borderColor: "#4f46e5",
          backgroundColor: "#4f46e5",
          tension: 0.15,
          pointRadius: (ctx: ScriptableContext<"line">) => (ctx.dataIndex === index ? 5 : 0),
          pointHoverRadius: 6,
        },
      ],
    }),
    [labels, bankroll, index],
  );

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const options = useMemo<ChartOptions<"line">>(
    () => ({
      responsive: true,
      animation: { duration: prefersReducedMotion ? 0 : 250 },
      plugins: {
        legend: { display: false },
        tooltip: { intersect: false, mode: "nearest" },
      },
      scales: {
        x: { display: true, title: { display: true, text: "Roll" } },
        y: { display: true, title: { display: true, text: "Bankroll" } },
      },
    }),
    [prefersReducedMotion],
  );

  return <Line data={data} options={options} />;
}
