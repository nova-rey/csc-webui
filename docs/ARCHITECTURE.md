# Architecture — csc-webui

## Overview

- **Frontend only**: React + TypeScript (Vite).
- **Design system**: minimal, accessible (Tailwind in P0·C1).
- **Data layer**: small fetch/axios wrapper targeting `/api/v1/*`.
- **Packaging**: `dist/` → `ui_static.tar.gz` for optional CSC embedding.

## Modules (planned)

- `api/` — typed client for `spec/*`, `runs*`, `summarize`, `replay`.
- `routes/` — `/builder`, `/runs`, `/replay`, `/about`.
- `builder/` — MVP: hierarchical form; later: graph editor.
- `replay/` — timeline renderer; playback throttle.
- `components/` — small, composable UI primitives.

## Config

- `VITE_CSC_BASE_URL` — API root (e.g., `http://localhost:8080/api/v1`).
- `VITE_CSC_TOKEN` — optional bearer for endpoints requiring auth.

## Guardrails

- No direct coupling to CSC internals; only the HTTP contract.
- All calls go through the API client; no stray `fetch()` in components.
- Semantic commits; version tags parallel to CSC.

## API Client (Phase 1)

- All HTTP lives in `src/api/` with a small axios wrapper.
- Env: `VITE_CSC_BASE_URL`, `VITE_CSC_TOKEN`, optional `VITE_CSC_USE_MOCK=true`.
- Response shape is normalized to `{ ok, status, data }` or `{ ok:false, status, message }`.
- Mock mode serves JSON from `/mock-data/*` when the API is unavailable.

## Spec Builder (Phase 2)

- Authoring types in `src/spec/`.
- Conversion `authoring → draft` via `src/spec/convert.ts`.
- `/builder` provides navigator, editor forms, and an output panel with Normalize.
- Persistence: localStorage autosave.
- Import/Export: JSON for authoring or normalized output.
- Visual map: read-only tree (profiles + rules).
