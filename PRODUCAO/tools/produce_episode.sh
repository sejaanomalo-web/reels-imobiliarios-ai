#!/bin/bash
# Pipeline completo: narração → áudio → render → validação.  Uso: npm run ep -- EP001
set -e
EP=${1:-EP001}
cd "$(dirname "$0")/.."
python3 tools/build_narration.py "$EP"
python3 tools/build_audio.py "$EP"
bash tools/render_episode.sh "$EP"
