#!/bin/bash
# Renderiza e valida um episódio: tools/render_episode.sh EP001
set -e
EP=${1:-EP001}
cd "$(dirname "$0")/.."
OUT=../OUTPUT/$(python3 -c "import json;print(json.load(open('episodes/$EP/episode.json')).get('outputDir','$EP'))")
mkdir -p "$OUT" out
rm -rf build && npx remotion bundle --out-dir build >/dev/null
npx remotion render build "$EP" "out/$EP.mp4" --concurrency=4 --log=error
# +faststart para tocar imediatamente em celular/web
FINAL=$(python3 -c "import json;print(json.load(open('episodes/$EP/episode.json')).get('deliverables',{}).get('final','${EP}_final_1080x1920.mp4'))")
ffmpeg -v error -y -i "out/$EP.mp4" -c copy -movflags +faststart "$OUT/$FINAL"
# instantâneo dos arquivos editáveis do episódio (a fonte de verdade continua em PRODUCAO/)
rm -rf "$OUT/editaveis" && mkdir -p "$OUT/editaveis/src" && cp -r "episodes/$EP/." "$OUT/editaveis/" && rm -f "$OUT/editaveis/narration_source.wav" && cp -r "src/episodes/$EP/." "$OUT/editaveis/src/"
CAPA=$(python3 -c "import json;print(json.load(open('episodes/$EP/episode.json')).get('deliverables',{}).get('cover','${EP}_capa.png'))")
if grep -q "id=\"$EP-Capa\"" src/Root.tsx; then
  npx remotion still build "$EP-Capa" "$OUT/$CAPA" --log=error >/dev/null
else
  # sem composição de capa: usa um quadro do próprio vídeo (deliverables.coverCue + coverOffset; senão 60% da duração)
  CF=$(python3 -c "
import json;e=json.load(open('episodes/$EP/episode.json'));d=e.get('deliverables',{});tl=json.load(open('src/episodes/$EP/timeline.json'))
t=tl['cues'][d['coverCue']]+d.get('coverOffset',0) if d.get('coverCue') else tl['duration']*0.6
print(min(tl['durationInFrames']-1,int(t*tl['fps'])))")
  npx remotion still build "$EP" "$OUT/$CAPA" --frame="$CF" --log=error >/dev/null
fi
python3 tools/validate.py "$EP"
