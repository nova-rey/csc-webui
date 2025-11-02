import { useEffect, useState } from "react";
import { getApiStatus } from "../api/client";

type StatusOk = { ok: true; api_version?: string; server?: string; time?: string; endpoints?: string[] };
type StatusErr = { ok: false; error: string };

export default function AboutStatus() {
  const [data, setData] = useState<StatusOk | StatusErr | null>(null);

  useEffect(() => {
    let alive = true;
    getApiStatus().then((d) => alive && setData(d as any));
    return () => {
      alive = false;
    };
  }, []);

  const base = import.meta.env.VITE_CSC_BASE_URL ?? "http://localhost:8080/api/v1";
  const token = Boolean(import.meta.env.VITE_CSC_TOKEN);
  const mock = (import.meta.env.VITE_CSC_USE_MOCK ?? "false").toLowerCase() === "true";

  return (
    <div className="rounded border p-3 text-sm bg-white">
      <div className="font-semibold mb-2">CSC API Status</div>
      <div><span className="font-medium">Base URL:</span> {base}</div>
      <div><span className="font-medium">Auth token configured:</span> {token ? "yes" : "no"}</div>
      <div><span className="font-medium">Mock mode:</span> {mock ? "true" : "false"}</div>
      <div className="mt-2">
        {data === null && <span>Checking…</span>}
        {data && "ok" in data && data.ok && (
          <div className="space-y-1">
            {data.api_version && <div><span className="font-medium">API:</span> {data.api_version}</div>}
            {data.server && <div><span className="font-medium">Server:</span> {data.server}</div>}
            {data.time && <div><span className="font-medium">Time:</span> {data.time}</div>}
            {data.endpoints && data.endpoints.length > 0 && (
              <div>
                <div className="font-medium">Endpoints:</div>
                <ul className="list-disc list-inside">
                  {data.endpoints.map((e, i) => <li key={i}>{e}</li>)}
                </ul>
              </div>
            )}
            {!data.api_version && !data.server && !data.endpoints && <div>(status endpoint responded OK)</div>}
          </div>
        )}
        {data && "ok" in data && !data.ok && (
          <div className="text-red-700">Status check failed: {data.error}</div>
        )}
      </div>
    </div>
  );
}
