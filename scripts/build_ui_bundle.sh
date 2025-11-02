#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DIST_DIR="$ROOT_DIR/dist"
OUT_TAR="$ROOT_DIR/ui_static.tar.gz"

if [ ! -d "$DIST_DIR" ]; then
  echo "dist/ not found. Run 'npm run build' first." >&2
  exit 1
fi

# Create a clean tarball of the production bundle
cd "$ROOT_DIR"
tar -czf "$OUT_TAR" dist

echo "Wrote $OUT_TAR"
