import { Rule, RuleVerb } from "../../spec/authoringTypes";
const verbs: RuleVerb[] = ["switch_profile", "press", "regress", "apply_policy"];

export default function RuleForm({ value: rule, onChange }: { value: Rule; onChange: (r: Rule) => void }) {
  function setArg(key: string, val: unknown) {
    const args: Record<string, unknown> = { ...(rule.then.args ?? {}) };
    if (val === undefined || val === "") {
      delete args[key];
    } else {
      args[key] = val;
    }
    onChange({ ...rule, then: { ...rule.then, args } });
  }
  return (
    <div className="space-y-2 text-sm">
      <label className="block">
        <span className="block">Rule ID</span>
        <input
          className="w-full border rounded px-2 py-1"
          value={rule.id}
          onChange={(e) => onChange({ ...rule, id: e.target.value })}
        />
      </label>
      <label className="block">
        <span className="block">When (expression)</span>
        <input
          className="w-full border rounded px-2 py-1"
          value={rule.when}
          onChange={(e) => onChange({ ...rule, when: e.target.value })}
        />
      </label>
      <label className="block">
        <span className="block">Then (verb)</span>
        <select
          className="w-full border rounded px-2 py-1"
          value={rule.then.verb}
          onChange={(e) => onChange({ ...rule, then: { ...rule.then, verb: e.target.value as RuleVerb } })}
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
            value={String((rule.then.args ?? {}).target ?? (rule.then.args ?? {}).policy ?? "")}
            onChange={(e) => setArg("target", e.target.value)}
          />
        </label>
        <label className="block">
          <span className="block">Arg: delta/factor</span>
          <input
            className="w-full border rounded px-2 py-1"
            value={String((rule.then.args ?? {}).delta ?? (rule.then.args ?? {}).factor ?? "")}
            onChange={(e) => {
              const raw = e.target.value;
              const num = Number(raw);
              if (raw.trim() === "") {
                setArg("delta", undefined);
              } else if (Number.isFinite(num)) {
                setArg("delta", num);
              } else {
                setArg("delta", raw);
              }
            }}
          />
        </label>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <label className="block">
          <span className="block">Cooldown</span>
          <input
            type="number"
            className="w-full border rounded px-2 py-1"
            value={rule.cooldown ?? ""}
            onChange={(e) => onChange({ ...rule, cooldown: n(e.target.value) })}
          />
        </label>
        <label className="block">
          <span className="block">Scope</span>
          <select
            className="w-full border rounded px-2 py-1"
            value={rule.scope ?? ""}
            onChange={(e) => onChange({ ...rule, scope: (e.target.value as Rule["scope"]) || undefined })}
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
            value={(rule.guards ?? []).join(",")}
            onChange={(e) => onChange({ ...rule, guards: csv(e.target.value) })}
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
