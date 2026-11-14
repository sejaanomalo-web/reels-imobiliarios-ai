"""Linha do tempo PROVISÓRIA (sem voz) só para revisar cenas antes da narração. Nunca entregar."""
import json, re, sys, unicodedata
EP = sys.argv[1]; ROOT = '/home/user/reels-imobiliarios-ai/PRODUCAO'
ep = json.load(open(f'{ROOT}/episodes/{EP}/episode.json'))
W = r"[\wáàâãéêíóôõúüçÁÀÂÃÉÊÍÓÔÕÚÜÇ]+"
key = lambda w: re.sub(r"[^a-z0-9]", "", "".join(c for c in unicodedata.normalize("NFD", w.lower()) if unicodedata.category(c) != "Mn"))
def cap_words(seg):
    out = []
    for ci, ch in enumerate(seg["caption"].split("|")):
        emph = False
        for tok in ch.split():
            if tok.startswith("*"): emph = True
            out.append(dict(text=tok.strip("*"), chunk=ci, emph=emph))
            out.extend(dict(text="", chunk=ci, emph=emph) for _ in range(len(re.findall(W, tok)) - 1))
            if tok.endswith("*"): emph = False
    return out
t = ep["leadIn"]; words, segs = [], []
for s in ep["segments"]:
    exp = re.findall(W, s["text"]); cw = cap_words(s); a = t
    for i, (w, c) in enumerate(zip(exp, cw)):
        d = 0.12 + 0.055 * len(w)
        words.append(dict(seg=s["id"], word=w, text=c["text"], chunk=c["chunk"], emph=c["emph"], start=round(t, 3), end=round(t + d, 3)))
        t += d + (0.18 if c["text"].endswith(",") or c["text"].endswith(":") else 0.02)
    segs.append(dict(id=s["id"], scene=s["scene"], text=s["text"], start=round(a, 3), end=round(t, 3)))
    t += 0.35
end = t; total = round(((end + ep["tail"]) * 30 + 0.999) // 1 / 30, 3)
order = []
for s in segs:
    if s["scene"] not in order: order.append(s["scene"])
scenes = []
for n, name in enumerate(order):
    f = next(s for s in segs if s["scene"] == name)
    scenes.append(dict(id=name, start=0.0 if n == 0 else round(f["start"] - ep["sceneLead"].get(name, 0.25), 3)))
for a, b in zip(scenes, scenes[1:] + [dict(start=total)]): a["end"] = b["start"]
def find(seg, word):
    for w in words:
        if w["seg"] == seg and key(w["word"]) == key(word): return w
    raise KeyError((seg, word))
cues = {n: round(find(c["seg"], c["word"])[c.get("edge", "start")] + c.get("offset", 0), 3) for n, c in ep["cues"].items()}
caps = []
for s in segs:
    ws = [w for w in words if w["seg"] == s["id"]]
    for c in sorted(set(w["chunk"] for w in ws)):
        cw = [w for w in ws if w["chunk"] == c]
        caps.append(dict(seg=s["id"], start=cw[0]["start"], end=cw[-1]["end"], words=[dict(text=w["text"], start=w["start"], end=w["end"], emph=w["emph"]) for w in cw if w["text"]]))
for a, b in zip(caps, caps[1:]): a["end"] = b["start"] if b["start"] - a["end"] < 0.5 else a["end"] + 0.35
series = {}
for name, a in ep.get("series", {}).items():
    if a.get("type") == "between":
        t0 = cues[a["fromCue"]] + a.get("fromOffset", 0); t1 = cues[a["toCue"]] + a.get("toOffset", 0)
        series[name] = [round(t0 + (t1 - t0) * i / max(1, a["count"] - 1), 3) for i in range(a["count"])]
tl = dict(id=EP, title=ep["title"], fps=30, duration=total, durationInFrames=int(round(total * 30)), narrationEnd=round(end, 3), voice="PROVISÓRIO-SEM-VOZ",
          scenes=scenes, segments=segs, cues=cues, series=series, captions=caps, hideCaptions=ep.get("hideCaptions", []))
json.dump(tl, open(f'{ROOT}/src/episodes/{EP}/timeline.json', "w"), ensure_ascii=False, indent=1)
print("provisório:", total, "s")
