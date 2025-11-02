# CSC Bible

### Checkpoint 7 — ESLint Flat Config + Prettier + Builder Smoke Test

Converted ESLint to the modern flat config (`eslint.config.js`), integrated Prettier with repo-wide scripts, and added a Vitest smoke test that mounts `Builder.tsx` under jsdom. This removes ESLint deprecation warnings and gives CI a minimal but real test.

### Checkpoint 8 — Pre-Phase-3 Prep
Introduced `build:bundle` + `scripts/build_ui_bundle.sh` to emit `ui_static.tar.gz` for embedding in CSC. Added About status tile that probes the API (or mock JSON) and surfaces base URL, token presence, and API info.
