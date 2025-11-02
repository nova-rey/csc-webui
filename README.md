# csc-webui

A modern, browser-based UI for **CrapsSim-Control (CSC)**.

## What it is
- **Spec authoring & visualization** — build craps strategy specs via a visual editor.
- **Run orchestration** — start and monitor runs (seeded, explain mode).
- **Replay viewer** — inspect roll-by-roll events.
- **History & artifacts** — browse prior runs, download CSVs, view summaries.

## Compatibility
- UI **v0.1.x** targets **CSC API v1** (`/api/v1/...`).
- Configure the API root with `VITE_CSC_BASE_URL` (e.g., `http://localhost:8080/api/v1`).

## Repo Boundaries
- This repo contains **only** the Web UI (TypeScript/React). No Python.
- Packaging outputs `ui_static.tar.gz` for optional embedding into CSC’s `/ui/*` static mount.

## Roadmap (high level)
1. Phase 0 — Bootstrap (you are here)
2. Phase 1 — API integration client
3. Phase 2 — Spec Builder MVP
4. Phase 3 — Runs dashboard
5. Phase 4 — Replay viewer
6. Phase 5 — Baseline & docs

See `docs/PHASE_CHECKLIST.md` for checkpoint-level tracking and `docs/WEBUI_SNAPSHOT.yaml` for current state.
