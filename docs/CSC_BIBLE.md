# CSC Bible

### Checkpoint 7 — ESLint Flat Config + Prettier + Builder Smoke Test

Converted ESLint to the modern flat config (`eslint.config.js`), integrated Prettier with repo-wide scripts, and added a Vitest smoke test that mounts `Builder.tsx` under jsdom. This removes ESLint deprecation warnings and gives CI a minimal but real test.
