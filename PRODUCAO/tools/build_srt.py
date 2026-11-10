"""Gera o SRT a partir do timeline.json (linhas de até ~42 caracteres, quebrando na pontuação).
Uso: python3 tools/build_srt.py EP001"""
import os, sys, json

EP = sys.argv[1] if len(sys.argv) > 1 else "EP001"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
tl = json.load(open(os.path.join(ROOT, "src", "episodes", EP, "timeline.json")))


def ts(x):
    ms = int(round(x * 1000))
    return f"{ms // 3600000:02d}:{ms % 3600000 // 60000:02d}:{ms % 60000 // 1000:02d},{ms % 1000:03d}"


lines, cur = [], []


def flush():
    if cur:
        text = " ".join(w["text"] for c in cur for w in c["words"])
        lines.append((cur[0]["words"][0]["start"], cur[-1]["words"][-1]["end"], text))
        cur.clear()


for c in tl["captions"]:
    text = " ".join(w["text"] for w in c["words"])
    joined = " ".join(w["text"] for k in cur for w in k["words"])
    if cur and (cur[-1]["seg"] != c["seg"] or len(joined) + 1 + len(text) > 42):
        flush()
    cur.append(c)
    joined = " ".join(w["text"] for k in cur for w in k["words"])
    if text[-1] in ".?!:" or (text[-1] == "," and len(joined) >= 18):
        flush()
flush()
out = []
for i, (a, b, text) in enumerate(lines):
    nxt = lines[i + 1][0] if i + 1 < len(lines) else b + 0.4
    out.append(f"{i + 1}\n{ts(a)} --> {ts(min(b + 0.2, nxt - 0.02))}\n{text}\n")
path = os.path.join(os.path.dirname(ROOT), "OUTPUT", EP, f"{EP}_legendas.srt")
open(path, "w").write("\n".join(out))
print(f"{len(lines)} legendas → {path}")
