import { Rule, RuleVerb } from "../../spec/authoringTypes";
const verbs: RuleVerb[] = ["switch_profile", "press", "regress", "apply_policy"];

export default function RuleForm({
  value,
  onChange,
}: {
  value: Rule;
  onChange: (r: Rule) => void;
}) {
  function setArg<K extends string>(k: K, v: unknown) {
    const args = { ...(value.then.args ?? {}), [k]: v } as Record<string, unknown>;
    onChange({ ...value, then: { ...value.then, args } });
  }
  const thenArgs = (value.then.args ?? {}) as Record<string, unknown>;
  const targetOrPolicy = thenArgs["target"] ?? thenArgs["policy"] ?? "";
  const deltaOrFactor = thenArgs["delta"] ?? thenArgs["factor"] ?? "";
  return (
    <div className="space-y-2 text-sm">
      <label className="block">
        <span className="block">Rule ID</span>
        <input
          className="w-full border rounded px-2 py-1"
          value={value.id}
          onChange={(e) => onChange({ ...value, id: e.target.value })}
        />
      </label>
      <label className="block">
        <span className="block">When (expression)</span>
        <input
          className="w-full border rounded px-2 py-1"
          value={value.when}
          onChange={(e) => onChange({ ...value, when: e.target.value })}
        />
      </label>
      <label className="block">
        <span className="block">Then (verb)</span>
        <select
          className="w-full border rounded px-2 py-1"
          value={value.then.verb}
          onChange={(e) =>
            onChange({ ...value, then: { ...value.then, verb: e.target.value as RuleVerb } })
          }
        >
          {verbs.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </label>
      <div className="grid grid-cols-2 gap-2">
        <label className="block">
          <span className="block">Arg: target/policy</span>
          <input
            className="w-full border rounded px-2 py-1"
            value={String(targetOrPolicy)}
            onChange={(e) => setArg("target", e.target.value)}
          />
        </label>
        <label className="block">
          <span className="block">Arg: delta/factor</span>
          <input
            className="w-full border rounded px-2 py-1"
            value={String(deltaOrFactor)}
            onChange={(e) =>
              setArg(
                "delta",
                Number.isFinite(Number(e.target.value)) ? Number(e.target.value) : e.target.value,
              )
            }
          />
        </label>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <label className="block">
          <span className="block">Cooldown</span>
          <input
            type="number"
            className="w-full border rounded px-2 py-1"
            value={value.cooldown ?? ""}
            onChange={(e) => onChange({ ...value, cooldown: n(e.target.value) })}
          />
        </label>
        <label className="block">
          <span className="block">Scope</span>
          <select
            className="w-full border rounded px-2 py-1"
            value={value.scope ?? ""}
            onChange={(e) =>
              onChange({ ...value, scope: (e.target.value || undefined) as Rule["scope"] })
            }
          >
            <option value="">—</option>
            <option>roll</option>
            <option>hand</option>
            <option>session</option>
          </select>
        </label>
        <label className="block">
          <span className="block">Guards (csv)</span>
          <input
            className="w-full border rounded px-2 py-1"
            value={(value.guards ?? []).join(",")}
            onChange={(e) => onChange({ ...value, guards: csv(e.target.value) })}
          />
        </label>
      </div>
    </div>
  );
}
function n(v: string) {
  const x = Number(v);
  return Number.isFinite(x) ? x : undefined;
}
function csv(v: string) {
  return v
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}
