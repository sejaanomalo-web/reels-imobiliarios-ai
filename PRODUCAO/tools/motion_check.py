"""Mede movimento visual de um MP4: diferença média entre quadros (10 fps, 270x480, cinza).
Relata movimento médio e o MAIOR trecho praticamente parado (regra do guia: nada parado > 2–3 s).
Uso: python3 tools/motion_check.py arquivo.mp4 [limiar]"""
import sys, subprocess
import numpy as np

f = sys.argv[1]
thr = float(sys.argv[2]) if len(sys.argv) > 2 else 0.8
w, h, fps = 270, 480, 10
raw = subprocess.run(["ffmpeg", "-v", "error", "-i", f, "-vf", f"fps={fps},scale={w}:{h},format=gray", "-f", "rawvideo", "-"],
                     capture_output=True, check=True).stdout
fr = np.frombuffer(raw, np.uint8).reshape(-1, h, w).astype(np.float32)
d = np.abs(np.diff(fr, axis=0)).mean(axis=(1, 2))
static = d < thr
run = best = 0; best_end = 0
for i, s in enumerate(static):
    run = run + 1 if s else 0
    if run > best:
        best, best_end = run, i
sec = np.arange(len(d)) / fps
per_s = [round(float(d[(sec >= a) & (sec < a + 1)].mean()), 2) for a in range(int(sec[-1]) + 1)]
print(dict(arquivo=f.split("/")[-1], movimento_medio=round(float(d.mean()), 2), pct_quadros_parados=round(100 * float(static.mean()), 1),
           maior_trecho_parado_s=round(best / fps, 1), termina_em_s=round((best_end + 1) / fps, 1)))
print("movimento por segundo:", per_s)
