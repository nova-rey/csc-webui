# CSC Bible

### Checkpoint 7 — ESLint Flat Config + Prettier + Builder Smoke Test

Converted ESLint to the modern flat config (`eslint.config.js`), integrated Prettier with repo-wide scripts, and added a Vitest smoke test that mounts `Builder.tsx` under jsdom. This removes ESLint deprecation warnings and gives CI a minimal but real test.

### Checkpoint 8 — Pre-Phase-3 Prep
Introduced `build:bundle` + `scripts/build_ui_bundle.sh` to emit `ui_static.tar.gz` for embedding in CSC. Added About status tile that probes the API (or mock JSON) and surfaces base URL, token presence, and API info.

### Phase 3 — Runs Dashboard
Introduced the Runs Dashboard for managing and inspecting CSC runs.
The new `/runs` route lists recent runs with status badges, start time, seed, and a “View” link.
`/runs/:id` shows bankroll summary, drawdown, artifact links, and a replay placeholder.
Mock JSONs enable offline development.
Added launch and refresh controls, smoke tests, and `v0.4.0-phase3-baseline`.
Note: Launch endpoint aligned to `POST /api/v1/runs/start` for CSC API v1; UI mocks still return `run_detail.json` for offline flows.

### Phase 4 — Replay Viewer + Metadata Polish
Adds `/replay/:id` with a lazy-loaded bankroll-vs-roll chart and simple controls (play/pause/scrub/speed).
Run Detail now surfaces runtime, peak bankroll, and drawdown when provided, and links to artifacts with an optional inline manifest preview.
Phase baseline tagged `v0.5.0-phase4-baseline`.
