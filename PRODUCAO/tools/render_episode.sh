#!/bin/bash
# Renderiza e valida um episódio: tools/render_episode.sh EP001
set -e
EP=${1:-EP001}
cd "$(dirname "$0")/.."
OUT=../OUTPUT/$EP
mkdir -p "$OUT" out
rm -rf build && npx remotion bundle --out-dir build >/dev/null
npx remotion render build "$EP" "out/$EP.mp4" --concurrency=4 --log=error
# +faststart para tocar imediatamente em celular/web
ffmpeg -v error -y -i "out/$EP.mp4" -c copy -movflags +faststart "$OUT/${EP}_final_1080x1920.mp4"
npx remotion still build "$EP-Capa" "$OUT/${EP}_capa.png" --log=error >/dev/null
python3 tools/validate.py "$EP"
