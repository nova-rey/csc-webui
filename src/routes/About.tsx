import AboutStatus from "../components/AboutStatus";

export default function About() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">About CSC Web UI</h1>
      <p className="text-sm">
        This interface targets CSC API v1 for spec authoring, run orchestration, and replay.
      </p>
      <AboutStatus />
    </div>
  );
}
