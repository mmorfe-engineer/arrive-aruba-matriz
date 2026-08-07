#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

INPUT_DIR="${1:-${JOURNEY_RENDER_DIR:-}}"
OUTPUT_DIR="${2:-${REPO_DIR}/preview-assets/journey}"

if [[ -z "${INPUT_DIR}" ]]; then
  echo "Usage: tools/build-journey-sheets.sh /path/to/renders/journey [output-dir]" >&2
  echo "Expected input subdirectories: shade/ (frames 1-90) and push/ (frames 91-130)." >&2
  exit 64
fi

for command_name in python3 cwebp; do
  if ! command -v "${command_name}" >/dev/null 2>&1; then
    echo "Missing dependency: ${command_name}" >&2
    exit 69
  fi
done

python3 "${SCRIPT_DIR}/build_journey_sheets.py" \
  --input "${INPUT_DIR}" \
  --output "${OUTPUT_DIR}"
