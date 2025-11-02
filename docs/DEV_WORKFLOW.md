# Dev Workflow — csc-webui

## Rhythm
1) **Brief → No-flavor agent prompt → Agent run → Validation → Doc sync**  
2) One checkpoint = one reversible commit (PR).

## Semantics
- Commits use: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `build:`.
- Versioning follows SemVer; UI starts at **v0.1.0**.

## Phase 0 Plan
- **P0·C0** (Docs-only): establish scope and guardrails.
- **P0·C1**: Vite+React+TS scaffold; Tailwind setup; basic scripts.
- **P0·C2**: React Router routes; env wiring; API client stub.
- **P0·C3**: `scripts/build_ui_bundle.sh` + GitHub Action to publish `ui_static.tar.gz`.

## Lint/Format (coming in P0·C1)
- ESLint + Prettier with sensible defaults.
- EditorConfig optional, but enforce via ESLint where possible.

## CI (seed in P0·C3)
- Node LTS matrix build (install → build → upload artifact).
