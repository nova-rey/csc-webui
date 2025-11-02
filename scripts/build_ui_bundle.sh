#!/usr/bin/env bash
set -e
npm run build
tar -czf ui_static.tar.gz -C dist .
echo "✅ Built ui_static.tar.gz"
