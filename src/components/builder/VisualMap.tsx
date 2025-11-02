import { AuthoringSpec } from "../../spec/authoringTypes";
export default function VisualMap({ spec }: { spec: AuthoringSpec }) {
  return (
    <div className="text-sm border rounded p-2 bg-white">
      <div className="font-semibold mb-1">Map</div>
      <div className="grid md:grid-cols-2 gap-2">
        <div>
          <div className="font-medium">Profiles</div>
          <ul className="list-disc list-inside">
            {spec.profiles.map((p) => (
              <li key={p.id}>
                {p.name}: {p.base_bets.map((b) => b.kind).join(", ") || "—"}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-medium">Rules</div>
          <ul className="list-disc list-inside">
            {spec.behavior.rules.map((r) => (
              <li key={r.id}>
                <span className="font-mono">{r.id}</span> — when <em>{r.when}</em> then{" "}
                <code>{r.then.verb}</code>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
