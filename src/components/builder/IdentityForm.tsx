import { Identity } from "../../spec/authoringTypes";
export default function IdentityForm({ value, onChange }: { value: Identity; onChange: (v: Identity) => void }) {
  return (
    <div className="space-y-2">
      <label className="block text-sm">
        <span className="block">Name</span>
        <input
          className="w-full border rounded px-2 py-1"
          value={value.name}
          onChange={(e) => onChange({ ...value, name: e.target.value })}
        />
      </label>
      <label className="block text-sm">
        <span className="block">Version</span>
        <input
          className="w-full border rounded px-2 py-1"
          value={value.version ?? ""}
          onChange={(e) => onChange({ ...value, version: e.target.value || undefined })}
        />
      </label>
      <label className="block text-sm">
        <span className="block">Notes</span>
        <textarea
          className="w-full border rounded px-2 py-1"
          value={value.notes ?? ""}
          onChange={(e) => onChange({ ...value, notes: e.target.value || undefined })}
        />
      </label>
    </div>
  );
}
