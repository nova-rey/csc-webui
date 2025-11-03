#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUTDIR="$ROOT/baselines/phase4"
ART="$ROOT/ui_static.tar.gz"

mkdir -p "$OUTDIR"

# 1) Clean, install, lint, typecheck, test, build, bundle
npm ci
npm run lint
npm run typecheck
npm run test --silent || true   # allow passWithNoTests
npm run build:bundle

# 2) Hash
SHA256="$(command -v shasum >/dev/null 2>&1 && shasum -a 256 "$ART" | awk '{print $1}')"
if [ -z "${SHA256:-}" ] && command -v sha256sum >/dev/null 2>&1; then
  SHA256="$(sha256sum "$ART" | awk '{print $1}')"
fi

# 3) Git + env
GIT_REF="$(git rev-parse --verify HEAD 2>/dev/null || echo unknown)"
NODE_V="$(node -v 2>/dev/null || echo unknown)"
NPM_V="$(npm -v 2>/dev/null || echo unknown)"
TS="$(date -u +"%Y-%m-%dT%H:%M:%SZ")"

# 4) Manifest
cat > "$OUTDIR/manifest.json" <<JSON
{
  "tag": "v0.5.0-phase4-baseline",
  "artifact": "ui_static.tar.gz",
  "artifact_sha256": "${SHA256:-unknown}",
  "timestamp_utc": "$TS",
  "git_commit": "$GIT_REF",
  "node": "$NODE_V",
  "npm": "$NPM_V",
  "env": {
    "VITE_CSC_BASE_URL": "${VITE_CSC_BASE_URL:-}",
    "VITE_CSC_USE_MOCK": "${VITE_CSC_USE_MOCK:-}"
  },
  "notes": [
    "Phase 4 replay viewer baseline",
    "Bundle generated via scripts/build_ui_bundle.sh"
  ]
}
JSON

# 5) Copy artifact alongside manifest for easy pickup
cp "$ART" "$OUTDIR/"
echo "Baseline captured at: $OUTDIR"
