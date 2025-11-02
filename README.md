# csc-webui

A modern, browser-based UI for **CrapsSim-Control (CSC)**.

## What it is

- **Spec authoring & visualization** — build craps strategy specs via a visual editor.
- **Run orchestration** — start and monitor runs (seeded, explain mode).
- **Replay viewer** — inspect roll-by-roll events.
- **History & artifacts** — browse prior runs, download CSVs, view summaries.

## Compatibility

- UI **v0.3.x** targets **CSC API v1** (`/api/v1/...`).
- Configure the API root with `VITE_CSC_BASE_URL` (e.g., `http://localhost:8080/api/v1`).

## Quickstart

1. Copy `.env.example` → `.env.local`.
2. Set:
   - `VITE_CSC_BASE_URL=http://localhost:8080/api/v1`
   - `VITE_CSC_TOKEN=` (optional)
   - `VITE_CSC_USE_MOCK=true` (optional, to run without CSC)
3. Install and run:
   ```bash
   npm ci
   npm run dev
   ```

```

4. Open:

 * `/about` → performs a `/spec` call (or mock).
 * `/runs` → lists runs and shows details.
 * `/replay` → loads mock replay by Run ID (when mock is on).

## Builder (Phase 2)
- Navigate to `/builder` to author a spec.
- Use **Normalize** to validate/pretty-print via CSC.
- Use **Import/Export** to move specs in/out.
- Presets available: Molly, Contra (panel on the left).

## Repo Boundaries

* This repo contains **only** the Web UI (TypeScript/React). No Python.
* Packaging outputs `ui_static.tar.gz` for optional embedding into CSC’s `/ui/*` static mount.

## Roadmap (high level)

1. Phase 0 — Bootstrap (complete)
2. Phase 1 — API integration client (complete)
3. Phase 2 — Spec Builder MVP (complete)
4. Phase 3 — Runs dashboard
5. Phase 4 — Replay viewer
6. Phase 5 — Baseline & docs

See `docs/PHASE_CHECKLIST.md` for checkpoint tracking and `docs/WEBUI_SNAPSHOT.yaml` for current state.

```
