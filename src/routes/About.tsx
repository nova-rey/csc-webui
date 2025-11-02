import { useEffect, useState } from "react";
import { listSpecs } from "../api/client";
import type { SpecSummary } from "../api/types";

export default function About() {
  const [specs, setSpecs] = useState<SpecSummary[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listSpecs().then((r) => {
      if (r.ok) setSpecs(r.data);
      else setError(`${r.status}: ${r.message}`);
    });
  }, []);

  return (
    <div className="space-y-3">
      <h1 className="text-xl font-semibold">About CSC Web UI</h1>
      <p className="text-sm text-gray-600">
        This page performs a live call to <code>/api/v1/spec</code> (or mock).
      </p>
      {error && <pre className="text-red-700 bg-red-50 p-3 rounded">{error}</pre>}
      {specs && (
        <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto">
{JSON.stringify(specs, null, 2)}
        </pre>
      )}
    </div>
  );
}
