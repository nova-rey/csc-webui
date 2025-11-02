import { TableSettings } from "../../spec/authoringTypes";
const profiles = ["3-4-5x", "1x", "2x", "20x", "custom"] as const;
export default function TableForm({ value, onChange }: { value: TableSettings; onChange: (v: TableSettings) => void }) {
  return (
    <div className="grid grid-cols-2 gap-3 text-sm">
      <label className="block">
        <span className="block">Min Bet</span>
        <input
          type="number"
          className="w-full border rounded px-2 py-1"
          value={value.min_bet ?? ""}
          onChange={(e) => onChange({ ...value, min_bet: num(e.target.value) })}
        />
      </label>
      <label className="block">
        <span className="block">Max Bet</span>
        <input
          type="number"
          className="w-full border rounded px-2 py-1"
          value={value.max_bet ?? ""}
          onChange={(e) => onChange({ ...value, max_bet: num(e.target.value) })}
        />
      </label>
      <label className="block col-span-2">
        <span className="block">Odds Profile</span>
        <select
          className="w-full border rounded px-2 py-1"
          value={value.odds_profile ?? "3-4-5x"}
          onChange={(e) =>
            onChange({ ...value, odds_profile: e.target.value as TableSettings["odds_profile"] })
          }
        >
          {profiles.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
function num(v: string) {
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}
