#!/bin/bash
# Renderiza quadros de conferência: tools/stills.sh <saida_dir> <segundos...>
# Ex.: tools/stills.sh /tmp/q 0 1.5 3.2
set -e
OUT=$1; shift
mkdir -p "$OUT"
[ -d build ] || npx remotion bundle --out-dir build >/dev/null
for s in "$@"; do
  f=$(python3 -c "print(int(round($s*30)))")
  npx remotion still build EP001 "$OUT/f_$(printf '%05.2f' $s).jpg" --frame=$f --image-format=jpeg --jpeg-quality=85 --log=error >/dev/null
done
