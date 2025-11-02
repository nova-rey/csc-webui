import { useState } from "react";
import type { ChangeEvent } from "react";
import { useBuilderStore } from "../state/builderStore";
import Navigator from "../components/builder/Navigator";
import IdentityForm from "../components/builder/IdentityForm";
import TableForm from "../components/builder/TableForm";
import ProfileForm from "../components/builder/ProfileForm";
import RuleForm from "../components/builder/RuleForm";
import JsonPreview from "../components/builder/JsonPreview";
import ErrorList from "../components/builder/ErrorList";
import VisualMap from "../components/builder/VisualMap";
import { toDraft } from "../spec/convert";
import type { AuthoringSpec } from "../spec/authoringTypes";
import { normalizeSpec } from "../api/client";
import { PRESETS } from "../spec/presets";

export default function Builder() {
  const { spec, setSpec, selected, setSelected, addProfile, removeProfile, addRule, removeRule } =
    useBuilderStore();
  const [normalized, setNormalized] = useState<unknown | null>(null);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  async function doNormalize() {
    setWarnings([]);
    setErrors([]);
    setNormalized(null);
    const draft = toDraft(spec);
    const r = await normalizeSpec({ spec: draft, pretty: true });
    if (r.ok) {
      setNormalized(r.data.normalized);
      setWarnings(Array.isArray(r.data.warnings) ? r.data.warnings : []);
    } else {
      const detailsErrors =
        (r as unknown as { details?: { errors?: string[] } }).details?.errors ?? [];
      setErrors([`${r.status}: ${r.message}`, ...detailsErrors]);
    }
  }

  function importJson(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const obj = JSON.parse(String(reader.result));
        if (!obj.identity || !obj.behavior?.rules || !obj.profiles)
          throw new Error("Invalid authoring spec shape.");
        setSpec(obj as AuthoringSpec);
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        setErrors([`Import failed: ${msg}`]);
      }
    };
    reader.readAsText(file);
  }

  function exportJson(kind: "authoring" | "normalized") {
    const data = kind === "authoring" ? spec : (normalized ?? toDraft(spec));
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = kind === "authoring" ? "authoring_spec.json" : "spec_normalized.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function loadPreset(id: string) {
    const found = PRESETS.find((p) => p.id === id);
    if (found) setSpec(JSON.parse(JSON.stringify(found.spec)) as AuthoringSpec);
  }

  const currentProfile =
    selected.kind === "profile" ? spec.profiles.find((p) => p.id === selected.id) : undefined;
  const currentRule =
    selected.kind === "rule" ? spec.behavior.rules.find((r) => r.id === selected.id) : undefined;

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      <div className="bg-white p-3 rounded shadow">
        <Navigator
          spec={spec}
          selected={selected}
          setSelected={setSelected}
          addProfile={addProfile}
          removeProfile={removeProfile}
          addRule={addRule}
          removeRule={removeRule}
        />
        <div className="mt-4 space-y-2">
          <div className="text-sm font-medium">Presets</div>
          <div className="flex gap-2">
            <button className="text-indigo-600 text-sm" onClick={() => loadPreset("molly")}>
              Molly
            </button>
            <button className="text-indigo-600 text-sm" onClick={() => loadPreset("contra")}>
              Contra
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white p-3 rounded shadow">
        <h2 className="font-semibold mb-2">Editor</h2>
        {selected.kind === "identity" && (
          <IdentityForm
            value={spec.identity}
            onChange={(v) => setSpec((s: AuthoringSpec) => ({ ...s, identity: v }))}
          />
        )}
        {selected.kind === "table" && (
          <TableForm
            value={spec.table}
            onChange={(v) => setSpec((s: AuthoringSpec) => ({ ...s, table: v }))}
          />
        )}
        {selected.kind === "profile" && currentProfile && (
          <ProfileForm
            spec={spec}
            profile={currentProfile}
            onChange={(p) =>
              setSpec((s: AuthoringSpec) => ({
                ...s,
                profiles: s.profiles.map((x) => (x.id === p.id ? p : x)),
              }))
            }
          />
        )}
        {selected.kind === "rule" && currentRule && (
          <RuleForm
            value={currentRule}
            onChange={(r) =>
              setSpec((s: AuthoringSpec) => ({
                ...s,
                behavior: {
                  ...s.behavior,
                  rules: s.behavior.rules.map((x) => (x.id === r.id ? r : x)),
                },
              }))
            }
          />
        )}
      </div>

      <div className="space-y-3">
        <div className="bg-white p-3 rounded shadow">
          <h2 className="font-semibold mb-2">Actions</h2>
          <div className="flex flex-wrap gap-2 text-sm">
            <button className="bg-indigo-600 text-white px-3 py-1 rounded" onClick={doNormalize}>
              Normalize
            </button>
            <label className="border rounded px-3 py-1 cursor-pointer">
              Import JSON
              <input
                type="file"
                accept="application/json"
                className="hidden"
                onChange={importJson}
              />
            </label>
            <button className="border rounded px-3 py-1" onClick={() => exportJson("authoring")}>
              Export Authoring
            </button>
            <button className="border rounded px-3 py-1" onClick={() => exportJson("normalized")}>
              Export Normalized
            </button>
          </div>
        </div>
        <ErrorList title="Errors" items={errors} />
        {warnings.length > 0 && (
          <div className="border border-yellow-200 bg-yellow-50 rounded p-2 text-sm">
            <div className="font-semibold text-yellow-800 mb-1">Warnings</div>
            <ul className="list-disc list-inside text-yellow-800">
              {warnings.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="bg-white p-3 rounded shadow">
          <h2 className="font-semibold mb-2">JSON (Authoring → Normalized)</h2>
          <JsonPreview json={normalized ?? toDraft(spec)} />
        </div>
        <VisualMap spec={spec} />
      </div>
    </div>
  );
}
