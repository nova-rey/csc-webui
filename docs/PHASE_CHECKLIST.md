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

| ID    | Title                                            | ✅ Status   | Notes                                                    |
| ----- | ------------------------------------------------ | ----------- | -------------------------------------------------------- |
| P2·C0 | Docs Kickoff                                     | ✅ Complete | Added Spec Builder MVP plan                              |
| P2·C1 | Types & Schema                                   | ✅ Complete | AuthoringSpec + converters                               |
| P2·C2 | UI Skeleton                                      | ✅ Complete | Navigator + forms + panes                                |
| P2·C3 | Normalize Wire-up                                | ✅ Complete | /spec/normalize + preview                                |
| P2·C4 | Persistence & IO                                 | ✅ Complete | autosave, import/export, presets                         |
| P2·C5 | Visual Map                                       | ✅ Complete | read-only tree                                           |
| P2·C6 | Baseline & Tag                                   | ✅ Complete | v0.3.0-phase2-baseline                                   |
| P2·C7 | ESLint Flat Config + Prettier + Builder Smoke Test | ✅ Complete | Migrated to flat config, added Prettier, and a Vitest render smoke test |
| P2·C8 | Pre-Phase-3 Prep (Bundle + About Status)         | ✅ Complete | Added bundle script/ui_static.tar.gz and About status tile |
| P3·C0 | Docs Kickoff & Roadmap Sync                      | ✅ Complete | Created Phase 3 scaffold and closed Phase 2              |
| P3·C1 | Runs List View                                   | ✅ Complete | /runs table view pulling from API or mock data           |
| P3·C2 | Run Detail View                                  | ✅ Complete | Detailed summary + artifacts + replay placeholder        |
| P3·C3 | Launch & Refresh Controls                        | ✅ Complete | Start new runs and refresh list                          |
| P3·C4 | Mock & Real Data Parity                          | ✅ Complete | Added mock JSON for runs and run detail                  |
| P3·C5 | Docs, Tests & Baseline                           | ✅ Complete | Added smoke tests and tagged v0.4.0-phase3-baseline      |
| P4·C0 | Docs Kickoff & Roadmap Sync | ✅ Complete | Switched snapshot to Phase 4, closed Phase 3 |
| P4·C1 | Replay Route | ✅ Complete | Added /replay/:id with roll-by-roll view |
| P4·C2 | Run Metadata Polish | ✅ Complete | Extended RunDetail with runtime/peak/drawdown + manifest link/preview |
| P4·C3 | Replay Visualization | ✅ Complete | Lazy-loaded bankroll chart with play/pause/scrub and speed control |
| P4·C4 | Manifest Integration | ✅ Complete | Optional inline preview of manifest.json with safe viewer |
| P4·C5 | Baseline & Tests | ✅ Complete | Tests, mocks, and tag v0.5.0-phase4-baseline |

| Phase | Ckpt | Title                 | ✅ | Notes |
|------:|:----:|-----------------------|:--:|-------|
| 5     | C0   | Docs Kickoff          | ✅ | Snapshot bumped to Phase 5 |
| 5     | C1   | Baseline & Tag        | ✅ | Bundle + manifest captured; tag v0.5.0-phase4-baseline |
