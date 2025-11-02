import type { AuthoringSpec } from "../../spec/authoringTypes";

export default function Navigator(props: {
  spec: AuthoringSpec;
  selected: { kind: "identity" | "table" | "profile" | "rule"; id?: string };
  setSelected: (
    _selection: { kind: "identity" | "table" | "profile" | "rule"; id?: string },
  ) => void;
  addProfile: () => void;
  removeProfile: (_id: string) => void;
  addRule: () => void;
  removeRule: (_id: string) => void;
}) {
  const { spec, selected } = props;
  return (
    <aside className="space-y-4">
      <div>
        <h3 className="font-semibold mb-2">Spec</h3>
        <ul className="text-sm">
          <li>
            <button
              className={selClass(selected.kind === "identity")}
              onClick={() => props.setSelected({ kind: "identity" })}
            >
              Identity
            </button>
          </li>
          <li>
            <button
              className={selClass(selected.kind === "table")}
              onClick={() => props.setSelected({ kind: "table" })}
            >
              Table
            </button>
          </li>
        </ul>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Profiles</h3>
        <button className="text-indigo-600 text-sm mb-2" onClick={props.addProfile}>
          + Add Profile
        </button>
        <ul className="text-sm space-y-1">
          {spec.profiles.map((p) => (
            <li key={p.id} className="flex items-center justify-between">
              <button
                className={selClass(selected.kind === "profile" && selected.id === p.id)}
                onClick={() => props.setSelected({ kind: "profile", id: p.id })}
              >
                {p.name || p.id}
              </button>
              <button className="text-red-600" onClick={() => props.removeProfile(p.id)}>
                ×
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Rules</h3>
        <button className="text-indigo-600 text-sm mb-2" onClick={props.addRule}>
          + Add Rule
        </button>
        <ul className="text-sm space-y-1">
          {spec.behavior.rules.map((r) => (
            <li key={r.id} className="flex items-center justify-between">
              <button
                className={selClass(selected.kind === "rule" && selected.id === r.id)}
                onClick={() => props.setSelected({ kind: "rule", id: r.id })}
              >
                {r.id}
              </button>
              <button className="text-red-600" onClick={() => props.removeRule(r.id)}>
                ×
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
function selClass(active: boolean) {
  return `px-2 py-1 rounded ${active ? "bg-indigo-100 text-indigo-800" : "hover:bg-gray-100"}`;
}
