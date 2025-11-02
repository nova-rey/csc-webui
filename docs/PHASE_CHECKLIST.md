# Phase Checklist — csc-webui

| Phase | Checkpoint | Title                            | ✅ Status   | Notes                              |
| ----: | ---------: | -------------------------------- | ----------- | ---------------------------------- |
|    P0 |         C0 | Docs Kickoff & Repo Intent       | ⬜ Pending  | Docs-only; no code                 |
|    P0 |         C1 | Project Scaffold (Vite+React+TS) | ✅ Complete | Initialized toolchain              |
|    P0 |         C2 | Routing & Config Skeleton        | ✅ Complete | Routes + env + API client stub     |
|    P0 |         C3 | Packaging & CI Seed              | ✅ Complete | `ui_static.tar.gz` + GH Action     |
|    P1 |         C0 | Docs Kickoff                     | ✅ Complete | Added phase objectives/checkpoints |
|    P1 |         C1 | API Client Core                  | ✅ Complete | Axios wrapper, types, env          |
|    P1 |         C2 | Spec Endpoints                   | ✅ Complete | list + normalize wiring            |
|    P1 |         C3 | Runs Endpoints                   | ✅ Complete | list + details                     |
|    P1 |         C4 | Error Envelope + Mock            | ✅ Complete | uniform errors + /mock-data        |
|    P1 |         C5 | Baseline & Tag                   | ✅ Complete | v0.2.0-phase1-baseline             |

**Version Compat Table**

- UI v0.1.x ↔ CSC API v1
  | P2 | C0 | Docs Kickoff | ✅ Complete | Added Spec Builder MVP plan |
  | P2 | C1 | Types & Schema | ✅ Complete | AuthoringSpec + converters |
  | P2 | C2 | UI Skeleton | ✅ Complete | Navigator + forms + panes |
  | P2 | C3 | Normalize Wire-up | ✅ Complete | /spec/normalize + preview |
  | P2 | C4 | Persistence & IO | ✅ Complete | autosave, import/export, presets |
  | P2 | C5 | Visual Map | ✅ Complete | read-only tree |
  | P2 | C6 | Baseline & Tag | ✅ Complete | v0.3.0-phase2-baseline |
  | P2 | C7 | ESLint Flat Config + Prettier + Builder Smoke Test | ✅ Complete | Migrated to flat config, added Prettier, and a Vitest render smoke test |
