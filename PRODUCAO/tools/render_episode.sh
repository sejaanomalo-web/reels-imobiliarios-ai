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
FINAL=$(python3 -c "import json;print(json.load(open('episodes/$EP/episode.json')).get('deliverables',{}).get('final','${EP}_final_1080x1920.mp4'))")
ffmpeg -v error -y -i "out/$EP.mp4" -c copy -movflags +faststart "$OUT/$FINAL"
# instantâneo dos arquivos editáveis do episódio (a fonte de verdade continua em PRODUCAO/)
rm -rf "$OUT/editaveis" && mkdir -p "$OUT/editaveis/src" && cp -r "episodes/$EP/." "$OUT/editaveis/" && rm -f "$OUT/editaveis/narration_source.wav" && cp -r "src/episodes/$EP/." "$OUT/editaveis/src/"
npx remotion still build "$EP-Capa" "$OUT/${EP}_capa.png" --log=error >/dev/null
python3 tools/validate.py "$EP"
